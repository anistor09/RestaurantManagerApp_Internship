<script lang = "ts" setup>
    defineProps({
        title: String
    })
</script>



<template>
    <div class="top">
        <h3 style="padding-left: 4%;">{{title}}</h3>
    </div>
    <div class="line"></div>
</template>




<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans');

* {
    font-family: 'Open Sans';
}
.top {
    width: 100%;
    height: 11.6vh;
    margin: 0;
    display: flex;
    align-items: center;
    font-size: 2.3vw;
}

.line {
    height: 0.4vh;
    background-color: #727171;
    margin: 0;
}
</style>