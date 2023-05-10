<script lang="ts" setup>
    const resName = "Restaurant Name"
    const imageSource = "https://dailynewshungary.com/wp-content/webpc-passthru.php?src=https://dailynewshungary.com/wp-content/uploads/2022/06/rsz_2hard_rock_hotel_budapest2.jpg&nocache=1"
    const logoSource = "https://mma.prnewswire.com/media/1713860/SKYBAR_LOGO_PARIS__1.jpg"
    const openHour = "8:00"
    const closeHour = "18:00"
    const phoneNumber = "+310712345678"
    const email = "email@restaurant.com"
    const location = "Market St, San Francisco, CA, USA"
</script>

<template>
    <el-row>
      <el-col
        :span="8"
      >
        <el-card class="card" :body-style="{ padding: '0px' }">
          <img
            :src= "imageSource"
            class="image"
          />
          <div style="height: 10vh">
            <!-- <img :src= "logoSource"/> -->
            <div id="title">{{ resName }}</div>
            <div> {{ location }}</div>
            <div class="bottom">
            <el-button text class="button">Edit</el-button>
            <el-button text class="button">Delete</el-button>
            </div>
            <!-- <div id="info">
                <div> Opening hours: {{openHour}} - {{closeHour}} </div>
                <div> Phone number: {{ phoneNumber }} </div>
                <div> Email: {{ email }} </div>
            </div> -->
          </div>
        </el-card>
      </el-col>
    </el-row>
</template>
  
<style>
  #title {
    margin-top: 1.5vh;
    margin-left: 1vw;
    font-weight: bold;
    font-size: 1.2rem;
  }

  #info {
    float: right;
    position: absolute;
  }

  .card {
    width: 50vw;
    height: 20vh;
    border-radius: 3vw;
    font-family: math;
    box-shadow: 0.2vh 0.1vw 0.7vh 0.2vw rgba(0,0,0,.3) !important;
  }

  .bottom {
    line-height: 12px;
    display: flex;
    justify-content: center;
    margin-top: 1vh;
  }
  
  .button {
    padding: 0;
    min-height: auto;
    font-family: math;
  }
  
  .image {
    width: 100%;
    filter: blur(3px);
    height: 10vh;
    display: block;
  }
</style>
  