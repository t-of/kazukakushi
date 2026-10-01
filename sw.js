// 旧アプリ（kazukakushi → d-slide）の古い Service Worker を消すための受け皿。
// install で即座に有効化し、activate で自分の登録を外して、残っていた kazukakushi- のキャッシュを消す。

self.addEventListener('install', () => { self.skipWaiting(); });

self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => k.startsWith('kazukakushi-')).map((k) => caches.delete(k)));
    await self.registration.unregister();
    const clients = await self.clients.matchAll({ type: 'window' });
    for (const client of clients) client.navigate(client.url);
  })());
});
