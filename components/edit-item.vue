<script lang = "ts" setup>
import alerg from "../mockData/allergens.json"
import { SubCategory } from '~/interfaces/SubCategory';
import { useRestaurantStore } from '~/store/restaurant'

const restaurantStore = useRestaurantStore()
const restaurant = restaurantStore.restaurantGetter
const defaultSrc = 'https://img.favpng.com/23/21/6/knife-fork-spoon-clip-art-png-favpng-g0zSCK2EGgjPqfDQWPh6qVtmY.jpg'
const props = defineProps({
    addItem: Boolean,
    itemId: Number
})
const name = ref("")
const allergens = alerg
const description = ref("")
const price = ref(0)
const longDescription = ref("")
const category = ref("")
const subCategory = ref("")
const src = ref(defaultSrc)
const disableSubCateg = ref(true)
const categories = restaurant.categorySet
let subCategories: SubCategory[] = [];
const selectedAllergens = ref<string[]>([])  // Refference  to the list of allergens for the current item
if (props.addItem === false) {
    const item = restaurant.itemSet.filter(x => x.id === props.itemId)[0];
    name.value = item.name
    description.value = item.description
    price.value = item.price
    longDescription.value = item.longDescription
    if (item.imageUrl !== null)
        src.value = item.imageUrl
    category.value = item.category.name
    subCategory.value = item.subCategory.name
    disableSubCateg.value = false
    subCategories = item.category.subCategorySet
    if (item.allergen != null && item.allergen.length > 0) {
        selectedAllergens.value = item.allergen.split(",").map(x => allergens.filter(y => y.letter === x)[0].name)
    }
}
watch(category, () => {
    const newCategory = restaurant.categorySet.filter(x => x.name === category.value)[0]
    subCategories = newCategory.subCategorySet
    disableSubCateg.value = false;
    subCategory.value = ""
});
const logSelectedAllergens = () => { console.log(selectedAllergens.value) }


</script>

<template>
    <div class="container">
        <div class="top">
            <h3 v-if="addItem" style="padding-left: 4%;">Add an item</h3>
            <h3 v-else style="padding-left: 4%;">Edit an item</h3>
        </div>
        <div class="line"></div>
        <div class="bottom">
            <div class="left">
                <div class="elementLeft">
                    <div class="box">
                        <div style="height: 40%; width: 100%;">
                            <div class="fieldText">Name</div>
                            <input v-model="name" class="specialInput" style="height: 56.25%;" />
                        </div>
                    </div>
                </div>
                <div class="elementLeft">
                    <div class="box" style="">
                        <div class="fieldText">Description</div>
                        <textarea v-model="description" class="specialTextArea"></textarea>
                    </div>
                </div>
                <div class="elementLeft">
                    <div class="box">
                        <div class="fieldText">Category</div>
                        <search-bar v-model="category" :options="categories.map(x => x.name)" />
                        <el-button class="specialAddButton">Add Category</el-button>
                    </div>
                </div>
                <div class="elementLeft">
                    <div class="box">
                        <div class="fieldText">Subcategory</div>
                        <search-bar
v-model="subCategory" :options="subCategories.map(x => x.name)"
                            :class="{ 'disabled-element': disableSubCateg }" />
                        <el-button class="specialAddButton">Add Subcategory</el-button>
                    </div>
                </div>
                <div class=elementLeft>
                    <div class="box" style="">
                        <el-button class="specialExitButton">Cancel</el-button>
                    </div>
                </div>
            </div>
            <div class="middle">
                <div class="elementLeft" style="padding-top: 4%;">
                    <div class="box">
                        <div class="fieldText">Option</div>
                        <search-bar />
                        <el-button class="specialAddButton">Add Option</el-button>
                    </div>
                </div>
                <div class="elementLeft">
                    <div class="box">
                        <div class="fieldText">Choice</div>
                        <search-bar />
                        <el-button class="specialAddButton">Add Choice</el-button>
                    </div>
                </div>
            </div>
            <div class="right">
                <div class="elementLeft">
                    <div class="box">
                        <div style="height: 40%; width: 100%;">
                            <div class="fieldText">Price</div>
                            <input v-model="price" class="specialInput" style="height: 56.25%;" />
                        </div>
                    </div>
                </div>
                <div class="elementLeft">
                    <div class="box" style="">
                        <div class="fieldText">Long Description</div>
                        <textarea v-model="longDescription" class="specialTextArea"></textarea>
                    </div>
                </div>
                <div class="elementLeft">
                    <div class="box" style="">
                        <div class="fieldText">Photo</div>
                        <div style="width: 92%;height:90%;display: flex;">
                            <el-image :src="src" style="width:35%;height: 100%; border-radius: 40px;" />
                            <div class="photoButtonSpace">
                                <el-button class="specialPhotoButton">Change</el-button>
                                <el-button class="specialPhotoButton">Delete</el-button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="elementLeft">
                    <div class="box" style="justify-content: center;">
                        <div class="fieldText">Alergens</div>
                        <el-select
