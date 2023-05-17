<script lang="ts" setup>

import allCategories from '../mockData/categories.json';
import allSubcategories from '../mockData/subcategories.json';

const categories = ref(allCategories.filter(x => x.restaurant_id === 1))

const restaurantSubcategories = ref(allSubcategories.filter((x) => x.restaurant_id === 1));
const filteredSubcategories = ref(restaurantSubcategories.value);



const categoryName = ref("")
const subcategoryName = ref("")
const selectedSubcategory = ref(restaurantSubcategories.value[0])

const selectedCategory = ref(categories.value[0]) // we assume that there is always an category in the database (because we need to use category.Id)
const enableSubcategory = ref(false)


const www = () => {
  console.log(categories.value[0])
}

const changeCategory = () => {
  enableSubcategory.value = true;
  let w = categoryName.value;
  subcategoryName.value = ""
  //selectedSubcategory = new subcategory()
  selectedCategory.value = categories.value.filter(x => x.name === w)[0]
  filteredSubcategories.value = restaurantSubcategories.value.filter(x => x.category_id == selectedCategory.value.id)
}
</script>

<template>
    <!-- <el-select v-model="category" filterable placeholder="Select">
      <el-option
        v-for="item in categories"
        :key="item.id"
        :label="item.name"
        :value="item.name"
      />
      
    </el-select> -->
 
    <button @click="www"> </button>
    
    <div class="div">
      <h1>Category:</h1>

      <el-select v-model="categoryName" placeholder="Select" size="large" @change="changeCategory">
          <el-option v-for="category in categories" :key="category.id" :label="category.name"
              :value="category.name" />
      </el-select>
      <div>
          <el-button round>Add category</el-button>
      </div>

    </div>

    <div v-if="enableSubcategory" class="div">
      <h1>SubCategory:</h1>

      <el-select v-model="subcategoryName" class="m-2" placeholder="Select" size="large">
          <el-option v-for="subcategory in filteredSubcategories" :key="subcategory.id" :label="subcategory.name"
              :value="subcategory.name" />
      </el-select>
      <div>
          <el-button round>Add subcategory</el-button>
      </div>

    </div>

</template>
