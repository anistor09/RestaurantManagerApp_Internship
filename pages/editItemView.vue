<script lang="ts" setup>

// Import mock data for restaurant

import rest from "../mockData/restaurants.json"

// Import data for predefined allergens list

import alerg from "../mockData/allergens.json"
import { Option } from '../interfaces/Option';

const insertNewItem = ref(false) // Indicates whether it's a new item or an existing one that is retrieved from the restaurant instance

const allergens = ref(alerg) // Refference to the predefined allergens list defined in the json file
const restaurant = ref(rest[0]) // Refference to the restaurnat instance
const name = ref("") // Refference to name of the item
const description = ref("") // Refference to description of the item

const itemId = ref(85) // Refference to id of the item
const item = ref(restaurant.value.itemSet.filter(x => x.id === itemId.value)[0]) // Refference to item object
const price = ref(0)  // Refference to item price
const longDescription = ref("") // Refference to long description of the item
const options: Ref<Option[]> = ref([])

const showSubcategory = ref(false); // Indicates whether to show the subcategory section, true after the category is selected

const categories = ref(restaurant.value.categorySet) // Refference to categories of the item
const subcategories = ref<{ id: number; name: string; description: string; presentationOrder: number; imageUrl: string; }[]>([]);  // Refference to subcategories of the item

const selectedCategoryName = ref("")  // Refference to selected category for the current item
const selectedCategoryId = ref(-1)   // Refference to id of the selected category for the current item
const selectedSubcategoryName = ref("")  // Refference to selected subcategory for the current item
const selectedSubcategoryId = ref(-1)   // Refference  to id of the selected subcategory for the current item
const selectedAllergens = ref<string[]>([])  // Refference  to the list of allergens for the current item


// Fetching all item attributes from the database if the item is already inserted
if (!insertNewItem.value) {
    price.value = item.value.price
    longDescription.value = item.value.longDescription
    description.value = item.value.description
    name.value = item.value.name
    selectedCategoryName.value = item.value.category.name
    selectedCategoryId.value = item.value.category.id

    if (item.value.subCategory !== null) {
        selectedSubcategoryName.value = item.value.subCategory.name

        selectedSubcategoryId.value = item.value.subCategory.id
    }
    if(item.value.allergen!= null && item.value.allergen.length>0)
    {
        selectedAllergens.value = item.value.allergen.split(",").map(x => allergens.value.filter(y => y.letter === x)[0].name)
    }
    
    if(item.value.optionSet!= null && item.value.optionSet.length>0)
    {
        
      options.value = item.value.optionSet
     
    }     

}

// Logs the price for manual testing
const printPrice = () => { console.log(price.value) } 

// Upadate the available subcategories for the current selected category

const logCategory = () => {
    showSubcategory.value = true
    selectedSubcategoryName.value = ""
    selectedSubcategoryId.value = -1
    const category = categories.value.filter(x => x.name === selectedCategoryName.value)[0]
    if (category != null)

        selectedCategoryId.value = category.id
    console.log(selectedCategoryId.value)

    const subcat = categories.value.filter(x => x.id === selectedCategoryId.value)[0].subCategorySet
    if (subcat.length > 0) {
        subcategories.value = subcat
        showSubcategory.value = true
    }
    else {
        showSubcategory.value = false
    }
}

// Logs the subcategory for manual testing
const logSubCategory = () => {
    const subcat = subcategories.value.filter(x => x.name === selectedSubcategoryName.value)[0]
    if (subcat != null)
        selectedSubcategoryId.value = subcat.id
    console.log(selectedSubcategoryId.value)
}
// Logs the long description for manual testing
const logLongDesription = () => { console.log(longDescription.value) }

// Logs the description for manual testing
const logDesription = () => { console.log(description.value) }

// Logs the name for manual testing
const logName = () => { console.log(name.value) }

// Logs the selected allergens for manual testing
const logSelectedAllergens = () =>{console.log(selectedAllergens.value)}

// Get the appropriate text for the long description based on the newItem/already in database item
const getLongDescriptionText = () => {
    if (insertNewItem.value)
        return "Please input the long description of the product"
    else
        return item.value.longDescription
}

// Get the appropriate text for the  description based on the newItem/already in database item
const getDescriptionText = () => {
    if (insertNewItem.value)
        return "Please input the description of the product"
    else
        return item.value.description
}

// Get the appropriate text for the  description based on the newItem/already in database item
const getNameText = () => {
    if (insertNewItem.value)
        return "Please input the name of the product"
    else
        return item.value.name
}
const getMandatoryText = (value : boolean) =>{
    if(value)
        return "Yes"
    else
        return "No"    
}
const hasOptions = () =>{
    if(options.value.length>0)
        return true
    else
        return false  
}

// const getPrice = () => {
//     if (insertNewItem.value)
//         return 0
//     else
//         return item.value.price
// }

