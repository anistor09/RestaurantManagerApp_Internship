<script lang="ts" setup>
  const id: number = parseInt(useRoute().params.id.toString());
</script>

<template>
  <div class="container">
    <div class="right">
      <edit-item :add-item="false" :item-id="id"/>
    </div>
  </div>
</template>

<style scoped>
.right{
  width: 100%;
  height: 100vh;
}
</style>
