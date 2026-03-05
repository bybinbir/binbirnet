# BinbirNet - Nuxt Uygulaması

Anamur ve Bozyazı bölgesine hizmet veren BinbirNet ISP web sitesi. Nuxt 4 (SSR) + JSON tabanlı admin paneli.

---

## Yerel Geliştirme

```bash
npm install
npm run dev
```

Uygulama `http://localhost:3000` adresinde başlar.

---

## GitHub'dan Plesk'e Deploy

Bu yöntemde kaynak kod GitHub'dan sunucuya çekilir, sunucuda build alınır ve çalıştırılır. FTP ile dosya yüklemeye gerek yoktur.

### Gereksinimler

| Gereksinim | Açıklama |
|------------|----------|
| **Plesk Node.js Eklentisi** | Plesk panelinde aktif olmalı |
| **Node.js Sürümü** | 18.x veya 20.x (önerilen: 20.x) |
| **SSH Erişimi** | Sunucuya SSH ile bağlanabilmeniz gerekli |
| **Git** | Sunucuda `git` komutu kurulu olmalı |
| **RAM** | En az 512 MB (build sırasında daha fazla gerekebilir) |

---

### İlk Kurulum (Tek Seferlik)

#### 1. SSH ile Sunucuya Bağlanın

```bash
ssh kullanici@sunucu-ip
```

Plesk'te domain'in system user'ı ile giriş yapın.

#### 2. Domain Dizinine Gidin

```bash
cd /var/www/vhosts/binbirnet.com.tr/
```

> **Not:** Domain dizin yolu Plesk yapılandırmanıza göre farklılık gösterebilir. Plesk panelinde domain > **Hosting Settings** bölümünden kontrol edin.

#### 3. GitHub'dan Projeyi Klonlayın

```bash
git clone git@github.com:bybinbir/binbirnet.git .
```

> **Not:** Sondaki `.` (nokta) mevcut dizine klonlar. Eğer dizin boş değilse önce içini temizleyin veya alt klasöre klonlayıp taşıyın.

**SSH Key Ayarı (gerekirse):**

Eğer private repo ise sunucuda SSH key oluşturmanız gerekir:

```bash
ssh-keygen -t ed25519 -C "plesk@binbirnet.com.tr"
cat ~/.ssh/id_ed25519.pub
```

Çıkan public key'i GitHub > Repository > Settings > Deploy Keys bölümüne ekleyin.

#### 4. Bağımlılıkları Yükleyin

```bash
npm install
```

#### 5. Admin Şifresini Oluşturun

```bash
npm run hash-password -- SifreninizBuraya
```

Bu komut `server/data/auth.json` dosyasını oluşturur/günceller. Örnek çıktı:

```
Kullanıcı: admin
Şifre hash: $2b$10$xYzAbC123...

auth.json güncellendi: /var/www/vhosts/binbirnet.com.tr/server/data/auth.json
```

Farklı kullanıcı adı için:

```bash
npm run hash-password -- SifreninizBuraya yonetici
```

#### 6. `.env` Dosyasını Oluşturun

```bash
nano .env
```

Aşağıdaki içeriği yapıştırın:

```env
# Oturum şifresi (en az 32 karakter rastgele metin)
NUXT_SESSION_SECRET=buraya-en-az-32-karakter-rastgele-guclu-sifre

# reCAPTCHA (başvuru formu için, opsiyonel)
NUXT_PUBLIC_RECAPTCHA_SITE_KEY=

# PHP backend URL (opsiyonel)
NUXT_PUBLIC_API_BASE=/php-backend/

# Sunucu ayarları
PORT=3000
NITRO_PORT=3000
HOST=0.0.0.0
NODE_ENV=production
```

> **Önemli:** Admin giriş bilgileri artık `.env` dosyasında değil, `server/data/auth.json` dosyasında saklanıyor. Adım 5'te oluşturuldu.

#### 7. Build Alın

```bash
npm run build
```

Build tamamlandığında `.output/` klasörü oluşur. Bu klasör uygulamanın çalıştırılabilir halini içerir.

#### 8. Plesk Node.js Yapılandırması

Plesk panelinde domain'e gidin ve **Node.js** butonuna tıklayın:

