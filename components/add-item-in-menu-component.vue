<script lang="ts" setup>

import { filter } from 'lodash';
import restaurants from '../mockData/restaurants.json';


const restaurant = ref(restaurants.filter(x => x.id == 1)[0]);

const categories = ref(restaurant.value.categorySet);
const categoryName = ref("") //this field is the name of the selected category from the el-select
const selectedCategory = ref(categories.value[0]) // we assume that there is always an category in the database (because we need to use category.Id)

const subcategoryName = ref("");
const filteredSubcategories = ref(restaurant.value.subCategorySet);
const selectedSubcategory = ref(filteredSubcategories.value[0]);

const restaurantItems = ref(restaurant.value.itemSet);
const filteredItems = ref(restaurant.value.itemSet);
const itemName = ref("");
const selectedItem = ref(restaurantItems.value[0]);

const enableSubcategory = ref(false)
const enableItems = ref(false)


const www = () => {
  console.log(categories.value[0])
}

const changeCategory = () => {
  enableSubcategory.value = true;
  subcategoryName.value = "";
  enableItems.value = false;
  itemName.value = "";
  selectedCategory.value = categories.value.filter(x => x.name === categoryName.value)[0]
  filteredSubcategories.value = selectedCategory.value.subCategorySet;
}

const changeSubCategory = () => {
  enableItems.value = true;
  itemName.value = "";
  selectedSubcategory.value = filteredSubcategories.value.filter(x => x.name == subcategoryName.value)[0];
  filteredItems.value = restaurantItems.value.filter(x => x.category.id == selectedCategory.value.id
                                                            && x.subCategory?.id == selectedSubcategory.value.id)
}


const changeItem = () => {
  selectedItem.value = filteredItems.value.filter(x => x.name == itemName.value)[0];
}
</script>

<template>
 
    <button @click="www"> </button>
    
    <div class="div">
      <h1>Category:</h1>

      <el-select v-model="categoryName" placeholder="Select" size="large" @change="changeCategory">
          <el-option v-for="category in categories" :key="category.id" :label="category.name"
              :value="category.name" />
      </el-select>

    </div>

    <div v-if="enableSubcategory" class="div">
      <h1>SubCategory:</h1>

      <el-select v-model="subcategoryName" placeholder="Select" size="large" @change="changeSubCategory">
          <el-option v-for="subcategory in filteredSubcategories" :key="subcategory.id" :label="subcategory.name"
              :value="subcategory.name" />
      </el-select>

    </div>
   
    <div v-if="enableItems" class="div">
      <h1>Item:</h1>

      <el-select v-model="itemName" placeholder="Select" size="large" @change="changeItem">
          <el-option v-for="item in filteredItems" :key="item.id" :label="item.name"
              :value="item.name" />
      </el-select>
    </div>

</template>
