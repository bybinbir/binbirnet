<template>
  <component
    :is="tag"
    :href="isExternal ? href : undefined"
    :to="!isExternal ? href : undefined"
    :target="isExternal ? '_blank' : undefined"
    :rel="isExternal ? 'noopener noreferrer' : undefined"
    :type="!href ? type : undefined"
    :disabled="disabled"
    class="group"
    :class="combinedClasses"
    @click="onClick"
  >
    <span v-if="icon && iconPosition === 'left'" class="material-symbols-outlined text-[1.2em]">{{ icon }}</span>
    <slot />
    <span v-if="icon && iconPosition === 'right'" class="material-symbols-outlined text-[1.2em] group-hover:translate-x-1 transition-transform">
      {{ icon }}
    </span>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { NuxtLink } from '#components';
import type { ButtonProps } from '@/types';

// We can define Props interface locally or import, but generic props defined in defineProps are easier.
// Since we have types/index.ts, let's look at ButtonProps structure. 
// Assuming it matches the React one.

const props = withDefaults(defineProps<{
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  className?: string;
  icon?: string;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  external?: boolean;
  onClick?: (e: MouseEvent) => void;
}>(), {
  variant: 'primary',
  size: 'md',
  className: '',
  iconPosition: 'right',
  disabled: false,
  type: 'button',
  external: false
});

const emit = defineEmits(['click']);

const onClick = (e: MouseEvent) => {
  if (props.onClick) props.onClick(e);
  emit('click', e);
};

const variants = {
  primary: "bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/30",
  secondary: "bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-600",
  outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white",
  ghost: "text-slate-700 dark:text-slate-200 hover:bg-orange-50 dark:hover:bg-slate-800",
};

const sizes = {
  sm: "px-4 py-2 text-sm rounded-xl",
  md: "px-6 py-3 text-base rounded-2xl",
  lg: "px-8 py-4 text-lg rounded-2xl",
};

const baseClasses = `
  inline-flex items-center justify-center gap-2 font-bold
  transition-all hover:scale-105 active:scale-95
  disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
`;

const combinedClasses = computed(() => {
  return `${baseClasses} ${variants[props.variant]} ${sizes[props.size]} ${props.className}`;
});

const isExternal = computed(() => props.external || (props.href && props.href.startsWith('http')));
const tag = computed(() => {
  if (props.href) {
    return isExternal.value ? 'a' : NuxtLink;
  }
  return 'button';
});
</script>
