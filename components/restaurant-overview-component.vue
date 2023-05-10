<script setup>
import { rest } from "lodash";
import restaurants from "../mockData/restaurants.json"
const restaurant  = ref(restaurants.filter(x => x.id == 1)[0])
    
</script>

<template>
    <h1>
        Restaurant Overview
    </h1>
    <div>
        <div class="imageNameAddress">
            <img :src="restaurant.image_url" alt="" class=circle-image>
            <div class="nameAddress">
                <el-input
                    id="rName"
                    class="editRestaurantField"
                    v-model=restaurant.name
                    autosize
                    type="textarea"
                    placeholder="Please input"
                />
                <el-input
                    id="rAddress"
                    class="editRestaurantField"
                    v-model=restaurant.addresse
                    autosize
                    type="textarea"
                    placeholder="Please input"
                />
            </div>
        </div>
        <br><br><br>
        <div>
            Description: <br>
            <el-input
                id="rDescription"
                class="editRestaurantField"
                v-model=restaurant.description
                autosize
                type="textarea"
                placeholder="Please input"
            />
            <!-- Opening Hours: <br> -->
            <!-- <input type="text" id="restaurantDescriptionEdit" :value="restaurant."> <br> -->
            Phone Number: <br>
            <el-input
                class="editRestaurantField"
                id="rPhone"
                v-model=restaurant.phone_number
                autosize
                type="textarea"
                placeholder="Please input"
            />
            Email: <br>
            <el-input
                class="editRestaurantField"
                id="rEmail"
                v-model=restaurant.email
                autosize
                type="textarea"
                placeholder="Please input"
            />
            Category: <br>
            <el-input
                class="editRestaurantField"
                id="rCategory"
                v-model=restaurant.category
                autosize
                type="textarea"
                placeholder="Please input"
            />

            <br><br>
            <div class="button-container">
                <el-button color="#ED5087">Save changes</el-button>
            </div>
        </div>
    </div>
</template>

<style scoped>
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
      
    .imageNameAddress {
        display: flex;
        align-items: center;
    }

    .nameAddress{
        padding: 25px;
        text-align: center;
    }
    .nameAddress {
        display: block;
    }
    .editRestaurantField  >>> .el-textarea__inner{
        border-radius: 30px;
        background-color: #dddddd;
    }

    .editRestaurantField >>> #rName.el-textarea__inner{
        max-width: 30%;
    }
    .editRestaurantField >>> #rAddress.el-textarea__inner{
        max-width: 50%;
    }
    .editRestaurantField >>> #rDescription.el-textarea__inner{
        max-width: 30%;
    }
    .editRestaurantField >>> #rPhone.el-textarea__inner{
        max-width: 8%;
    }
    .editRestaurantField >>> #rEmail.el-textarea__inner{
        max-width: 10%;
    }
    .editRestaurantField >>> #rCategory.el-textarea__inner{
        max-width: 5%;
    }
    .button-container {
        display: flex;
        justify-content: flex-end;
        padding: 50px;
    }
    .circle-image {
        width: 90px; /* set the width to whatever you need */
        height: 90px; /* set the height to whatever you need */
        border-radius: 50%; /* make the image circular */
    }
</style>

