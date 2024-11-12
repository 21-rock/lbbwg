<script setup lang="ts">
import { getImageUrl } from '@/assets'

const logoImg = getImageUrl('logo.png')
</script>
<template>
  <img :src="logoImg" alt="home" v-bind="$attrs" />
</template>
