<template>
  <header
    class="fixed top-0 w-full z-[100] border-b backdrop-blur-md transition-all duration-300"
    :class="scrolled
      ? 'bg-white/90 dark:bg-slate-900/90 border-orange-100 dark:border-slate-700 shadow-[0_10px_30px_rgba(255,126,95,.08)]'
      : 'bg-white/75 dark:bg-slate-900/75 border-orange-50 dark:border-slate-800'"
  >
    <div
      class="max-w-7xl mx-auto px-4 flex items-center justify-between gap-3 transition-all duration-300"
      :class="scrolled ? 'h-16' : 'h-20'"
    >
      <!-- BRAND -->
      <NuxtLink to="/" class="flex items-center" @click="onLogoClick">
        <img
          src="/img/logo.webp"
          alt="BinbirNet Logo"
          width="120"
          height="44"
          class="h-9 md:h-11 w-auto object-contain"
          fetchpriority="high"
        />
      </NuxtLink>

      <!-- DESKTOP NAV -->
      <nav class="hidden md:flex items-center gap-1">
        <NuxtLink
          v-for="n in NAV"
          :key="n.label"
          :to="n.href"
          :target="n.external ? '_blank' : undefined"
          :rel="n.external ? 'noopener noreferrer' : undefined"
          class="group flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-200"
          :class="isActive(n.href)
            ? 'bg-primary/10 text-primary'
            : 'hover:bg-orange-50 dark:hover:bg-slate-800'"
        >
          <span
            class="material-symbols-outlined text-lg transition-all duration-200"
            :class="isActive(n.href)
              ? 'text-primary'
              : 'text-orange-400 group-hover:text-bn-logo-green group-hover:scale-105'"
          >
            {{ n.icon }}
          </span>
          <span
            class="font-semibold text-xs uppercase tracking-wide transition-colors duration-200"
            :class="isActive(n.href)
              ? 'text-primary'
              : 'text-slate-700 dark:text-slate-200 group-hover:text-bn-logo-green'"
          >
            {{ n.label }}
          </span>
          <span v-if="n.external" class="material-symbols-outlined text-xs text-slate-400">
            open_in_new
          </span>
        </NuxtLink>
      </nav>

      <!-- RIGHT SIDE (desktop) -->
      <div class="hidden lg:flex items-center gap-1 bg-orange-50 dark:bg-slate-800 p-1.5 rounded-xl px-2 border border-orange-100 dark:border-slate-700">
        <!-- Hızlı ödeme -->
        <a
          :href="paymentUrl"
          target="_blank"
          rel="noopener noreferrer"
          title="Hızlı Ödeme"
          class="group flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg hover:bg-white dark:hover:bg-slate-700 transition-all"
        >
          <div class="w-8 h-8 rounded-lg bg-white dark:bg-slate-700 flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all">
            <span class="material-symbols-outlined text-xl text-primary">wallet</span>
          </div>
          <span class="text-[9px] font-bold text-slate-600 dark:text-slate-300 group-hover:text-primary transition-colors">
            Ödeme
          </span>
        </a>

        <!-- WhatsApp -->
        <a
          :href="whatsappUrl"
          target="_blank"
          rel="noopener noreferrer"
          title="WhatsApp Destek"
          class="group flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg hover:bg-white dark:hover:bg-slate-700 transition-all"
        >
          <div class="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all">
            <span class="material-symbols-outlined text-xl text-green-600 dark:text-green-400">chat</span>
          </div>
          <span class="text-[9px] font-bold text-slate-600 dark:text-slate-300 group-hover:text-green-600 transition-colors">
            WhatsApp
          </span>
        </a>

        <!-- Online İşlem Merkezi -->
        <a
          :href="accountUrl"
          target="_blank"
          rel="noopener noreferrer"
          title="Online İşlem Merkezi"
          class="group flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg hover:bg-white dark:hover:bg-slate-700 transition-all"
        >
          <div class="w-8 h-8 rounded-lg bg-white dark:bg-slate-700 flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all">
            <span class="material-symbols-outlined text-xl text-blue-500">person</span>
          </div>
          <span class="text-[9px] font-bold text-slate-600 dark:text-slate-300 group-hover:text-blue-500 transition-colors">
            Hesabım
          </span>
        </a>

        <!-- Divider -->
        <div class="h-10 w-px bg-orange-200 dark:bg-slate-600 mx-0.5"></div>

        <!-- Telefon -->
        <a
          :href="primaryPhone?.href ?? '#'"
          class="group flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-white dark:hover:bg-slate-700 transition-all"
        >
          <div class="w-8 h-8 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all">
            <span class="material-symbols-outlined text-xl text-primary">call</span>
          </div>
          <div class="flex flex-col">
            <span class="text-[9px] font-bold text-orange-500 leading-tight">Bize ulaşın</span>
            <span class="font-extrabold text-xs text-slate-900 dark:text-white group-hover:text-primary transition-colors whitespace-nowrap">
              {{ primaryPhone?.number ?? '' }}
            </span>
          </div>
        </a>

        <!-- Divider -->
        <div class="h-10 w-px bg-orange-200 dark:bg-slate-600 mx-0.5"></div>

        <!-- Desktop CTA -->
        <NuxtLink
          to="/basvuru"
          class="h-9 px-4 rounded-lg bg-primary hover:bg-primary/90 text-white font-bold text-xs transition-all shadow-md hover:shadow-lg flex items-center gap-1.5 group"
        >
          <span>Başvur</span>
          <span class="material-symbols-outlined text-sm group-hover:translate-x-0.5 transition-transform">
            arrow_forward
          </span>
        </NuxtLink>
      </div>

      <!-- Dark Mode Toggle + Mobile hamburger -->
      <div class="flex items-center gap-2">
        <ThemeToggle />

        <!-- Mobile hamburger -->
        <button
          ref="hamburgerRef"
          class="md:hidden w-10 h-10 rounded-full border border-orange-200 dark:border-slate-600 bg-white dark:bg-slate-800 flex items-center justify-center hover:bg-orange-50 dark:hover:bg-slate-700 transition-colors"
          @click="openDrawer"
          aria-label="Menüyü aç"
          :aria-expanded="mobileOpen"
          aria-controls="mobile-drawer"
        >
          <span class="material-symbols-outlined text-slate-700 dark:text-slate-200">menu</span>
        </button>
      </div>
    </div>

    <!-- MOBILE DRAWER -->
    <client-only>
      <div
        v-if="mobileOpen"
        class="fixed inset-0 z-50"
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
        id="mobile-drawer"
      >
        <div
          class="absolute inset-0 bg-black/40"
          :class="isClosing ? 'overlay-exit' : 'overlay-enter'"
          @click="closeDrawer"
        />

        <div
          ref="drawerRef"
          class="absolute top-0 left-0 right-0 bg-white dark:bg-slate-900 rounded-b-3xl shadow-xl border-b border-orange-100 dark:border-slate-700"
          :class="isClosing ? 'drawer-exit' : 'drawer-enter'"
        >
          <div class="max-w-7xl mx-auto px-4 pt-4 pb-6">
            <div class="flex items-center justify-between">
              <NuxtLink to="/" class="flex items-center gap-2" @click="onLogoClick; closeDrawer">
                <img
                  src="/img/logo.webp"
                  alt="BinbirNet Logo"
                  width="100"
                  height="36"
                  class="h-8 w-auto object-contain"
                />
              </NuxtLink>
              <div class="flex items-center gap-2">
                <ThemeToggle />
                <NuxtLink
                  to="/basvuru"
                  @click="closeDrawer"
                  class="h-10 px-5 rounded-full bg-primary hover:bg-primary/90 text-white font-bold text-sm transition-all shadow-lg hover:shadow-primary/25 flex items-center gap-2 group"
                >
                  <span class="group-hover:translate-x-0.5 transition-transform">Hemen Başvur</span>
                  <span class="material-symbols-outlined text-[20px]">arrow_forward</span>
                </NuxtLink>
                <button
                  ref="closeButtonRef"
                  class="w-10 h-10 rounded-full border border-orange-200 dark:border-slate-600 bg-white dark:bg-slate-800 hover:bg-orange-50 dark:hover:bg-slate-700 transition-colors flex items-center justify-center"
                  @click="closeDrawer"
                  aria-label="Menüyü kapat"
                >
                  <span class="material-symbols-outlined text-slate-700 dark:text-slate-200">close</span>
                </button>
              </div>
            </div>

            <!-- Drawer Title for A11y -->
            <h2 id="drawer-title" class="sr-only">Ana Menü</h2>

            <!-- Mobile nav -->
            <div class="mt-6 grid gap-3">
              <NuxtLink
                v-for="n in NAV"
                :key="n.label"
                :to="n.href"
                :target="n.external ? '_blank' : undefined"
                :rel="n.external ? 'noopener noreferrer' : undefined"
                @click="closeDrawer"
                class="group rounded-2xl border p-4 flex items-center gap-4 transition-colors"
                :class="isActive(n.href)
                  ? 'border-primary bg-primary/10'
                  : 'border-orange-100 dark:border-slate-700 bg-orange-50/50 dark:bg-slate-800/50 hover:bg-orange-100 dark:hover:bg-slate-700'"
              >
                <div
                  class="w-12 h-12 rounded-xl border flex items-center justify-center group-hover:scale-105 transition-transform"
                  :class="isActive(n.href)
                    ? 'bg-primary/20 border-primary/30'
                    : 'bg-white dark:bg-slate-800 border-orange-100 dark:border-slate-600'"
                >
                  <span class="material-symbols-outlined text-2xl text-primary">
                    {{ n.icon }}
                  </span>
                </div>
                <span class="font-bold" :class="isActive(n.href) ? 'text-primary' : 'text-slate-900 dark:text-white'">
                  {{ n.label }}
                </span>
                <span v-if="n.external" class="material-symbols-outlined text-sm text-slate-400 ml-auto">
                  open_in_new
                </span>
              </NuxtLink>
            </div>

            <!-- Mobile quick actions -->
            <div class="mt-6 rounded-2xl border border-orange-100 dark:border-slate-700 bg-white dark:bg-slate-800 p-4">
              <div class="text-xs text-orange-500 font-bold uppercase tracking-wider mb-4">Hızlı İşlemler</div>
              <div class="grid grid-cols-3 gap-3">
                <a
                  :href="paymentUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex flex-col items-center gap-2 p-3 rounded-xl bg-orange-50 dark:bg-slate-700 hover:bg-orange-100 dark:hover:bg-slate-600 transition-colors"
                >
                  <span class="material-symbols-outlined text-2xl text-primary">wallet</span>
                  <span class="text-xs font-bold text-slate-700 dark:text-slate-200">Ödeme</span>
                </a>
                <a
                  :href="accountUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex flex-col items-center gap-2 p-3 rounded-xl bg-orange-50 dark:bg-slate-700 hover:bg-orange-100 dark:hover:bg-slate-600 transition-colors"
                >
                  <span class="material-symbols-outlined text-2xl text-primary">person</span>
                  <span class="text-xs font-bold text-slate-700 dark:text-slate-200">Hesabım</span>
                </a>
                <a
                  :href="whatsappUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex flex-col items-center gap-2 p-3 rounded-xl bg-green-50 dark:bg-green-900/30 hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors"
                >
                  <span class="material-symbols-outlined text-2xl text-green-600 dark:text-green-400">chat</span>
                  <span class="text-xs font-bold text-slate-700 dark:text-slate-200">WhatsApp</span>
                </a>
              </div>
            </div>

            <!-- Phone -->
            <div class="mt-4 rounded-2xl bg-primary p-4 text-white text-center">
              <div class="text-sm opacity-90">Bize ulaşın</div>
              <a :href="primaryPhone?.href ?? '#'" class="block text-2xl font-extrabold mt-1">
                {{ primaryPhone?.number ?? '' }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </client-only>
  </header>
</template>

<script setup lang="ts">
import ThemeToggle from '@/components/ui/ThemeToggle.vue';

const { data: settings } = await useSettings()
const { data: navigation } = await useNavigation()

const NAV = computed(() => navigation.value?.header ?? [])
const primaryPhone = computed(() => settings.value?.contact.phones.find(p => p.primary) ?? settings.value?.contact.phones[0])
const whatsappUrl = computed(() => {
  const wa = settings.value?.contact.whatsapp
  return wa ? `https://wa.me/${wa.number}?text=${encodeURIComponent(wa.message)}` : '#'
})
const paymentUrl = computed(() => settings.value?.externalLinks.payment ?? '#')
const accountUrl = computed(() => settings.value?.externalLinks.accountCenter ?? '#')

const mobileOpen = ref(false);
const isClosing = ref(false);
const scrolled = ref(false);

const route = useRoute();
const drawerRef = ref<HTMLElement | null>(null);
const hamburgerRef = ref<HTMLButtonElement | null>(null);
const closeButtonRef = ref<HTMLButtonElement | null>(null);

const isActive = (href: string) => route.path === href;

const onLogoClick = () => {
  if (!import.meta.client) return;
  if (route.path === "/") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

const openDrawer = () => {
  mobileOpen.value = true;
  isClosing.value = false;
};

const closeDrawer = () => {
  isClosing.value = true;
  setTimeout(() => {
    mobileOpen.value = false;
    isClosing.value = false;
    // Focus back to hamburger
    hamburgerRef.value?.focus();
  }, 250);
};

// Event handlers (dışarıda tanımla, cleanup için)
const onScroll = () => {
  scrolled.value = window.scrollY > 8;
};

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === "Escape" && mobileOpen.value) {
    closeDrawer();
  }
};

