import { sendMail, verifyTurnstile } from '~/server/utils/mail';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (body.hp) {
    throw createError({ statusCode: 400, message: 'Spam detected' });
  }

  const adsoyad = String(body.adsoyad ?? '').trim();
  const telefon = String(body.telefon ?? '').trim();
  const email   = String(body.email ?? '').trim();
  const konu    = String(body.konu ?? '').trim();
  const mesaj   = String(body.mesaj ?? '').trim();
  const token   = String(body.token ?? '');

  if (!adsoyad || !telefon || !konu || !mesaj) {
    throw createError({ statusCode: 400, message: 'Eksik bilgi' });
  }

  if (!await verifyTurnstile(token)) {
    throw createError({ statusCode: 400, message: 'Robot doğrulaması başarısız' });
  }

  const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const mesajHtml = esc(mesaj).replace(/\n/g, '<br>');

  const subject = `İletişim Formu: ${esc(konu)} - ${esc(adsoyad)}`;
  const html = `
    <h3>Yeni İletişim Mesajı</h3>
    <p><b>Ad Soyad:</b> ${esc(adsoyad)}</p>
    <p><b>Telefon:</b> ${esc(telefon)}</p>
    <p><b>E-posta:</b> ${esc(email)}</p>
    <p><b>Konu:</b> ${esc(konu)}</p>
    <hr/>
    <p><b>Mesaj:</b></p>
    <p>${mesajHtml}</p>
  `;

  try {
    await sendMail(subject, html);
    return { success: true };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    throw createError({ statusCode: 500, message: `Mail gönderilemedi: ${msg}` });
  }
});
