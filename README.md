# BinbirNet - Nuxt Uygulamasi

Anamur ve Bozyazi bolgesine hizmet veren BinbirNet ISP web sitesi. Nuxt 4 (SSR) + JSON tabanli admin paneli.

---

## Yerel Gelistirme

```bash
npm install
npm run dev
```

Uygulama `http://localhost:3000` adresinde baslar.

---

## Plesk'e Deploy (Build & Upload)

### Gereksinimler

- Plesk uzerinde **Node.js** eklentisi aktif
- Node.js surumu: **18.x** veya **20.x** (onerilen: 20.x)
- Sunucuda en az **512 MB RAM**

---

### Adim 1: Yerel Makinede Build Alin

```bash
npm install
npm run build
```

Build tamamlandiginda `.output/` klasoru olusur.

---

### Adim 2: Admin Sifresi Olusturun

```bash
npm run hash-password
```

Sifrenizi girin, cikan bcrypt hash degerini not edin. Ornek cikti:

```
$2b$10$xYzAbC123...
```

---

### Adim 3: Sunucuya Dosyalari Yukleyin

FTP/SFTP ile asagidaki dosya ve klasorleri domain kokune yukleyin:

```
Yuklenecekler:
├── .output/              # Build ciktisi (TUM klasor)
├── server/data/          # JSON veri dosyalari
├── public/               # Statik dosyalar (resimler, favicon vb.)
├── package.json          # Bagimlilik listesi
└── .env                  # Ortam degiskenleri (sunucuda olusturun)
```

**Yuklenmeyecekler:** `node_modules/`, `pages/`, `components/`, `composables/`, `layouts/`, `assets/`, `plugins/` - bunlar build ciktisina dahildir.

Sunucudaki son gorunum:

```
/var/www/vhosts/binbirnet.com.tr/
├── .output/
│   ├── server/
│   │   └── index.mjs        # <-- Startup file
│   └── public/
│       └── _nuxt/
├── server/
│   └── data/
│       ├── packages.json
│       ├── slides.json
│       ├── campaigns.json
│       ├── settings.json
│       ├── seo.json
│       ├── tracking.json
│       ├── navigation.json
│       └── homepage.json
├── public/
│   └── img/
├── package.json
└── .env
```

---

### Adim 4: .env Dosyasini Olusturun

Sunucuda proje kokune `.env` dosyasi olusturun:

```env
# Oturum sifresi (en az 32 karakter rastgele metin)
NUXT_SESSION_SECRET=buraya-en-az-32-karakter-rastgele-guclu-sifre

# Admin giris bilgileri
NUXT_ADMIN_USER=admin
NUXT_ADMIN_PASSWORD_HASH=$2b$10$...adim-2-deki-hash...

# reCAPTCHA (basvuru formu icin, opsiyonel)
NUXT_PUBLIC_RECAPTCHA_SITE_KEY=

# PHP backend URL (opsiyonel)
NUXT_PUBLIC_API_BASE=/php-backend/

# Sunucu ayarlari
PORT=3000
NITRO_PORT=3000
HOST=0.0.0.0
NODE_ENV=production
```

---

### Adim 5: Plesk Node.js Yapilandirmasi

1. Plesk panelinde domain'e gidin
2. **Node.js** butonuna tiklayin
3. Asagidaki ayarlari yapin:

| Ayar | Deger |
|------|-------|
| **Node.js Version** | 20.x |
| **Application Root** | Domain koku |
| **Application Startup File** | `.output/server/index.mjs` |
| **Application Mode** | production |

4. **Environment Variables** bolumune `.env` dosyasindaki degiskenleri ekleyin (veya `.env` dosyasini yukleyin)

5. **NPM Install** butonuna tiklayin (sunucuda production bagimliliklari yukler)

6. **Enable Node.js** / **Restart App** butonuna tiklayin

---

### Adim 6: Dosya Izinlerini Ayarlayin

Admin panelinin JSON dosyalarina yazabilmesi icin SSH ile:

```bash
cd /var/www/vhosts/binbirnet.com.tr/
chmod -R 664 server/data/*.json
chown -R <domain-kullanicisi>:<psacln> server/data/
```

`<domain-kullanicisi>` yerine Plesk'teki system user'i yazin.

---

### Adim 7: Kontrol Edin

- `https://binbirnet.com.tr` - Ana sayfa
- `https://binbirnet.com.tr/admin` - Admin paneli girisi

---

## Guncelleme

Kod degisikligi yaptiginizda:

```bash
# 1. Yerel makinede build alin
npm run build

# 2. Sadece .output/ klasorunu sunucuya yukleyin (FTP/SFTP)

# 3. Plesk > Node.js > "Restart App"
```

**Onemli:**
- `server/data/*.json` dosyalarini **ustune yazmayin** - canli admin verileri icerir
- `.env` dosyasini tekrar yuklemenize gerek yok
- `public/` klasorunu sadece yeni resim eklediyseniz yukleyin

---

## Nginx Proxy (Gerekirse)

Plesk genellikle Node.js icin otomatik proxy yapilandirir. Manuel ayar gerekirse:

Plesk > domain > **Apache & nginx Settings** > **Additional nginx directives**:

```nginx
location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_cache_bypass $http_upgrade;
}
```

---

## Sorun Giderme

| Sorun | Cozum |
|-------|-------|
| Uygulama baslamiyor | Plesk > Logs'tan hata mesajini kontrol edin |
| Admin girisi calismiyoir | `.env`'deki `NUXT_ADMIN_PASSWORD_HASH` degerini kontrol edin, `$2b$10$` ile baslamali |
| JSON yazma hatasi | `chmod 664 server/data/*.json` ile yazma izni verin |
| Port cakismasi | `.env`'de `PORT=3001` yapin, Plesk proxy'yi guncelleyin |
| Statik dosyalar gorunmuyor | `public/` klasorunun sunucuda oldugunu dogrulayin |
| Eski veriler gorunuyor | SWR cache nedeniyle (5dk), bekleyin veya uygulamayi yeniden baslatin |

---

## Kontrol Listesi

- [ ] `npm run build` ile `.output/` olusturuldu
- [ ] `npm run hash-password` ile admin sifre hash'i olusturuldu
- [ ] `.output/` sunucuya yuklendi
- [ ] `server/data/` sunucuya yuklendi
- [ ] `public/img/` sunucuya yuklendi
- [ ] `.env` sunucuda olusturuldu ve dolduruldu
- [ ] Plesk'te Node.js 20.x secildi
- [ ] Startup file: `.output/server/index.mjs`
- [ ] NPM Install calistirildi
- [ ] `server/data/` dosyalarina yazma izni verildi
- [ ] Uygulama baslatildi
- [ ] Ana sayfa calisiyor
- [ ] `/admin` girisi calisiyor