// const logAllergerns = () => { console.log(allergens.value) }

// Uploading a image, by making a request to item/upload endpoint
// const handleUpload = async (file: File) => {
//   const formData = new FormData()
//   formData.append('file', file)

//   const xhr = new XMLHttpRequest()
//   xhr.open('POST', 'https://dev-api.ewai.fr/item/upload/85')
  
//   xhr.send(formData)
// }




</script>

<template>
    <div class="container">
        <div class="column">
            <div class="div">
                <h1 class="h1">Name</h1>
                <el-input v-model="name" class="w-50 m-2" size="large" :placeholder="getNameText()" @change="logName" />
            </div>
            <div class="div">
                <h1 class="h1">Description</h1>
                <el-input
v-model="description" maxlength="30" :placeholder="getDescriptionText()" show-word-limit
                    type="textarea" @change="logDesription" />

            </div>

            <div class="div">
                <h1>Category:</h1>

                <el-select
v-model="selectedCategoryName" class="m-2" placeholder="Select" size="large"
                    @change="logCategory">
                    <el-option
v-for="category in categories" :key="category.id" :label="category.name"
                        :value="category.name" />
                </el-select>
                <div>
                    <el-button round>Add category</el-button>
                </div>

            </div>

            <div v-if="showSubcategory" class="div">
                <h1>SubCategory:</h1>

                <el-select
v-model="selectedSubcategoryName" class="m-2" placeholder="Select" size="large"
                    @change="logSubCategory">
                    <el-option
v-for="subcategory in  subcategories" :key="subcategory.id" :label="subcategory.name"
                        :value="subcategory.name" />
                </el-select>
                <div>
                    <el-button round>Add subcategory</el-button>
                </div>

            </div>
            <div v-if="hasOptions()" class="div">
                <h1>Options:</h1>
                <h3>
                    <span class="span-item">Mandatory</span>
        <span class="vertical-bar"></span> 
  <span class="span-item">Name</span>
  <span class="vertical-bar"></span>
  <span class="span-item">Choices</span>
                </h3>

                <ul  class="infinite-list" style="overflow: auto">
    <li v-for="option in options" :key="option.id" class="infinite-list-item"> 
        <span class="span-item">{{ getMandatoryText(option.mandatory) }}</span>
        <span class="vertical-bar"></span> 
  <span class="span-item">{{ option.name }}</span>
  <span class="vertical-bar"></span>
  <span class="span-item">{{ option.choiceSet.map(x => x.name).join(",") }}</span>
</li>
  </ul>

            </div>

        </div>


        <div class="column">
            <div class="div">
                <h1 class="h1">Price</h1>
                <span class="currency-symbol">€</span>

                <el-input-number
v-model="price" class="mx-4" :min="0" :precision="2" :step="0.05" controls-position="right"
                    @change="printPrice" />

            </div>
            <div class="div">
                <h1 class="h1">Long Description</h1>
                <el-input
v-model="longDescription" maxlength="200" show-word-limit type="textarea"
                    :placeholder="getLongDescriptionText()" @change="logLongDesription" />
            </div>
            <div class="div">
                <h1 class="h1">Photo</h1>
                <!-- <el-upload class="upload-demo" drag :before-upload="handleUpload" multiple> -->
                <el-upload class="upload-demo" drag  multiple>    
                    <div class="el-upload__text">
                        Drop file here or <em>click to upload</em>
                    </div>
                    <template #tip>
                        <div class="el-upload__tip">
                            jpg/png files with a size less than 500kb
                        </div>
                    </template>
                </el-upload>
            </div>
            <div class="div">

                <h1 class="h1">Allergens</h1>
                
                <el-select
v-model="selectedAllergens" multiple filterable allow-create default-first-option
                    :reserve-keyword="false" placeholder="Please input allergens list"  @change="logSelectedAllergens">
                    
                    <el-option
v-for="allergen in allergens" :key="allergen.id" :label="allergen.name"
                        :value="allergen.name" />
                </el-select>

            </div>
            <div>
                <el-button round>Save</el-button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    display: flex;
}

.column {
    flex: 1;
}
.infinite-list {
  height: 300px;
  padding: 0;
  margin: 0;
  list-style: none;
}
.infinite-list .infinite-list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  background: var(--el-color-primary-light-9);
  margin: 10px;
  color: var(--el-color-primary);
}
.infinite-list .infinite-list-item + .list-item {
  margin-top: 10px;
}
.span-item {
  margin-right: 10px; /* Adjust the value as per your desired spacing */
}
.vertical-bar {
  margin-right: 10px; /* Adjust the value as per your desired spacing */
  display: inline-block;
  height: 100%;
  border-right: 1px solid black; /* Adjust the border properties as needed */
}
h3 {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0;
 
  
  color: #333; /* optional: set text color */
   font-size: 18px; /* optional: adjust font size */
}




</style>