v-model="selectedAllergens"
                            class="specialSelect" multiple collapse-tags filterable allow-create default-first-option
                            :reserve-keyword="false" placeholder="Please input allergens list"
                            @change="logSelectedAllergens">

                            <el-option
v-for="allergen in allergens" :key="allergen.id" :label="allergen.name"
                                :value="allergen.name" />
                        </el-select>
                    </div>
                </div>
                <div class=elementLeft>
                    <div class="box" style="width: 84% ;align-items: end; padding-left: 0%;">
                        <el-button class="specialExitButton" style="width: 39.325%"> Save </el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans');

* {
    font-family: 'Open Sans';
}

.container {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.top {
    width: 100%;
    height: 11.6%;
    margin: 0;
    display: flex;
    align-items: center;
    font-size: 3vw;
    font-family: "Cairo", Arial, sans-serif;
}

.line {
    height: 0.4%;
    background-color: #727171;
    margin: 0;
}

.bottom {
    width: 100%;
    height: 88%;
    margin: 0;
}

.left {
    width: 33.3%;
    height: 100%;
    margin: 0;
    float: left;
}

.middle {
    width: 33.3%;
    height: 100%;
    margin: 0;
    float: left;
}

.right {
    width: 33.3%;
    height: 100%;
    margin: 0;
    float: left;
}

.elementLeft {
    height: 20%;
    width: 100%;
}

.fieldText {
    width: 100%;
    color: #ED5087;
    font-size: 1.25vw;
}

.box {
    padding-left: 8%;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

}

.specialInput {
    color: black;
    padding-left: 3%;
    padding-right: 3%;
    background-color: #D9D9D9;
    border-radius: 25px;
    font-size: 0.9vw;
    font-weight: normal !important;
    border: none;
    width: 70%;
    height: 22.5%;
}

.specialTextArea {
    color: black;
    font-weight: lighter !important;
    padding: 3%;
    font-size: 0.9vw;
    background-color: #D9D9D9;
    border-radius: 25px;
    border: none;
    resize: none;
    width: 70%;
    height: 50%;
}

.specialAddButton {
    border-radius: 25px;
    font-size: 1vw;
    border-color: #ED5087;
    background-color: white;
    color: #ED5087;
    width: 40%;
    height: 22.5%;
}

.specialPhotoButton {
    border-radius: 25px;
    font-size: 1vw;
    border-color: #ED5087;
    background-color: white;
    color: #ED5087;
    width: 50%;
    height: 30%;
}

.specialExitButton {
    border-radius: 25px;
    font-size: 1.25vw;
    border-color: #ED5087;
    background-color: #ED5087;
    color: white;
    width: 30%;
    height: 40%;
}

.specialExitButton:hover {
    background-color: #D9D9D9;
    border-color: darkgrey;
    color: black;
}

.specialAddButton:hover {
    background-color: #ED5087;
    border-color: darkgrey;
    color: white;
}

.specialPhotoButton:hover {
    background-color: #ED5087;
    border-color: darkgrey;
    color: white;
}

.specialSelect>>>.el-input__wrapper {
    border-radius: 25px;
    background-color: #D9D9D9;
    padding-left: 4%;
    padding-right: 4%;
    width: 100%;
    height: 100%;
}

.specialSelect>>>.el-input__inner {
    color: black;
    font-size: 2vh;
}

.el-select {
    width: 76%;
    height: 22.5%;

}

.specialSelect>>>.select-trigger {
    width: 100%;
    height: 100%;
}

.specialSelect>>>.el-input {
    width: 100%;
    height: 100%;
}

.el-button+.el-button {
    margin-left: 0;
}

.photoButtonSpace {
    width: 60%;
    height: 100%;
    padding-left: 5%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}

.disabled-element {
    opacity: 0.2;
    pointer-events: none;
}

.disabled-element>>>.el-input__suffix-inner {
    opacity: 0.2;
    pointer-events: none;
}</style>