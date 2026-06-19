<template>
  <svg viewBox="0 0 60 70" fill="none" xmlns="http://www.w3.org/2000/svg" :width="size" :height="size * 70/60">
    <path d="M30 2L56 14V36C56 50 44 62 30 68C16 62 4 50 4 36V14L30 2Z" fill="url(#sg)" stroke="url(#gs)" stroke-width="1"/>
    <rect x="24" y="28" width="4" height="18" fill="url(#bg)" rx="1"/>
    <rect x="30" y="22" width="4" height="24" fill="url(#bg)" rx="1"/>
    <rect x="36" y="32" width="4" height="14" fill="url(#bg)" rx="1"/>
    <path d="M22 34 L38 20" stroke="url(#ag)" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M35 18 L38 20 L36 23" stroke="url(#ag)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <defs>
      <linearGradient id="sg" x1="0" y1="0" x2="60" y2="70"><stop stop-color="#1e3353"/><stop offset="1" stop-color="#0d1b2e"/></linearGradient>
      <linearGradient id="gs" x1="0" y1="0" x2="60" y2="70"><stop stop-color="#e4c06e"/><stop offset="1" stop-color="#8a6e30"/></linearGradient>
      <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#e4c06e"/><stop offset="1" stop-color="#c9a84c"/></linearGradient>
      <linearGradient id="ag" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#c9a84c"/><stop offset="1" stop-color="#e4c06e"/></linearGradient>
    </defs>
  </svg>
</template>
<script setup>
defineProps({ size: { type: Number, default: 44 } })
</script>