| Ayar | Değer |
|------|-------|
| **Node.js Version** | 20.x |
| **Application Root** | Domain kökü (ör: `/var/www/vhosts/binbirnet.com.tr/`) |
| **Application Startup File** | `.output/server/index.mjs` |
| **Application Mode** | production |

> **Önemli:** Startup file alanına tam olarak `.output/server/index.mjs` yazın.

#### 9. Ortam Değişkenlerini Plesk'e Ekleyin

Plesk Node.js sayfasındaki **Environment Variables** bölümüne `.env` dosyasındaki değişkenleri ekleyin:

| Değişken | Değer |
|----------|-------|
| `NUXT_SESSION_SECRET` | (en az 32 karakterlik rastgele metin) |
| `PORT` | `3000` |
| `NITRO_PORT` | `3000` |
| `HOST` | `0.0.0.0` |
| `NODE_ENV` | `production` |

> Opsiyonel değişkenleri (RECAPTCHA, API_BASE) sadece kullanıyorsanız ekleyin.

#### 10. Uygulamayı Başlatın

Plesk Node.js sayfasında **Enable Node.js** veya **Restart App** butonuna tıklayın.

#### 11. Dosya İzinlerini Ayarlayın

Admin panelinin JSON dosyalarına yazabilmesi için SSH'ta:

```bash
chmod -R 775 server/data/
chown -R <domain-kullanicisi>:<psacln> server/data/
```

`<domain-kullanicisi>` yerine Plesk'teki system user'ı yazın. Öğrenmek için:

```bash
stat -c '%U' .
```

#### 12. Kontrol Edin

- `https://binbirnet.com.tr` → Ana sayfa
- `https://binbirnet.com.tr/admin/login` → Admin girişi

---

### Güncelleme (Her Değişiklikte)

Kod değişikliği yaptıktan ve GitHub'a push ettikten sonra sunucuyu güncellemek için:

#### Yöntem 1: Tek Komutla (Önerilen)

SSH ile bağlanıp deploy scriptini çalıştırın:

```bash
cd /var/www/vhosts/binbirnet.com.tr/
bash deploy.sh
```

`deploy.sh` dosyası projeyle birlikte gelir (aşağıda açıklanmıştır).

#### Yöntem 2: Manuel Adımlar

```bash
cd /var/www/vhosts/binbirnet.com.tr/

# 1. Admin verilerini yedekle (canlı verilerin üzerine yazılmasını önler)
cp -r server/data/ server/data_backup/

# 2. GitHub'dan son değişiklikleri çek
git pull origin main

# 3. Admin verilerini geri yükle
cp server/data_backup/auth.json server/data/auth.json
cp server/data_backup/packages.json server/data/packages.json
cp server/data_backup/slides.json server/data/slides.json
cp server/data_backup/campaigns.json server/data/campaigns.json
cp server/data_backup/settings.json server/data/settings.json
cp server/data_backup/seo.json server/data/seo.json
cp server/data_backup/tracking.json server/data/tracking.json
cp server/data_backup/navigation.json server/data/navigation.json
cp server/data_backup/homepage.json server/data/homepage.json

# 4. Bağımlılıkları güncelle (yeni paket eklendiyse)
npm install

# 5. Yeniden build al
npm run build

# 6. Yedek klasörünü temizle
rm -rf server/data_backup/

# 7. Plesk'te uygulamayı yeniden başlat
# Plesk paneli > Domain > Node.js > "Restart App"
```

> **Kritik:** `server/data/` klasöründeki dosyalar admin panelinden düzenlenen canlı verilerdir. `git pull` bu dosyaların üzerine yazabilir. Bu yüzden önce yedek alıp sonra geri yüklüyoruz.

---

### Deploy Script (deploy.sh)

Projenin kök dizininde bir `deploy.sh` dosyası bulunur. Bu script güncelleme adımlarını otomatikleştirir:

