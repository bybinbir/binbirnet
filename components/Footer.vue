<template>
  <footer class="bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
    <!-- CTA BAR -->
    <div class="max-w-6xl mx-auto px-4">
      <div class="mt-8 rounded-3xl border border-orange-100 dark:border-slate-700 bg-gradient-to-br from-primary/10 to-white dark:from-primary/20 dark:to-slate-800 px-6 py-5 flex flex-col md:flex-row md:items-center md:items-between gap-4">
        <div>
          <h3 class="m-0 text-xl md:text-[21px] font-extrabold text-slate-900 dark:text-white">
            İşlemlerinizi saniyeler içinde tamamlayın
          </h3>
          <p class="mt-1 text-slate-600 dark:text-slate-300 font-semibold leading-relaxed">
            Hızlı ödeme, Online İşlem Merkezi ve destek sayfalarına tek tıkla ulaşın.
          </p>
        </div>

        <div class="flex gap-2 flex-wrap">
          <a
            class="no-underline px-4 py-3 rounded-xl font-extrabold text-white bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20 transition-colors"
            :href="settings?.externalLinks.payment ?? '#'"
            target="_blank"
            rel="noopener noreferrer"
          >
            Hızlı Ödeme
          </a>
          <a
            class="no-underline px-4 py-3 rounded-xl font-extrabold text-slate-900 dark:text-white bg-white dark:bg-slate-700 border border-primary/20 dark:border-slate-600 shadow-lg hover:bg-primary/5 dark:hover:bg-slate-600 transition-colors"
            :href="settings?.externalLinks.accountCenter ?? '#'"
            target="_blank"
            rel="noopener noreferrer"
          >
            Online İşlem Merkezi
          </a>
        </div>
      </div>
    </div>

    <!-- MAIN -->
    <div class="mt-8 pt-11 pb-6">
      <div class="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1.2fr_1.3fr_1.3fr] gap-6">
        <div>
          <h4 class="text-[14.5px] font-extrabold text-slate-900 dark:text-white mb-2">{{ settings?.company.name ?? 'BinbirNet' }}</h4>
          <p class="text-[13.5px] text-slate-600 dark:text-slate-400 leading-relaxed">
            {{ settings?.company.description ?? '' }}
          </p>
          <p class="text-[13.5px] text-slate-600 dark:text-slate-400 leading-relaxed mt-2">
            <strong class="text-slate-900 dark:text-white">MERSİS:</strong> {{ settings?.company.mersis ?? '' }}
          </p>
          <p class="text-[13.5px] text-slate-600 dark:text-slate-400 leading-relaxed mt-4">
            <strong class="text-slate-900 dark:text-white">{{ settings?.address.title ?? 'Merkez Ofis' }}:</strong>
            <template v-for="(line, i) in (settings?.address.lines ?? [])" :key="i">
              <br />{{ line }}
            </template>
            <br />
            <a
              class="inline-flex items-center gap-1 font-extrabold text-slate-900 dark:text-white hover:text-primary mt-2"
              :href="settings?.address.mapsUrl ?? '#'"
              target="_blank"
              rel="noopener noreferrer"
            >
              Haritada Görüntüle →
            </a>
          </p>
          <p class="text-[13.5px] text-slate-600 dark:text-slate-400 leading-relaxed mt-3">
            <NuxtLink class="hover:text-primary" to="/kurumsal">Hakkımızda</NuxtLink> ·
            <NuxtLink class="hover:text-primary" to="/kampanyalar">Duyurular</NuxtLink>
          </p>
        </div>

        <div>
          <h4 class="text-[14.5px] font-extrabold text-slate-900 dark:text-white mb-2">Hızlı Erişim</h4>
          <div class="space-y-2 text-[13.5px] text-slate-600 dark:text-slate-400">
            <p v-for="link in quickLinks" :key="link.id" class="m-0">
              <a
                v-if="link.external"
                class="hover:text-primary"
                :href="link.href"
                target="_blank"
                rel="noopener noreferrer"
              >
                {{ link.label }}
              </a>
              <NuxtLink v-else class="hover:text-primary" :to="link.href">{{ link.label }}</NuxtLink>
            </p>
          </div>
        </div>

        <div>
          <h4 class="text-[14.5px] font-extrabold text-slate-900 dark:text-white mb-2">Müşteri Hattı</h4>
          <div class="text-[13.5px]">
            <span v-for="(phone, i) in (settings?.contact.phones ?? [])" :key="i" class="block mb-1 font-extrabold text-slate-700 dark:text-slate-300 leading-snug">
              <a class="text-slate-900 dark:text-white hover:text-primary" :href="phone.href">{{ phone.number }}</a>
              <template v-if="phone.primary">
                ·
                <a
                  class="font-extrabold text-green-600 dark:text-green-400 hover:text-green-700"
                  :href="whatsappDesktopUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                </a>
              </template>
            </span>
          </div>

          <h4 class="text-[14.5px] font-extrabold text-slate-900 dark:text-white mt-4 mb-2">E-Posta</h4>
          <p class="text-[13.5px] text-slate-600 dark:text-slate-400 leading-relaxed">
            <template v-for="(email, i) in (settings?.contact.emails ?? [])" :key="i">
              <a class="hover:text-primary font-extrabold text-slate-900 dark:text-white" :href="`mailto:${email.address}`">
                {{ email.label === 'KEP' ? `KEP: ${email.address}` : email.address }}
              </a>
              <br v-if="i < (settings?.contact.emails.length ?? 0) - 1" />
            </template>
          </p>
        </div>

        <div>
          <h4 class="text-[14.5px] font-extrabold text-slate-900 dark:text-white mb-2">Yasal</h4>
          <div class="space-y-1 text-[13.5px] text-slate-600 dark:text-slate-400">
            <p class="m-0"><NuxtLink class="hover:text-primary" to="/yasal/kvkk">KVKK Metni</NuxtLink></p>
            <p class="m-0"><NuxtLink class="hover:text-primary" to="/yasal/gizlilik-politikasi">Gizlilik Politikası</NuxtLink></p>
            <p class="m-0"><NuxtLink class="hover:text-primary" to="/yasal/cerez-politikasi">Çerez Politikası</NuxtLink></p>
            <p class="m-0"><NuxtLink class="hover:text-primary" to="/yasal/iptal-iade">İptal &amp; İade</NuxtLink></p>
            <p class="m-0"><NuxtLink class="hover:text-primary" to="/yasal/bgys-politikasi">BGYS Politikası</NuxtLink></p>
            <p class="m-0"><NuxtLink class="hover:text-primary" to="/guvenli-internet">Güvenli İnternet</NuxtLink></p>
          </div>

          <h4 class="text-[14.5px] font-extrabold text-slate-900 dark:text-white mt-4 mb-2">Sosyal</h4>
          <div class="flex gap-2 flex-wrap mt-2">
            <a
              v-for="s in (settings?.social ?? [])"
              :key="s.label"
              :href="s.href"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="s.aria"
              class="w-9 h-9 rounded-xl bg-primary/5 dark:bg-slate-800 border border-primary/20 dark:border-slate-700 flex items-center justify-center font-extrabold text-xs text-slate-800 dark:text-slate-200 shadow-lg hover:-translate-y-[1px] hover:shadow-xl hover:text-primary transition-all"
            >
              {{ s.label }}
            </a>
          </div>
        </div>
      </div>

      <div class="max-w-6xl mx-auto px-4 mt-7 pt-4 border-t border-orange-100 dark:border-slate-700 text-center text-xs text-slate-500 dark:text-slate-400">
        &copy; {{ settings?.company.copyrightYear ?? new Date().getFullYear() }} {{ settings?.company.fullName ?? 'BinbirNet' }} · Tüm hakları saklıdır.
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const { data: settings } = await useSettings()
const { data: navigation } = await useNavigation()

const quickLinks = computed(() => navigation.value?.footerQuickLinks ?? [])
const whatsappDesktopUrl = computed(() => {
  const wa = settings.value?.contact.whatsapp
  return wa ? `https://web.whatsapp.com/send?phone=${wa.number}&text=${encodeURIComponent(wa.message)}` : '#'
})
</script>
