const CACHE_NAME = "tl_pwa_demo_cache_v1.0.0"; // 用于标注创建的缓存，也可以根据它来建立版本规范

// 列举要默认缓存的静态资源，一般用于离线使用

const urlsToCache = [
    '/index.html',
    '/icon/icon.png'
];

// self 为当前 scope 内的上下文

self.addEventListener('install', event => {

    // event.waitUtil 用于在安装成功之前执行一些预装逻辑, 但是建议只做一些轻量级和非常重要资源的缓存，减少安装失败的概率

    // 安装成功后 ServiceWorker 状态会从 installing 变为 installed

    event.waitUntil(

        caches.open(CACHE_NAME).then(cache => { // 使用 cache API 打开指定的 cache 文件

            console.log('add catch',cache); // 添加要缓存的资源列表

            return cache.addAll(urlsToCache);

        })

    );

});

self.addEventListener('activate', function (event) {
    // 确保更新立即生效
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys
              .filter(key => key !== CACHE_NAME)
              .map(key => caches.delete(key))
            );
          })
    );
});
self.addEventListener('fetch', evt => {
    evt.respondWith(
      caches.match(evt.request).then(cacheRes => {
        return cacheRes || fetch(evt.request);
      })
    );
  });
// 接收通知并与之互动
self.addEventListener('push', function (event) {
    console.log('get push');
    var payload = event.data ? JSON.parse(event.data.text()) : 'no payload';
    var title = 'message';

    event.waitUntil(
        // 接收到通知后，显示
        self.registration.showNotification(title, {
            body: payload.msg,
            url: payload.url,
            icon: payload.icon
        })
    );
});

// 处理通知的点击事件
self.addEventListener('notificationclick', function (event) {
    console.log('notificationclick');
    event.waitUntil(
        console.log('click notification')
    );
    event.notification.close();
});