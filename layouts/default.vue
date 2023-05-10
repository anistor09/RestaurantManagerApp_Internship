<template>
    <el-container>
        <el-aside>
            <el-menu default-active="2" background-color="pink" style="height: 100vh;">
                <el-menu-item index="1">
                    <NuxtLink to="/">Home</NuxtLink>
                </el-menu-item>
                <el-menu-item index="2">
                    <NuxtLink to="/helloWorld">Hello</NuxtLink>
                </el-menu-item>
                <el-menu-item index="3">
                    <NuxtLink to="/">Page 3</NuxtLink>
                </el-menu-item>
                <el-menu-item index="4">
                    <NuxtLink to="/">Page 4</NuxtLink>
                </el-menu-item>
            </el-menu>
        </el-aside>
        <slot></slot>
    </el-container>
</template>
  
  
<style>
.router-link-exact-active {
    font-weight: bold;
}
</style>
  