```bash
#!/bin/bash
set -e

echo "========================================="
echo "  BinbirNet Deploy - $(date '+%Y-%m-%d %H:%M')"
echo "========================================="

# Çalışma dizinini ayarla
SITE_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SITE_DIR"

echo ""
echo "[1/6] Admin verileri yedekleniyor..."
cp -r server/data/ server/data_backup/
echo "  ✓ server/data_backup/ oluşturuldu"

echo ""
echo "[2/6] GitHub'dan güncelleme çekiliyor..."
git pull origin main
echo "  ✓ Kod güncellendi"

echo ""
echo "[3/6] Admin verileri geri yükleniyor..."
cp server/data_backup/*.json server/data/
rm -rf server/data_backup/
echo "  ✓ Canlı veriler korundu"

echo ""
echo "[4/6] Bağımlılıklar kontrol ediliyor..."
npm install --production=false
echo "  ✓ Bağımlılıklar tamam"

echo ""
echo "[5/6] Build alınıyor..."
npm run build
echo "  ✓ Build tamamlandı"

echo ""
echo "[6/6] Dosya izinleri ayarlanıyor..."
chmod -R 775 server/data/
echo "  ✓ İzinler ayarlandı"

echo ""
echo "========================================="
echo "  Deploy tamamlandı!"
echo "  Plesk > Node.js > 'Restart App' ile"
echo "  uygulamayı yeniden başlatın."
echo "========================================="
```

> **Not:** Script uygulamayı otomatik yeniden başlatmaz. Plesk panelinden manuel olarak **Restart App** butonuna tıklayın.

---

## Proje Yapısı

```
binbirnet/
├── .output/                    # Build çıktısı (git'te yok, sunucuda oluşur)
│   ├── server/
│   │   └── index.mjs           # ← Plesk startup file
│   └── public/
├── server/
│   ├── api/                    # API endpoint'leri
│   │   ├── admin/              # Admin API (oturum korumalı)
│   │   │   ├── login.post.ts
│   │   │   ├── packages.get.ts / .put.ts
│   │   │   ├── slides.get.ts / .put.ts
│   │   │   ├── campaigns.get.ts / .put.ts
│   │   │   ├── settings.get.ts / .put.ts
│   │   │   ├── seo.get.ts / .put.ts
│   │   │   ├── tracking.get.ts / .put.ts
│   │   │   ├── navigation.get.ts / .put.ts
│   │   │   └── homepage.get.ts / .put.ts
│   │   ├── packages.get.ts     # Public API'ler
│   │   ├── slides.get.ts
│   │   └── ...
│   ├── data/                   # JSON veri dosyaları (admin panelinden düzenlenir)
│   │   ├── auth.json           # Admin giriş bilgileri
│   │   ├── packages.json       # Internet paketleri
│   │   ├── slides.json         # Ana sayfa slider
│   │   ├── campaigns.json      # Kampanyalar
│   │   ├── settings.json       # Site ayarları (iletişim, adres, sosyal medya)
│   │   ├── seo.json            # SEO meta bilgileri
│   │   ├── tracking.json       # Google Analytics, GTM, Pixel kodları
│   │   ├── navigation.json     # Header/Footer navigasyon
│   │   └── homepage.json       # Ana sayfa içerikleri
│   ├── middleware/
│   │   └── admin-auth.ts       # Admin oturum kontrolü
│   └── utils/
│       ├── storage.ts          # JSON dosya okuma/yazma
│       └── session.ts          # Oturum yönetimi
├── pages/
│   ├── admin/                  # Admin paneli sayfaları
│   │   ├── index.vue           # Dashboard
│   │   ├── login.vue           # Giriş
│   │   ├── paketler.vue        # Paket yönetimi
│   │   ├── slider.vue          # Slider yönetimi
│   │   ├── kampanyalar.vue     # Kampanya yönetimi
│   │   ├── ayarlar.vue         # Site ayarları
│   │   ├── seo.vue             # SEO yönetimi
│   │   ├── izleme.vue          # İzleme kodları
│   │   ├── navigasyon.vue      # Navigasyon yönetimi
│   │   └── anasayfa.vue        # Ana sayfa içerik yönetimi
│   ├── index.vue               # Ana sayfa
│   ├── paketler.vue            # Tarifeler
│   ├── kampanyalar.vue         # Kampanyalar
│   └── ...
├── components/                 # Vue bileşenleri
├── composables/                # Vue composable'lar
├── layouts/                    # Sayfa layout'ları
├── plugins/                    # Nuxt plugin'leri
├── public/                     # Statik dosyalar (resimler, favicon)
├── scripts/
│   └── hash-password.mjs       # Admin şifre hash oluşturucu
├── deploy.sh                   # Güncelleme deploy scripti
├── nuxt.config.ts              # Nuxt yapılandırması
├── package.json                # Bağımlılıklar
├── .env.example                # Ortam değişkenleri şablonu
└── .gitignore
```

