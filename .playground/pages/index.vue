<script lang="ts" setup>
const message = useMessage();

const count = ref(1)

const info = () => {
  message.info(`message ${count.value++}`);
}
</script>

<template>
  <div>
    <button @click="info">info</button>
  </div>
</template>

<style scoped>

</style>
