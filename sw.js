const V="mulligan-711c2b65c0";
const FILES=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png","apple-touch-icon.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(FILES.map(f=>new Request(f,{cache:"reload"})))).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET"||new URL(r.url).origin!==location.origin)return;
  const key=r.mode==="navigate"?"index.html":r;
  e.respondWith(caches.open(V).then(c=>c.match(key).then(hit=>{
    const net=fetch(r).then(res=>{if(res.ok)c.put(key,res.clone());return res});
    if(hit){e.waitUntil(net.catch(()=>{}));return hit}
    return net})))});