---

## Admin Paneli

| Sayfa | URL | Açıklama |
|-------|-----|----------|
| Dashboard | `/admin` | Genel bakış ve istatistikler |
| Paketler | `/admin/paketler` | İnternet paketleri yönetimi |
| Slider | `/admin/slider` | Ana sayfa slider yönetimi |
| Kampanyalar | `/admin/kampanyalar` | Kampanya yönetimi |
| Ana Sayfa | `/admin/anasayfa` | Ana sayfa içerik yönetimi |
| Navigasyon | `/admin/navigasyon` | Header/Footer menü yönetimi |
| SEO | `/admin/seo` | SEO meta tag yönetimi |
| İzleme Kodları | `/admin/izleme` | GA4, GTM, Pixel yönetimi |
| Site Ayarları | `/admin/ayarlar` | İletişim, adres, sosyal medya |

---

## Admin Şifre Yönetimi

Şifre değiştirmek için SSH ile sunucuya bağlanın:

```bash
cd /var/www/vhosts/binbirnet.com.tr/
npm run hash-password -- YeniSifre
```

Bu komut `server/data/auth.json` dosyasını günceller. Uygulama yeniden başlatmaya gerek yoktur.

---

## Nginx Proxy Ayarı (Gerekirse)

Plesk genellikle Node.js için otomatik proxy yapılandırır. Manuel ayar gerekirse:

Plesk > Domain > **Apache & nginx Settings** > **Additional nginx directives**:

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

| Sorun | Çözüm |
|-------|-------|
| `git pull` çakışma veriyor | `git stash && git pull && git stash pop` veya deploy.sh kullanın |
| Build başarısız oluyor | `node -v` ile Node.js sürümünü kontrol edin (18+ olmalı) |
| Uygulama başlamıyor | Plesk > Logs'tan hata mesajını kontrol edin |
| Admin girişi çalışmıyor | `cat server/data/auth.json` ile hash'in doğru olduğunu kontrol edin |
| JSON yazma hatası | `chmod -R 775 server/data/` ile yazma izni verin |
| Port çakışması | `.env`'de `PORT=3001` yapın, Plesk proxy'yi güncelleyin |
| Eski veriler görünüyor | SWR cache nedeniyle (1-5 dk), bekleyin veya uygulamayı yeniden başlatın |
| `npm install` bellek hatası | `NODE_OPTIONS=--max-old-space-size=512 npm install` deneyin |
| SSH key hatası (git pull) | Deploy key'in GitHub'a eklendiğini kontrol edin |

---

## İlk Kurulum Kontrol Listesi

- [ ] SSH ile sunucuya bağlanıldı
- [ ] `git clone` ile proje çekildi
- [ ] `npm install` ile bağımlılıklar yüklendi
- [ ] `npm run hash-password -- Sifre` ile admin şifresi oluşturuldu
- [ ] `.env` dosyası oluşturuldu ve dolduruldu
- [ ] `npm run build` ile build alındı
- [ ] Plesk'te Node.js 20.x seçildi
- [ ] Startup file: `.output/server/index.mjs` ayarlandı
- [ ] Application Mode: `production` ayarlandı
- [ ] Ortam değişkenleri Plesk'e eklendi
- [ ] Uygulama başlatıldı (Enable Node.js)
- [ ] `server/data/` klasörüne yazma izni verildi (`chmod -R 775`)
- [ ] Ana sayfa çalışıyor: `https://binbirnet.com.tr`
- [ ] Admin girişi çalışıyor: `https://binbirnet.com.tr/admin/login`

---

## Güncelleme Kontrol Listesi

- [ ] Değişiklikler GitHub'a push edildi
- [ ] SSH ile sunucuya bağlanıldı
- [ ] `bash deploy.sh` çalıştırıldı (veya manuel adımlar)
- [ ] Plesk'te **Restart App** yapıldı
- [ ] Site düzgün çalışıyor
- [ ] Admin paneli düzgün çalışıyor
