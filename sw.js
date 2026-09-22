const CACHE='family-finance-final';
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(['./','./index.html','./manifest.webmanifest','./apple-touch-icon.png','./icon-192.png','./icon-512.png'])).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)))});
self.addEventListener('push',e=>{let d={title:'Лоскутовы Финансы',body:'Проверьте приложение — есть важное напоминание.'};try{if(e.data)d={...d,...e.data.json()}}catch(_){}e.waitUntil(self.registration.showNotification(d.title,{body:d.body,icon:'apple-touch-icon.png',badge:'apple-touch-icon.png',tag:d.tag||('loskutovy-push-'+Date.now()),renotify:true,vibrate:[200,100,200],data:d.data||{}}))});
self.addEventListener('notificationclick',e=>{e.notification.close();e.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(cs=>{for(const c of cs){if('focus'in c)return c.focus()}return clients.openWindow('./')}))});
