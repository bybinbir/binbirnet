import { $fetch } from 'ofetch';

const MERSIN_ILCELER = [
  { value: '2064', label: 'AKDENİZ' },
  { value: '1135', label: 'ANAMUR' },
  { value: '1766', label: 'AYDINCIK' },
  { value: '1779', label: 'BOZYAZI' },
  { value: '1892', label: 'ÇAMLIYAYLA' },
  { value: '1311', label: 'ERDEMLİ' },
  { value: '1366', label: 'GÜLNAR' },
  { value: '2065', label: 'MEZİTLİ' },
  { value: '1536', label: 'MUT' },
  { value: '1621', label: 'SİLİFKE' },
  { value: '1665', label: 'TARSUS' },
  { value: '2066', label: 'TOROSLAR' },
  { value: '2067', label: 'YENİŞEHİR' },
];

const ISLEM_MAP: Record<string, string> = {
  ilceler: 'ilcelistesi',
  bucaklar: 'bucaklistesi',
  koyler: 'koylistesi',
  mahalleler: 'mahallelistesi',
  caddeler: 'caddelistesi',
  binalar: 'binalistesi',
  daireler: 'dairelistesi',
  dairesorgula: 'dairesorgula',
};

function parseOptionsFromHtml(html: string) {
  const out: { value: string; label: string }[] = [];
  const re = /<option\b[^>]*value="([^"]*)"[^>]*>(.*?)<\/option>/gis;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    const val = m[1].trim();
    let lbl = m[2].replace(/<[^>]+>/g, '').trim();
    lbl = lbl.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"').trim();
    if (!val || val.toLowerCase() === 'null') continue;
    out.push({ value: val, label: lbl });
  }
  return out;
}

function parseDaireSorguHtml(html: string) {
  const result = {
    bbk: null as string | null,
    available: false,
    max_mbps: null as number | null,
    tech: null as string | null,
    distance_m: null as number | null,
  };

  let text = html.replace(/&nbsp;|\xA0/g, ' ');

  const bbkPatterns = [
    /(\d{6,10})\s*BBK\s*numaral/i,
    /BBK\s*:\s*(\d{6,10})/i,
    /\b(\d{6,10})\s*BBK\b/i,
  ];
  for (const p of bbkPatterns) {
    const m = text.match(p);
    if (m) { result.bbk = m[1]; break; }
  }

  const mbpsPatterns = [
    /\*\*(\d+)\s*Mbps\*\*/i,
    /(\d+)\s*Mbps/i,
    /hizmet.*?(\d+)\s*mbps/i,
  ];
  for (const p of mbpsPatterns) {
    const m = text.match(p);
    if (m) { result.max_mbps = parseInt(m[1]); result.available = true; break; }
  }

  if (/FİBER|FIBER/i.test(text)) result.tech = 'FİBER';
  else if (/VDSL/i.test(text)) result.tech = 'VDSL';
  else if (/ADSL/i.test(text)) result.tech = 'ADSL';

  const distPatterns = [
    /uzakliginiz\s*\*\*(\d+)\s*metre\*\*/i,
    /uzakliginiz[^0-9]*(\d+)\s*metre/i,
    /santral.*?(\d+)\s*metre/i,
    /(\d+)\s*metre.*uzak/i,
  ];
  for (const p of distPatterns) {
    const m = text.match(p);
    if (m) { result.distance_m = parseInt(m[1]); break; }
  }

  if (/altyapi\s+bulunmamaktadir|uygun\s+altyapi\s+bulunmamaktadir/i.test(text)) {
    result.available = false;
  }
  if (/TEBRIKLER|hizmet\s+bulunmaktadir|internet\s+hizmeti\s+bulunmaktadir/i.test(text)) {
    result.available = true;
  }

  const clean = text.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ');
  if (!result.bbk) {
    const m = clean.match(/(\d{6,10})\s*BBK/i);
    if (m) result.bbk = m[1];
  }
  if (!result.distance_m) {
    const m = clean.match(/(\d+)\s*metre/i);
    if (m) result.distance_m = parseInt(m[1]);
  }

  return result;
}

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const endpoint = String(query.endpoint ?? '').trim();
  const kod = String(query.kod ?? '').trim();
  const ilce_kodu = String(query.ilce_kodu ?? '').trim();

  const islem = ISLEM_MAP[endpoint];
  if (!islem) {
    throw createError({ statusCode: 400, message: 'Invalid endpoint' });
  }

  if (endpoint === 'ilceler' && kod === '33') {
    return { options: MERSIN_ILCELER };
  }

  const params = new URLSearchParams({ islem });
  if (kod) params.set('kod', kod);
  if (ilce_kodu) params.set('ilce_kodu', ilce_kodu);

  const url = `https://poyraznet.com/altyapi-ajax?${params.toString()}`;

  let body: string;
  try {
    body = await $fetch<string>(url, {
      responseType: 'text',
      headers: {
        'Accept': 'text/html, */*; q=0.01',
        'Accept-Language': 'tr-TR,tr;q=0.9',
        'X-Requested-With': 'XMLHttpRequest',
        'Referer': 'https://poyraznet.com/altyapi-sorgu',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });
  } catch {
    throw createError({ statusCode: 502, message: 'Upstream error' });
  }

  if (endpoint === 'dairesorgula') {
    let data: Record<string, unknown> | null = null;
    try { data = JSON.parse(body); } catch { /* not JSON */ }
    if (!data) data = parseDaireSorguHtml(body);
    if (!data.bbk && /^\d{7,10}$/.test(kod)) data.bbk = kod;
    return data;
  }

  return { options: parseOptionsFromHtml(body) };
});
