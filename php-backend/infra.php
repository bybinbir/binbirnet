<?php
// php-backend/infra.php
require 'config.php';

handleCors();

// Session (optional rate limit)
session_start();

$rateLimitWindow = 1;
$reqTime = microtime(true);
$lastReq = $_SESSION['last_request_time'] ?? 0;
if ($reqTime - $lastReq < 0.1) {
    // no-op (soft limit)
}
$_SESSION['last_request_time'] = $reqTime;

$baseUrl = "https://poyraznet.com/altyapi-ajax";

$endpoint = sanitize($_REQUEST['endpoint'] ?? '');
$kod = sanitize($_REQUEST['kod'] ?? '');
$ilce_kodu = sanitize($_REQUEST['ilce_kodu'] ?? '');
$raw = sanitize($_REQUEST['raw'] ?? '');
$format = sanitize($_REQUEST['format'] ?? '');

$islemMap = [
    'ilceler' => 'ilcelistesi',
    'bucaklar' => 'bucaklistesi',
    'koyler' => 'koylistesi',
    'mahalleler' => 'mahallelistesi',
    'caddeler' => 'caddelistesi',
    'binalar' => 'binalistesi',
    'daireler' => 'dairelistesi',
    'dairesorgula' => 'dairesorgula'
];

$islem = $islemMap[$endpoint] ?? '';
if (!$islem) {
    jsonResponse(['error' => 'Invalid endpoint'], 400);
}

if ($endpoint === 'ilceler' && $kod === '33') {
    jsonResponse([
        'options' => [
            ['value' => '2064', 'label' => 'AKDENİZ'],
            ['value' => '1135', 'label' => 'ANAMUR'],
            ['value' => '1766', 'label' => 'AYDINCIK'],
            ['value' => '1779', 'label' => 'BOZYAZI'],
            ['value' => '1892', 'label' => 'ÇAMLIYAYLA'],
            ['value' => '1311', 'label' => 'ERDEMLİ'],
            ['value' => '1366', 'label' => 'GÜLNAR'],
            ['value' => '2065', 'label' => 'MEZİTLİ'],
            ['value' => '1536', 'label' => 'MUT'],
            ['value' => '1621', 'label' => 'SİLİFKE'],
            ['value' => '1665', 'label' => 'TARSUS'],
            ['value' => '2066', 'label' => 'TOROSLAR'],
            ['value' => '2067', 'label' => 'YENİŞEHİR']
        ]
    ]);
}

$params = ['islem' => $islem];
if ($kod !== '') $params['kod'] = $kod;
if ($ilce_kodu !== '') $params['ilce_kodu'] = $ilce_kodu;

$url = $baseUrl . '?' . http_build_query($params);

