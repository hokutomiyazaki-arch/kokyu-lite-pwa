// 呼吸のスイッチ SW ─ Network First（更新が即届く）＋オフライン時キャッシュフォールバック
const C='kokyu-lite-v1.0.4';
const A=['./','./index.html','./manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png','./icons/apple-touch-icon.png',
  './audio/guide-inhale.mp3','./audio/guide-exhale.mp3','./audio/guide-start.mp3','./audio/guide-done.mp3'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(A)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
// Network First：オンラインなら常に最新を取得しキャッシュ更新。落ちてる時だけキャッシュへ。
self.addEventListener('fetch',e=>{
  const req=e.request;
  if(req.method!=='GET'){return;}
  e.respondWith(
    fetch(req).then(res=>{
      const clone=res.clone();
      caches.open(C).then(c=>c.put(req,clone)).catch(()=>{});
      return res;
    }).catch(()=>caches.match(req).then(r=>r||caches.match('./index.html')))
  );
});
