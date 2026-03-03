<?php
// php-backend/apply.php
require 'config.php';
require 'mail_helper.php';

handleCors();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(['error' => 'Method not allowed'], 405);
}

$input = json_decode(file_get_contents('php://input'), true);

// Honeypot
if (!empty($input['hp'])) {
    jsonResponse(['error' => 'Spam detected'], 400);
}

// Validation
$adsoyad = trim($input['adsoyad'] ?? '');
$telefon = trim($input['telefon'] ?? '');
$email   = trim($input['email'] ?? '');
$paket   = trim($input['paket'] ?? '');
$infra   = $input['infra'] ?? null;
$kvkk    = $input['kvkk'] ?? false;
$token   = $input['token'] ?? '';

if (!$kvkk || !$adsoyad || !$telefon || !$paket) {
    jsonResponse(['error' => 'Eksik bilgi'], 400);
}

// ReCAPTCHA Verification
if (!verifyRecaptcha($token)) {
    jsonResponse(['error' => 'Robot doğrulaması başarısız'], 400);
}

// Infra HTML Builder
$infraHtml = "<p>Altyapı bilgisi yok</p>";
if ($infra && isset($infra['full_address'])) {
    $addr = htmlspecialchars($infra['full_address'], ENT_QUOTES, 'UTF-8');
    $bbk = htmlspecialchars($infra['result']['bbk'] ?? $infra['bbk'] ?? '-', ENT_QUOTES, 'UTF-8');
    $speed = htmlspecialchars($infra['result']['max_mbps'] ?? $infra['max_mbps'] ?? '-', ENT_QUOTES, 'UTF-8');
    $tech = htmlspecialchars($infra['result']['tech'] ?? $infra['tech'] ?? '-', ENT_QUOTES, 'UTF-8');
    
    $infraHtml = "
      <div style='background:#f0f0f0; padding:10px; border-radius:5px;'>
        <p><b>Adres:</b> $addr</p>
        <p><b>BBK:</b> $bbk</p>
        <p><b>Hız:</b> $speed Mbps</p>
        <p><b>Teknoloji:</b> $tech</p>
      </div>
    ";
}

$adsoyadSafe = htmlspecialchars($adsoyad, ENT_QUOTES, 'UTF-8');
$telefonSafe = htmlspecialchars($telefon, ENT_QUOTES, 'UTF-8');
$emailSafe   = htmlspecialchars($email, ENT_QUOTES, 'UTF-8');
$paketSafe   = htmlspecialchars($paket, ENT_QUOTES, 'UTF-8');

$subject = "Yeni Başvuru: $adsoyadSafe - $paketSafe";
$htmlContent = "
    <h3>Yeni İnternet Başvurusu</h3>
    <p><b>Ad Soyad:</b> $adsoyadSafe</p>
    <p><b>Telefon:</b> $telefonSafe</p>
    <p><b>E-posta:</b> $emailSafe</p>
    <p><b>Seçilen Paket:</b> $paketSafe</p>
    <p><b>KVKK Onayı:</b> Evet</p>
    <hr/>
    <h4>Altyapı Bilgileri</h4>
    $infraHtml
";

if (sendMail($subject, $htmlContent)) {
    jsonResponse(['success' => true]);
} else {
    jsonResponse(['error' => 'Mail gönderilemedi'], 500);
}
