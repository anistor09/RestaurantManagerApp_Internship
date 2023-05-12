<script setup>
import { rest } from "lodash";
import restaurants from "../mockData/restaurants.json"
const restaurant  = ref(restaurants.filter(x => x.id == 1)[0])

function textBoxStyle(width) {
  return {
    'border-radius': `30px`,
    'background-color': 'red',
    'width': `${width}%`
  };
}
    
</script>

<template>
    <h1>
        Restaurant Overview
    </h1>
    <div class="All">
        <div class="imageNameAddress">
            <img :src="restaurant.image_url" alt="" class=circle-image>
            <div class="nameAddress">
                <input
                    class="specialInput"
                    v-model=restaurant.name
                    style="font-size: 23px; width: 40%;"
                    type="input"
                    placeholder="Please input"
                />
                <input
                    class="specialInput"
                    v-model=restaurant.addresse
                    type="input"
                    style="font-size: 18px; text-align: start;"
                    placeholder="Please input"
                />
            </div>
        </div>
        <br><br>
        <div class="otherDetails">
            <div class="prefix">Description:</div>
            <textarea
                class="specialInput"
                v-model=restaurant.description
                autosize
                style="text-align: start; width: 40%; height: auto; overflow: hidden; max-width: 80vw; border-radius: 45px; padding-left: 1%"
                placeholder="Please input"
            />
            <!-- Opening Hours: <br> -->
            <!-- <input type="text" id="restaurantDescriptionEdit" :value="restaurant."> <br> -->
            <div class="details">
                <div class="prefix">Phone Number:</div>
                <input
                    class="specialInput"
                    id="rPhone"
                    v-model=restaurant.phone_number
                    style="width: 9%; text-align: center"
                    type="input"
                    placeholder="Please input"
            />
            </div>
            <div class="details">
                <div class="prefix">Email:</div>
                <input
                    class="specialInput"
                    v-model=restaurant.email
                    style="width: 15%;"
                    type="input"
                    placeholder="Please input"
                />
            </div>
            <div class="details">
            <div class="prefix">Category:</div>
            <input
                class="specialInput"
                v-model=restaurant.category
                style="width: 10%;"
                type="input"
                placeholder="Please input"
            />
            </div>
            <div class="button-container">
                <el-button color="#ED5087" plain round> Save changes</el-button>
            </div>
        </div>
    </div>
</template>


<style scoped>
    @import url('https://fonts.googleapis.com/css?family=Cairo');
    .All{
        font-family: "Cairo";
    }
    h1 {
        position: relative;
    }
    h1::after {
        content: "";
        display: block;
        height: 3px;
        width: 100%;
        background-color: black;
        margin-top: 10px;
      }

    .details {
        display: flex;
        align-items: center;
        padding-top: 1%;
        width: 100%;
    }
    .prefix {
        margin-right: 10px;
        font-size: 20px;
        padding-left: 3px;
    }
      
    .imageNameAddress {
        display: flex;
        align-items: center;
    }

    .nameAddress{
        display: flex;
        flex-direction: column;
        padding: 25px;
    }
    .specialInput{
        color: black;
        padding: 4px;
        background-color: #D9D9D9;
        border-radius: 15px;
        margin: 0.2vh;
        height: 20px;
        font-size: 20px;
        border: none;
        font-family: "Cairo";
        text-align: center;
    }
    .button-container {
        display: flex;
        justify-content: flex-end;
        padding: 5%;
        align-items: center;
        font-family: 'Cairo';
    }
    .circle-image {
        width: 130px; /* set the width to whatever you need */
        height: 130px; /* set the height to whatever you need */
        border-radius: 50%; /* make the image circular */
        box-shadow: 0px 0px 50px rgba(0, 0, 0, 0.8);
    }
</style>

