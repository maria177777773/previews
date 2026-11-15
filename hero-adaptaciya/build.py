import re
O='https://catalystrussia.ru'
s=open('live.html',encoding='utf8').read()
def fix(m):
    return m.group(1)+O+m.group(2)
# атрибуты href/src/imagesrcset/content c путями от корня
s=re.sub(r'((?:href|src|poster)=")(/(?!/)[^"]*)',fix,s)
s=re.sub(r"(url\(['\"]?)(/(?!/)[^)'\"]*)",fix,s)
def srcset(m):
    parts=[p.strip() for p in m.group(2).split(',')]
    out=[]
    for p in parts:
        out.append(O+p if p.startswith('/') else p)
    return m.group(1)+', '.join(out)+'"'
s=re.sub(r'((?:srcset|imagesrcset)=")([^"]*)"',srcset,s)
s=s.replace('<head>','<head><base href="https://catalystrussia.ru/">',1)
open('was.html','w',encoding='utf8').write(s)
css=open('hero-fix.css',encoding='utf8').read()
js=open('hero-fix.js',encoding='utf8').read() if __import__('os').path.exists('hero-fix.js') else ''
blk='<style id="hero-fix">\n'+css+'\n</style>'+('<script>'+js+'</script>' if js else '')
assert '</body>' in s
t=s.replace('</body>',blk+'</body>',1)
m=re.search(r'<script defer src="'+re.escape(O)+r'/home-performance-20261105/review-fixes.js"></script>',t)
assert m
t=t.replace(m.group(0),'<script>document.addEventListener("DOMContentLoaded",function(){'+open('review-fixes.patched.js',encoding='utf8').read().replace('</script','<\\/script')+'});</script>',1)
open('stalo.html','w',encoding='utf8').write(t)
print(len(s),len(t))