// cURL request
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Accept: text/html, */*; q=0.01",
    "Accept-Language: tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7",
    "X-Requested-With: XMLHttpRequest",
    "Referer: https://poyraznet.com/altyapi-sorgu",
    "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
]);

$body = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode !== 200 || !$body) {
    jsonResponse(['error' => 'Upstream error'], 500);
}

if ($endpoint === 'dairesorgula') {
    $data = json_decode($body, true);
    if (!$data) {
        $data = parseDaireSorguHtml($body);
    }

    if (empty($data['bbk']) && preg_match('/^\d{7,10}$/', $kod)) {
        $data['bbk'] = $kod;
    }

    jsonResponse($data);
}

if (wantsRawHtml($raw, $format)) {
    header('Content-Type: text/html; charset=utf-8');
    echo $body;
    exit();
}

jsonResponse(['options' => parseOptionsFromHtml($body)]);

function parseOptionsFromHtml($html) {
    $out = [];
    preg_match_all('/<option\b[^>]*value="([^"]*)"[^>]*>(.*?)<\/option>/is', $html, $matches, PREG_SET_ORDER);
    foreach ($matches as $m) {
        $val = trim($m[1]);
        $lbl = trim(strip_tags($m[2]));
        $lbl = str_replace(['&nbsp;', '&amp;', '&#39;', '&quot;'], [' ', '&', "'", '"'], $lbl);
        $lbl = trim($lbl);
        if (!$val || strtolower($val) === 'null') continue;
        $out[] = ['value' => $val, 'label' => $lbl];
    }
    return $out;
}

function parseDaireSorguHtml($html) {
    $result = [
        'bbk' => null,
        'available' => false,
        'max_mbps' => null,
        'tech' => null,
        'distance_m' => null
    ];

    $text = html_entity_decode($html, ENT_QUOTES | ENT_HTML5, 'UTF-8');
    $text = str_replace(["\xC2\xA0", "\xA0"], ' ', $text);

    if (preg_match('/(\d{6,10})\s*BBK\s*numaral/i', $text, $m)) {
        $result['bbk'] = $m[1];
    } elseif (preg_match('/BBK\s*:\s*(\d{6,10})/i', $text, $m)) {
        $result['bbk'] = $m[1];
    } elseif (preg_match('/\b(\d{6,10})\s*BBK\b/i', $text, $m)) {
        $result['bbk'] = $m[1];
    }

    if (preg_match('/\*\*(\d+)\s*Mbps\*\*/i', $text, $m)) {
        $result['max_mbps'] = (int)$m[1];
        $result['available'] = true;
    } elseif (preg_match('/(\d+)\s*Mbps/i', $text, $m)) {
        $result['max_mbps'] = (int)$m[1];
        $result['available'] = true;
    } elseif (preg_match('/hizmet.*?(\d+)\s*mbps/i', $text, $m)) {
        $result['max_mbps'] = (int)$m[1];
        $result['available'] = true;
    }

    if (preg_match('/FİBER|FIBER/i', $text)) {
        $result['tech'] = 'FİBER';
    } elseif (preg_match('/VDSL/i', $text)) {
        $result['tech'] = 'VDSL';
    } elseif (preg_match('/ADSL/i', $text)) {
        $result['tech'] = 'ADSL';
    }

    if (preg_match('/uzakliginiz\s*\*\*(\d+)\s*metre\*\*/i', $text, $m)) {
        $result['distance_m'] = (int)$m[1];
    } elseif (preg_match('/uzakliginiz[^0-9]*(\d+)\s*metre/i', $text, $m)) {
        $result['distance_m'] = (int)$m[1];
    } elseif (preg_match('/santral.*?(\d+)\s*metre/i', $text, $m)) {
        $result['distance_m'] = (int)$m[1];
    } elseif (preg_match('/(\d+)\s*metre.*uzak/i', $text, $m)) {
        $result['distance_m'] = (int)$m[1];
    }

    if (preg_match('/altyapi\s+bulunmamaktadir/i', $text) ||
        preg_match('/uygun\s+altyapi\s+bulunmamaktadir/i', $text)) {
        $result['available'] = false;
    }

    if (preg_match('/TEBRIKLER/i', $text) ||
        preg_match('/hizmet\s+bulunmaktadir/i', $text) ||
        preg_match('/internet\s+hizmeti\s+bulunmaktadir/i', $text)) {
        $result['available'] = true;
    }

    $clean = preg_replace('/\s+/', ' ', strip_tags($text));
    if (!$result['bbk'] && preg_match('/(\d{6,10})\s*BBK/i', $clean, $m)) {
        $result['bbk'] = $m[1];
    }
    if (!$result['distance_m'] && preg_match('/(\d+)\s*metre/i', $clean, $m)) {
        $result['distance_m'] = (int)$m[1];
    }

    return $result;
}

function sanitize($value) {
    return trim((string)$value);
}

function wantsRawHtml($raw, $format) {
    if ($raw === '1') return true;
    if (strtolower($format) === 'html') return true;
    return false;
}
