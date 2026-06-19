<template>
  <img src="/pdfs/optivaro.png" :width="size" :style="{ height: 'auto' }" alt="Optivaro Logo" />
</template>

<script setup>
defineProps({ size: { type: Number, default: 44 } })
</script>