<?php
// php-backend/contact.php
require 'config.php';
require 'mail_helper.php';

handleCors();

// Sadece POST kabul et
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(['error' => 'Method not allowed'], 405);
}

// Input'u al
$input = json_decode(file_get_contents('php://input'), true);

// Honeypot
if (!empty($input['hp'])) {
    jsonResponse(['error' => 'Spam detected'], 400);
}

// Validation
$adsoyad = trim($input['adsoyad'] ?? '');
$telefon = trim($input['telefon'] ?? '');
$email   = trim($input['email'] ?? '');
$konu    = trim($input['konu'] ?? '');
$mesaj   = trim($input['mesaj'] ?? '');
$token   = $input['token'] ?? '';

if (!$adsoyad || !$telefon || !$konu || !$mesaj) {
    jsonResponse(['error' => 'Eksik bilgi'], 400);
}

// ReCAPTCHA Verification
if (!verifyRecaptcha($token)) {
    jsonResponse(['error' => 'Robot doğrulaması başarısız'], 400);
}

// XSS Sanitization (Basit)
$adsoyadSafe = htmlspecialchars($adsoyad, ENT_QUOTES, 'UTF-8');
$telefonSafe = htmlspecialchars($telefon, ENT_QUOTES, 'UTF-8');
$emailSafe   = htmlspecialchars($email, ENT_QUOTES, 'UTF-8');
$konuSafe    = htmlspecialchars($konu, ENT_QUOTES, 'UTF-8');
$mesajSafe   = nl2br(htmlspecialchars($mesaj, ENT_QUOTES, 'UTF-8'));

$subject = "İletişim Formu: $konuSafe - $adsoyadSafe";
$htmlContent = "
    <h3>Yeni İletişim Mesajı</h3>
    <p><b>Ad Soyad:</b> $adsoyadSafe</p>
    <p><b>Telefon:</b> $telefonSafe</p>
    <p><b>E-posta:</b> $emailSafe</p>
    <p><b>Konu:</b> $konuSafe</p>
    <hr/>
    <p><b>Mesaj:</b></p>
    <p>$mesajSafe</p>
";

if (sendMail($subject, $htmlContent)) {
    jsonResponse(['success' => true]);
} else {
    jsonResponse(['error' => 'Mail gönderilemedi'], 500);
}
