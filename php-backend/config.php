<?php
// php-backend/config.php

// Error Handling (Production için kapatılabilir)
ini_set('display_errors', 0);
ini_set('display_startup_errors', 0);
error_reporting(0);

// CORS Handling
function handleCors() {
    // İzin verilen originler. * yerine spesifik domain daha güvenlidir.
    // Örn: https://binbirnet.com.tr
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '*';
    
    header("Access-Control-Allow-Origin: $origin");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
    
    // Preflight request için çıkış
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        http_response_code(200);
        exit();
    }
}

// JSON Response Helper
function jsonResponse($data, $status = 200) {
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit();
}

// Env Variables / Configuration
// Güvenlik: Bu dosyayı web erişimine kapalı tutun veya değerleri server env'den okuyun.
$config = [
    'smtp_host' => 'm.wifitelekom.com',
    'smtp_port' => 587,
    'smtp_user' => 'binbir-web@wifitelekom.com',
    'smtp_pass' => 'Binbir1001', // Prod ortamında doğrudan yazmak yerine getenv kullanın
    'mail_from' => 'binbir-web@wifitelekom.com',
    'mail_from_name' => 'BinbirNet Web',
    'mail_to'   => 'internet@binbirnet.com.tr',
    
    'recaptcha_secret' => '6LcVb04sAAAAAPA9rf2IICT1e1qvxLqU9flC0rwV', // v3 Secret Key
];

// Helper: Verify ReCAPTCHA
function verifyRecaptcha($token) {
    global $config;
    
    if (!$token) return false;
    
    // Eğer secret key test key ise (6Lc...) ve production değilsek bypass edilebilir
    // Ancak burada basitçe doğrulama yapalım.
    
    $url = 'https://www.google.com/recaptcha/api/siteverify';
    $data = [
        'secret' => $config['recaptcha_secret'],
        'response' => $token
    ];
    
    $options = [
        'http' => [
            'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
            'method'  => 'POST',
            'content' => http_build_query($data)
        ]
    ];
    
    $context  = stream_context_create($options);
    $result = file_get_contents($url, false, $context);
    $json = json_decode($result);
    
    return $json->success && ($json->score ?? 1.0) >= 0.5;
}
