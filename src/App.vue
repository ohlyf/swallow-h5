<script setup lang="ts">
import getImg from "./util/imgUtil";

defineProps<{ msg: string }>();
</script>

<template>
  <img :src="getImg('白夜行.png')" />
  <h1>{{ msg }}</h1>
</template>

<style scoped></style>
