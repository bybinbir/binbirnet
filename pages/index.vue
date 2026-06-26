<template>
  <div>
    <!-- Hero Slider -->
    <SectionsHeroSlider :slides="heroSlides ?? []" />

    <!-- Feature Cards -->
    <div class="max-w-5xl mx-auto -mt-16 relative z-50 grid grid-cols-2 md:grid-cols-4 gap-6 px-4">
      <UiFeatureCard v-for="(feature, index) in (homepage?.features ?? [])" :key="index" v-bind="feature" />
    </div>

    <!-- Packages Section -->
    <section class="py-24 px-4">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
            {{ homepage?.packagesSection.title ?? 'Sizin İçin En Doğru Paket Hangisi?' }}
          </h2>
          <p class="text-slate-500 dark:text-slate-400 text-lg">
            {{ homepage?.packagesSection.subtitle ?? 'İhtiyacınıza uygun, basit ve net çözümler.' }}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <UiPackageCard v-for="pkg in packages ?? []" :key="pkg.id" :pkg="pkg" />
        </div>
      </div>
    </section>

    <!-- Online Subscription CTA -->
    <UiCTASection
      variant="white"
      title="E-Devlet ile Online Abone Olun"
      description="Eve gelmemize veya ofise gelmenize gerek yok. E-Devlet üzerinden kimlik doğrulamasıyla sözleşmenizi dakikalar içinde tamamlayın. Online Abone Ol butonuna basarak başlayabilirsiniz."
      buttonText="Online Abone Ol"
      buttonHref="https://binbirnet.com.tr/online_basvuru"
      buttonSubtext="E-Devlet ile güvenli imza"
      :features="[
        { icon: 'verified_user', text: 'E-Devlet Doğrulama' },
        { icon: 'description', text: 'Online Sözleşme' },
        { icon: 'schedule', text: 'Dakikalar İçinde' }
      ]"
    />

    <!-- CTA Section -->
    <UiCTASection
      :title="homepage?.cta.title ?? 'Bölgenizde Var mıyız?'"
      :description="homepage?.cta.description ?? ''"
      :buttonText="homepage?.cta.buttonText ?? 'Altyapımı Sorgula'"
      :buttonHref="homepage?.cta.buttonHref ?? '/altyapi-sorgula'"
      :buttonSubtext="homepage?.cta.buttonSubtext ?? ''"
      :features="homepage?.cta.features ?? []"
    />

    <!-- 3 Steps Section -->
    <section class="py-24 px-4 bg-white dark:bg-slate-800/50">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-center text-4xl font-extrabold text-slate-900 dark:text-white mb-20 relative inline-block w-full">
          {{ homepage?.stepsSection.title ?? 'Sadece 3 Adımda Aramızdasınız' }}
          <span class="block w-24 h-2 bg-primary mx-auto mt-4 rounded-full" />
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
          <UiStepCard v-for="(step, index) in (homepage?.steps ?? [])" :key="index" v-bind="step" />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { HomepageContent } from '~/types'

// API'den veri cek
const { data: heroSlides } = await useSlides()
const { data: packages } = await usePackages()
const { data: homepage } = await useAsyncData('homepage', () => $fetch<HomepageContent>('/api/homepage'))

// SEO - API'den gelecek (useSeoMeta plugin tarafindan uygulanir)
const { data: seo } = await useAsyncData('seo', () => $fetch('/api/seo'))
const pageSeo = computed(() => (seo.value as any)?.pages?.['/'])

useSeoMeta({
  title: pageSeo.value?.title ?? "BinbirNet | Anamur ve Bozyazı'nın En Hızlı İnterneti",
  description: pageSeo.value?.description ?? "Anamur ve Bozyazı'da taahhütsüz, kotasız, yüksek hızlı fiber internet.",
  keywords: pageSeo.value?.keywords ?? "anamur internet, bozyazı internet, fiber internet, kotasız internet, binbirnet",
})
</script>
