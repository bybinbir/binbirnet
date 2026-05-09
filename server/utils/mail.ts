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

export async function verifyTurnstile(token: string): Promise<boolean> {
  const config = useRuntimeConfig();
  const secretKey = config.turnstile?.secretKey;
  if (!secretKey) return true;
  if (!token) return false;
  try {
    const res = await $fetch<{ success: boolean }>(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        body: new URLSearchParams({ secret: secretKey, response: token }).toString(),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }
    );
    return res.success;
  } catch {
    return false;
  }
}
