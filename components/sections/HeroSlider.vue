<template>
  <section
    class="relative px-4 mb-12 group"
    aria-label="Öne Çıkan Kampanyalar"
    @mouseenter="isPaused = true"
    @mouseleave="isPaused = false"
    @focus="isPaused = true"
    @blur="isPaused = false"
  >
    <div v-if="slides && slides.length > 0" class="max-w-7xl mx-auto rounded-4xl overflow-hidden relative shadow-2xl h-[480px]">
      <!-- Slides -->
      <div
        v-for="(slide, index) in slides"
        :key="index"
        :class="[
          'absolute inset-0 h-full flex items-center',
          index === currentSlide && isAnimating ? 'slide-fade-in z-20' : 
          index === prevSlide && isAnimating ? 'slide-fade-out z-10' : 'z-20'
        ]"
        :style="{ opacity: index === currentSlide && !isAnimating ? 1 : undefined }"
        :aria-hidden="index !== currentSlide"
        v-show="index === currentSlide || (index === prevSlide && isAnimating)"
      >
        <!-- Background Image -->
        <!-- Using standard img for now, verify @nuxt/image later -->
        <img
          :src="slide.image"
          :alt="slide.imageAlt"
          class="absolute inset-0 w-full h-full object-cover"
          :loading="index === 0 ? 'eager' : 'lazy'"
          :fetchpriority="index === 0 ? 'high' : 'auto'"
        />
        <div class="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-white/40 dark:from-slate-900/90 dark:via-slate-900/70 dark:to-slate-900/40" />

        <!-- Content -->
        <div class="relative z-10 grid grid-cols-1 lg:grid-cols-2 w-full px-8 lg:px-24 items-center">
          <div class="z-10">
            <span class="inline-block px-4 py-1 rounded-full bg-white/50 dark:bg-slate-800/50 text-primary text-sm font-bold mb-4 border border-primary/20">
              {{ slide.badge }}
            </span>
            <h1 class="text-4xl lg:text-6xl font-extrabold text-slate-900 dark:text-white leading-tight mb-6" v-html="slide.title"></h1>
            <p class="text-slate-600 dark:text-slate-300 text-xl mb-8 max-w-md leading-relaxed">
              {{ slide.description }}
            </p>
            <div class="flex flex-wrap gap-4">
              <NuxtLink
                :to="slide.buttonHref"
                class="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 transition-all hover:scale-105 shadow-xl shadow-primary/30 group"
                :tabindex="index === currentSlide ? 0 : -1"
              >
                {{ slide.buttonText }}
                <span class="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                  {{ slide.buttonIcon }}
                </span>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <!-- Light Sweep Overlay -->
      <div v-if="isAnimating" class="absolute inset-0 z-30 overflow-hidden pointer-events-none">
        <div
          class="light-sweep absolute inset-y-0 w-1/3"
          style="background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 20%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0.1) 80%, transparent 100%); box-shadow: 0 0 80px 40px rgba(255,255,255,0.5);"
        />
      </div>

      <!-- Controls Container -->
      <div class="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-4">

        <!-- Pause/Play Toggle - Hidden unless focused -->
        <button
          @click="isPaused = !isPaused"
          class="sr-only focus:not-sr-only focus:absolute focus:bottom-full focus:mb-2 focus:bg-white focus:text-primary focus:px-3 focus:py-1 focus:rounded-lg focus:shadow-lg focus:whitespace-nowrap"
          :aria-pressed="isPaused"
          :aria-label="isPaused ? 'Slayt gösterisini başlat' : 'Slayt gösterisini duraklat'"
        >
          {{ isPaused ? "Başlat" : "Duraklat" }}
        </button>

        <!-- Navigation Dots & Progress -->
         <!-- Note: Using template v-for with a wrapper or direct buttons -->
        <button
          v-for="(slide, index) in slides"
          :key="index"
          @click="manualJump(index)"
          :disabled="isAnimating"
          class="relative group focus:outline-none"
          :aria-label="`Slayt ${index + 1}e git`"
          :aria-current="index === currentSlide"
        >
          <div
            class="w-3 h-3 rounded-full transition-all duration-300"
            :class="index === currentSlide ? 'bg-primary w-8' : 'bg-white/50 hover:bg-white/80'"
          />

          <!-- Progress Bar (UnderActive Dot) -->
          <div
            v-if="index === currentSlide && !isPaused"
            :key="`prog-${currentSlide}`"
            class="absolute -bottom-2 left-0 h-[2px] bg-primary/80 rounded-full progress-bar"
          />
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Props
interface Slide {
  image: string;
  imageAlt: string;
  badge: string;
  title: string | object; // ReactNode in TSX, keeping generic here
  description: string;
  buttonText: string;
  buttonHref: string;
  buttonIcon: string;
}

interface HeroSliderProps {
  slides: Slide[];
}

const props = defineProps<HeroSliderProps>();

// State
const currentSlide = ref(0);
const prevSlide = ref(0);
const isAnimating = ref(false);
const isPaused = ref(false);
const autoPlayTimer = ref<NodeJS.Timeout | null>(null);

const SLIDE_DURATION = 5000;

// Methods
const goToSlide = (index: number) => {
  if (isAnimating.value || index === currentSlide.value) return;

  isAnimating.value = true;
  prevSlide.value = currentSlide.value;
  currentSlide.value = index;

  setTimeout(() => {
    isAnimating.value = false;
  }, 1000);
};

const nextSlide = () => {
  const next = (currentSlide.value + 1) % props.slides.length;
  goToSlide(next);
};

const prevSlideHandler = () => {
  const prev = (currentSlide.value - 1 + props.slides.length) % props.slides.length;
  goToSlide(prev);
};

const manualJump = (index: number) => {
  goToSlide(index);
  isPaused.value = false; // Restart autoplay logic if it was paused implicitly or effectively
  resetTimer();
};

const resetTimer = () => {
  if (autoPlayTimer.value) clearInterval(autoPlayTimer.value);
  startTimer();
}

const startTimer = () => {
  if (props.slides.length <= 1) return;
  
  autoPlayTimer.value = setInterval(() => {
    if (!isPaused.value && !isAnimating.value) {
      nextSlide();
    }
  }, SLIDE_DURATION);
};

// Lifecycle
onMounted(() => {
  startTimer();
  window.addEventListener('keydown', handleKeyDown);
});

onUnmounted(() => {
  if (autoPlayTimer.value) clearInterval(autoPlayTimer.value);
  window.removeEventListener('keydown', handleKeyDown);
});

const handleKeyDown = (e: KeyboardEvent) => {
  if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') return;

  if (e.key === 'ArrowRight') {
    nextSlide();
    resetTimer();
  } else if (e.key === 'ArrowLeft') {
    prevSlideHandler();
    resetTimer();
  } else if (e.key === ' ') {
    e.preventDefault();
    isPaused.value = !isPaused.value;
  }
};
</script>

<style scoped>
.progress-bar {
  width: 100%;
  animation: progress 5000ms linear forwards;
}

@keyframes progress {
  from { width: 0%; }
  to { width: 100%; }
}
</style>
