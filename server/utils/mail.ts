import nodemailer from 'nodemailer';

export async function sendMail(subject: string, bodyHtml: string) {
  const config = useRuntimeConfig();

  const transporter = nodemailer.createTransport({
    host: config.smtpHost,
    port: parseInt(config.smtpPort),
    secure: false,
    auth: {
      user: config.smtpUser,
      pass: config.smtpPass,
    },
  });

  await transporter.sendMail({
    from: `"${config.mailFromName}" <${config.mailFrom}>`,
    to: config.mailTo,
    subject,
    html: bodyHtml,
    text: bodyHtml.replace(/<[^>]+>/g, ''),
  });
}

export async function verifyRecaptcha(token: string): Promise<boolean> {
  const config = useRuntimeConfig();
  if (!config.public.RECAPTCHA_SITE_KEY) return true;
  if (!token) return false;
  try {
    const res = await $fetch<{ success: boolean; score?: number }>(
      'https://www.google.com/recaptcha/api/siteverify',
      {
        method: 'POST',
        body: new URLSearchParams({
          secret: config.recaptchaSecret,
          response: token,
        }).toString(),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }
    );
    return res.success && (res.score ?? 1.0) >= 0.5;
  } catch {
    return false;
  }
}
