const CACHE_NAME = "mimo-appv4";
var urlsToCache = [
    "/",
    "/index.html",
    "/css/materialize.min.css",
    "/css/style.css",
    "/js/materialize.min.js",
    "/js/jquery-3.4.1.min.js",
    "/js/main.js",
    "/img/alif.png",
    "/img/ba.png",
    "/img/ta.png",
    "/img/tsa.png",
    "/img/jim.png",
    "/img/ha.png",
    "/img/kho.png",
    "/img/dal.png",
    "/img/dzal.png",
    "/img/ra.png",
    "/img/zai.png",
    "/img/sin.png",
    "/img/syin.png",
    "/img/shad.png",
    "/img/dhad.png",
    "/img/tha.png",
    "/img/zha.png",
    "/img/ain.png",
    "/img/ghin.png",
    "/img/fa.png",
    "/img/qaf.png",
    "/img/kaf.png",
    "/img/lam.png",
    "/img/mim.png",
    "/img/nun.png",
    "/img/wau.png",
    "/img/haa.png",
    "/img/lamAlif.png",
    "/img/hamzah.png",
    "/img/ya.png",
    "/audio/Huruf Tanda Baca Fathah/fatah_a.mp3",
    "/audio/Huruf Tanda Baca Fathah/fatah_ba.mp3",
    "/audio/Huruf Tanda Baca Fathah/fatah_ta.mp3",
    "/audio/Huruf Tanda Baca Fathah/fatah_tsa.mp3",
    "/audio/Huruf Tanda Baca Fathah/fatah_ja.mp3",
    "/audio/Huruf Tanda Baca Fathah/fatah_ha.mp3",
    "/audio/Huruf Tanda Baca Fathah/fatah_kho.mp3",
    "/audio/Huruf Tanda Baca Fathah/fatah_da.mp3",
    "/audio/Huruf Tanda Baca Fathah/fatah_dza.mp3",
    "/audio/Huruf Tanda Baca Fathah/fatah_ro.mp3",
    "/audio/Huruf Tanda Baca Fathah/fatah_za.mp3",
    "/audio/Huruf Tanda Baca Fathah/fatah_sa.mp3",
    "/audio/Huruf Tanda Baca Fathah/fatah_sya.mp3",
    "/audio/Huruf Tanda Baca Fathah/fatah_sho.mp3",
    "/audio/Huruf Tanda Baca Fathah/fatah_dho.mp3",
    "/audio/Huruf Tanda Baca Fathah/fatah_tho.mp3",
    "/audio/Huruf Tanda Baca Fathah/fatah_dzo.mp3",
    "/audio/Huruf Tanda Baca Fathah/fatah_aa.mp3",
    "/audio/Huruf Tanda Baca Fathah/fatah_gho.mp3",
    "/audio/Huruf Tanda Baca Fathah/fatah_fa.mp3",
    "/audio/Huruf Tanda Baca Fathah/fatah_qo.mp3",
    "/audio/Huruf Tanda Baca Fathah/fatah_ka.mp3",
    "/audio/Huruf Tanda Baca Fathah/fatah_la.mp3",
    "/audio/Huruf Tanda Baca Fathah/fatah_ma.mp3",
    "/audio/Huruf Tanda Baca Fathah/fatah_na.mp3",
    "/audio/Huruf Tanda Baca Fathah/fatah_wa.mp3",
    "/audio/Huruf Tanda Baca Fathah/fatah_haa.mp3",
    "/audio/Huruf Tanda Baca Fathah/fatah_ya.mp3",
];

self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", function (event) {
    event.respondWith(
        caches
        .match(event.request, {
            cacheName: CACHE_NAME
        })
        .then(function (response) {

            if (response) {
                console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
                return response;
            }

            console.log(
                "ServiceWorker: Memuat aset dari server: ",
                event.request.url
            );
            return fetch(event.request);
        })
    );
});

self.addEventListener("activate", function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheName != CACHE_NAME) {
                        console.log("ServiceWorker: cache " + cacheName + " dihapus");
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});