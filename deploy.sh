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
