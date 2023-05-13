<script setup lang="ts">
    const imageURL = "/_nuxt/assets/images/Logo.png";
</script>

<template>
    <el-container style="min-height: 100vh;">
        <el-aside style="overflow: unset;">
            <el-menu default-active="1" text-color="white" active-text-color="black">
                <el-image :src="imageURL"/>
                <el-menu-item index="1" @click="navigateTo('/')">
                    <span>Home</span>
                </el-menu-item>
                <el-menu-item index="2" @click="navigateTo('/')">
                    <span>Menus</span>
                </el-menu-item>
                <el-menu-item index="3" @click="navigateTo('/')">
                    <span>Products</span>
                </el-menu-item>
                <el-menu-item index="4" @click="navigateTo('/')">
                    <span>Tables</span>
                </el-menu-item>
                <el-menu-item index="5" @click="navigateTo('/')">
                    <span>Help</span>
                </el-menu-item>
                <el-menu-item style="position: relative;top: 15%;left:0%" index="6" @click="navigateTo('/')" >
                    <el-image class="icon" src="https://cdn.onlinewebfonts.com/svg/img_574534.png"/>
                    <span id="setting">Settings</span>
                </el-menu-item>
            </el-menu>
        </el-aside>
        <el-main style="padding: 0;"><slot></slot></el-main>
        
    </el-container>
</template>
  
  
<style>
@import url('https://fonts.googleapis.com/css2?family=Solway&display=swap');
.el-menu-item{
    display: flex;
    left: 17%;
    font-size: xx-large;
    align-items: center;
    top: 10%;
    padding-top: 20%;
    padding-bottom: 20%;
    font-family: 'Solway';
}
.el-menu-item:hover{
    background-color: transparent;
}

.el-menu-item.is-active{
    color: white;
    text-shadow: 3px 2px black;
}
.el-menu{
    padding-top: 10%;
    background: rgb(255,97,121);
    background: linear-gradient(180deg, rgba(255,97,121,1) 0%, rgba(255,58,113,1) 100%);
    min-height: 100vh;
}
.el-image{
    display: grid;
    justify-content: center;
    width: auto;
    height: auto;
}
.icon{
    position: relative;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    background-color: white;
}
#setting{
    color: white;
    font-family: 'Solway';
    font-size: xx-large;
    padding-left: 5%;
}
</style>
  