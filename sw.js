const V='entrenamientos-v4';
const F=['./','index.html','manifest.webmanifest','xlsx.full.min.js','icon-180.png','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>Promise.all(F.map(f=>c.add(f).catch(()=>{})))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;
 const u=new URL(e.request.url),html=e.request.mode==='navigate'||u.pathname.endsWith('/')||u.pathname.endsWith('.html');
 e.respondWith(caches.open(V).then(async c=>{
  if(html){try{const r=await fetch(u.href,{cache:'no-store'});if(r&&r.ok)c.put(e.request,r.clone());return r}catch(x){return (await c.match(e.request,{ignoreSearch:true}))||c.match('index.html')}}
  const hit=await c.match(e.request,{ignoreSearch:true});if(hit)return hit;
  try{const r=await fetch(e.request);if(r&&r.ok)c.put(e.request,r.clone());return r}catch(x){return hit}
 }))});
