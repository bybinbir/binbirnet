import { sendMail, verifyRecaptcha } from '~/server/utils/mail';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (body.hp) {
    throw createError({ statusCode: 400, message: 'Spam detected' });
  }

  const adsoyad = String(body.adsoyad ?? '').trim();
  const telefon = String(body.telefon ?? '').trim();
  const email   = String(body.email ?? '').trim();
  const paket   = String(body.paket ?? '').trim();
  const kvkk    = body.kvkk;
  const token   = String(body.token ?? '');
  const infra   = body.infra ?? null;

  if (!kvkk || !adsoyad || !telefon || !paket) {
    throw createError({ statusCode: 400, message: 'Eksik bilgi' });
  }

  if (!await verifyRecaptcha(token)) {
    throw createError({ statusCode: 400, message: 'Robot doğrulaması başarısız' });
  }

  const esc = (s: string) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  let infraHtml = '<p>Altyapı bilgisi yok</p>';
  if (infra?.full_address) {
    infraHtml = `
      <div style="background:#f0f0f0;padding:10px;border-radius:5px;">
        <p><b>Adres:</b> ${esc(infra.full_address)}</p>
        <p><b>BBK:</b> ${esc(infra.result?.bbk ?? infra.bbk ?? '-')}</p>
        <p><b>Hız:</b> ${esc(String(infra.result?.max_mbps ?? infra.max_mbps ?? '-'))} Mbps</p>
        <p><b>Teknoloji:</b> ${esc(infra.result?.tech ?? infra.tech ?? '-')}</p>
      </div>
    `;
  }

  const subject = `Yeni Başvuru: ${esc(adsoyad)} - ${esc(paket)}`;
  const html = `
    <h3>Yeni İnternet Başvurusu</h3>
    <p><b>Ad Soyad:</b> ${esc(adsoyad)}</p>
    <p><b>Telefon:</b> ${esc(telefon)}</p>
    <p><b>E-posta:</b> ${esc(email)}</p>
    <p><b>Seçilen Paket:</b> ${esc(paket)}</p>
    <p><b>KVKK Onayı:</b> Evet</p>
    <hr/>
    <h4>Altyapı Bilgileri</h4>
    ${infraHtml}
  `;

  try {
    await sendMail(subject, html);
    return { success: true };
  } catch {
    throw createError({ statusCode: 500, message: 'Mail gönderilemedi' });
  }
});