const handleTab = (e: KeyboardEvent) => {
  if (!mobileOpen.value || isClosing.value || e.key !== "Tab" || !drawerRef.value) return;

  const drawer = drawerRef.value;
  const focusableElements = drawer.querySelectorAll<HTMLElement>(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];

  if (e.shiftKey) {
    if (document.activeElement === firstFocusable) {
      e.preventDefault();
      lastFocusable?.focus();
    }
  } else {
    if (document.activeElement === lastFocusable) {
      e.preventDefault();
      firstFocusable?.focus();
    }
  }
};

// Scroll detection + keyboard events
onMounted(() => {
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("keydown", handleKeyDown);
  document.addEventListener("keydown", handleTab);
});

onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
  window.removeEventListener("keydown", handleKeyDown);
  document.removeEventListener("keydown", handleTab);
});

// Focus management when drawer opens
watch(mobileOpen, (newVal) => {
  if (newVal && !isClosing.value) {
    nextTick(() => {
      setTimeout(() => closeButtonRef.value?.focus(), 50);
    });
  }
});

// Body scroll lock
watch(mobileOpen, (isOpen) => {
  if (import.meta.client) {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
  }
});

// Close drawer on route change
watch(() => route.path, () => {
    if (mobileOpen.value) {
        closeDrawer();
    }
});
</script>
