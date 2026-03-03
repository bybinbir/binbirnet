<?php
// php-backend/mail_helper.php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Composer autoloader yoksa manuel dahil etme (opsiyonel)
// require 'PHPMailer/src/Exception.php';
// require 'PHPMailer/src/PHPMailer.php';
// require 'PHPMailer/src/SMTP.php';

// Composer varsa:
$autoload = __DIR__ . '/vendor/autoload.php';
if (file_exists($autoload)) {
    require $autoload;
}

function sendMail($subject, $bodyHtml) {
    global $config;

    if (!class_exists(PHPMailer::class)) {
        return false;
    }
    
    $mail = new PHPMailer(true);
    
    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host       = $config['smtp_host'];
        $mail->SMTPAuth   = true;
        $mail->Username   = $config['smtp_user'];
        $mail->Password   = $config['smtp_pass'];
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // 587 için genelde STARTTLS
        $mail->Port       = $config['smtp_port'];
        $mail->CharSet    = 'UTF-8';

        // SSL Options (Eğer sertifika sorunu varsa geçici çözüm - önerilmez ama kullanıcı istemişti)
        // $mail->SMTPOptions = array(
        //     'ssl' => array(
        //         'verify_peer' => false,
        //         'verify_peer_name' => false,
        //         'allow_self_signed' => true
        //     )
        // );

        // Recipients
        $mail->setFrom($config['mail_from'], $config['mail_from_name']);
        $mail->addAddress($config['mail_to']);

        // Content
        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body    = $bodyHtml;
        $mail->AltBody = strip_tags($bodyHtml);

        $mail->send();
        return true;
    } catch (Exception $e) {
        // Log error logic here
        return false;
    }
}
