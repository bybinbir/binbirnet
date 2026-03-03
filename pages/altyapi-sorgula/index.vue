<template>
  <div class="max-w-6xl mx-auto px-4 py-10">
    <InfraWizard :packages="packages ?? []" />
  </div>
</template>

<script setup lang="ts">
const { data: packages } = await usePackages()

useSeoMeta({
  title: "Altyapı Sorgula | BinbirNet",
  description: "Adresinizdeki internet altyapısını hemen sorgulayın, size en uygun paketi öğrenin.",
});
</script>
