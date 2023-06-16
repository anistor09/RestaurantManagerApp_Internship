# EWAI group - Restaurant Manager App


## Setup and commands

Make sure to install the dependencies using `npm install`.
- To **run the project**, use the command `npm run dev`. By default, the project runs on `http://localhost:3000/`, when not authenticated you are redirected to the login portal.
- To run the **checkstyle**, use the command `npm run lint`.
- To run the **unit tests**, use either:
    -  `npm run test` for the basic version: useful for quick checks, shows the coverage and only runs tests once
    - `npm run test:ui` for the UI version: useful for development, the tests are rerun after each update and there are easy to analyse using the UI
- To run the **integration/e2e (Cypress) tests**, use the command `npm run cypress`

You can use `npm run` to see all possible scripts.

To also have access to the analytics, the backend needs to be started with Gradle Boot Run.

## Features
Now, we will provide a comprehensive overview of the various functionalities and capabilities offered by our application. We divided each of the key features in a separate section.

### **Authentication and Login Page**
The Login Page component enables users to authenticate themselves and gain access to the application's features. It offers a user-friendly interface with a logo, slogan, welcome message, and a login button. The page utilizes various design elements and styling to create an appealing visual experience. 

It's default URL is `http://localhost:3000/login`.


#### **Dependencies**

The Login Page component relies on the following dependencies and resources:

- `element-plus`: A Vue.js CSS library that provides various UI components used in the Menus page.
- Images: Background images, logo, and other visual elements are used to enhance the page's aesthetics. They are directly imported from the project files to be accessible at all times.

#### **Variables and Methods**

The Login Page component defines the following variables and methods:

- `config`: A runtime configuration object used to retrieve authorization endpoint details.
- `signIn()`: A method triggered when the login button is clicked. It handles the authentication process by redirecting the user to the authorization endpoint.

#### **Authentication details**
*todo*

#### **Page Structure**

The Login Page has a well-structured layout to ensure a seamless user experience. Here is an overview of its structure:

- **Wrapper**: The main container that encompasses the entire page.
- **Background Images**: Two background images (`imgUp` and `imgDown`) are displayed for aesthetic purposes.
- **Logo and Subtitle**: The logo and slogan are wrapped together to ensure proper resizing. The slogan contains multiple colors and utilizes the `capitalLetters` class for styling.
- **Button and Welcome Text**: The login button and welcome text are wrapped together to maintain a consistent layout. The welcome text serves as a friendly greeting to the user.
- **Styling**: Custom styling is applied to various elements to match the desired design. This includes font styles, button appearance, and responsive design for different screen sizes.

*Note: This documentation provides an overview of the Login Page component and its functionality. To fully understand the implementation and integration within the larger application, reviewing the code implementation is recommended.*

### **Sidebar menu**
The Sidebar Menu component provides a sidebar navigation menu for the application. It allows users to easily navigate between different sections of the application. The component is implemented using Vue.js and utilizes various UI components from the Element Plus library.

#### **Dependencies**

The Sidebar Menu component relies on the following dependencies:

- `vue`: The core Vue.js library.
- `vue-router`: A Vue.js routing library used for handling navigation within the application.
- `element-plus`: A Vue.js CSS library that provides UI components used in the Sidebar Menu.

#### **Variables and Methods**

The Sidebar Menu component defines several variables and methods to handle navigation and manage the active menu item. These include:

- `useRoute`: A function from `vue-router` used to access the current route information.
- `imageURL`: A string representing the URL of the EWAI logo image.
- `restaurant`: A variable to store the restaurant data retrieved from the store.
- `route`: A variable to store the current route information.
- `path`: A computed property that returns the path of the current route.
- `active`: A computed property that determines the active menu item based on the current route.

#### **Page structure**

The Sidebar Menu component has the following structure:

- The main template is divided into an `el-aside` element for the sidebar and an `el-main` element for the main content area.
- **Sidebar**: The sidebar contains an `el-menu` component that displays the navigation menu items. It includes a logo image and menu items for each section of the application (Home, Menus, Products, Tables, and Settings).
- **Navigation**: Each menu item is an `el-menu-item` component with an associated index. The `active` property is used to determine the active menu item based on the current route.
- **Logo**: The logo image is displayed within the sidebar using the `img` tag and the `logo` class.
- **Styling**: The component has scoped CSS styles to customize the appearance of the sidebar menu. The styles include font settings, item layout, background colors, and logo styling.

*Note: This documentation provides an overview of the Sidebar Menu component and its functionality. To understand the complete implementation and integration within the broader application, it is recommended to review the code implementation.*

### **Home Page**
The Home page is the main landing page of the application, providing an overview of restaurant information and some analytics. It includes various components and functionalities to display data and provide a rich user experience.

#### **Dependencies**
The Home page component imports several custom components and interfaces from external files. These dependencies include:

- `PageTitle`: A custom component for displaying the page title (used on every page for consistency).
- `AnalyticsBarComponent`: A custom component for displaying a bar chart of the most sold items.
- `AnalyticsGraphComponent`: A custom component for displaying a line graph of total generated revenue and average basket.
- `RestaurantComponent`: A custom component for displaying restaurant information.
- `MostSoldItems`: An interface representing the most sold items data structure.
- `TimePrice`: An interface representing the time and price data structure.

#### **Variables and Methods**
The Home page component defines several reactive variables and data properties using the `ref` function provided by Vue.js. It also defines asynchronous methods for fetching and loading data from the server.

- `barTitle`, `graphTitle`, `graphShortTitle`, `graphTitle2`, `graphShortTitle2`: Strings used for displaying titles in the analytics components.
- `itemNames`, `itemValues`, `graphValues`, `graphValues2`: Reactive variables for storing and managing the analytics graph and bar data.
- `isLoading`, `isLoading1`, `isLoading2`: Reactive variables for storing and managing loading states.
- `loadAveragePerPerson()`, `loadTotalRevenue()`, `loadMostSoldItems()`: Asynchronous methods for fetching and loading the average per person, total revenue, and most sold items data from the server.
- `svg`: A string containing an SVG element used as a loading spinner.

#### **Page Structure**
The Home page has a structured layout that includes various components and sections to display restaurant analytics and information.

- The main template consists of a `PageTitle` component for displaying the page title and a `<div>` element for layout purposes.
- **Restaurant Component**: The `RestaurantComponent` displays information about the restaurant, such as its name, logo, and other details.
- **Analytics Components**: The Home page includes three carousel items, each containing an `AnalyticsBarComponent` or `AnalyticsGraphComponent` to display different types of analytics data. The carousel, as well as the analytic compnents, are build in a very extensible manner and can be enriched with other analytics in the future.
  - `AnalyticsGraphComponent` displays a line graph of total generated revenue over time.
  - `AnalyticsBarComponent` displays a bar chart of the most sold items.
  - `AnalyticsGraphComponent` displays a line graph of the average basket price over time.

More details related to how the analytics work and their dependencies can be found in the dedicated "Analytics" feature section.

*Note: This documentation provides an overview of the Home page component and its functionality. To understand the complete functionality and usage of the component, it is necessary to review the code implementation and its integration within the broader application.*

### **Menus Page**
The Menus page allows restaurant managers to manage and customize the menus of their restaurant. It provides a user interface for:
- selecting and visualizing menus, along with their categories, subcategories and items
- adding, editing, and deleting menus
- adding items to menus and removing them from the menu

To access the Menus page, you can click on the "Menus" button available in the sidebar. It's default URL is `http://localhost:3000/menus`.

#### **Dependencies**

The Menus page component imports several dependencies and custom components from external libraries or files. These dependencies include:

- `element-plus`: A Vue.js CSS library that provides various UI components used in the Menus page.
- `SubcategoryComponent`: A custom component for displaying and managing the items within a subcategory.
- `EditMenuComponent`: A custom component pop=up for editing menu details.
- `AddItemInMenuComponent`: A custom component  pop-up for adding items to a menu.
- `AddMenuComponent`: A custom component for creating a new menu.
- `PageTitle`: A custom component for displaying the page title (used on every page for consistency).
- `Carte`, `Category`, `Item`, `ItemWrapper`, and `SubCategory`: Interfaces or types used in the Menus page, constructed in accordance to the database structure.

#### **Variables and Methods**

The Menus page component defines several reactive variables and data properties using the `ref` and `computed` functions provided by Vue.js. It also defines some methods and watchers for handling events and updating data.

- `restaurantStore` and `restaurant`: Store and getter for accessing restaurant data from the Pinia Store.
- `currentCategory`, `selectedMenuName`: Reactive variables for managing the state of the menu and category selection.
- `selectedMenu`, `selectedCategories`, `selectedSubcategories`: Computed properties for accessing the selected menu, categories, and subcategories.
- `addItemInMenu`, `addMenu`, `editMenu`, `editPopupKey`: Reactive variables for managing the state of the add item, add menu, and edit menu dialogs.
- `instructions`, `steps`: Strings used for displaying instructions and steps on the Menus page.
- `forceCollapse`: String used to force displaying items that have no subcategory, without collapsing them in the "fake" subcategory component.
- `createItemWrapper`: A method that creates an item wrapper object from an item, used for creating independent entries in a subcategory component.
- `watch(selectedMenuName)`: A watcher that triggers when the selected menu name changes and updates the current category.

#### **Page structure**

The Menus page has a clearly delimited structure, in order to have a clear separation between the page functionalities.

- The main template consists of a `PageTitle` component for displaying the page title and a `el-scrollbar` component that wraps the content of the Menus page.
- **Header**: the content contains an `el-header` section with menu selection, create new menu button, edit menu button and add item in menu button.
- **Main body**: the `el-main` section displays the selected menu's categories and subcategories using `el-tabs` and `el-tab-pane` components. The `tabs` represent each category of the menu, clicking on them will display the corresponding subcategories.
- **Subcategories**: the subcategory component is esentially a very customized `el-collapse` component, which contains all items in the selected menu corresponding to that subcategory. All items have a `"Remove from menu"` button for easy management. The subcategory component is searchable.
- **Pop-ups**: the adding, editing an placing an item in a menu are all done via suggestive pop-ups, accessible by pressing their corresponding button.

*Note: This documentation provides an overview of the Menus page component and its functionality. To understand the complete functionality and usage of the component, it is necessary to review the code implementation and its integration within the broader application.*

### **Products Page**
The Products page allows restaurant managers to manage and customize the items and categories of their restaurant. It provides a user interface for:
- selecting and visualizing items, along with their name, image, description, category, Subcategory and price
- selecting and visualizing categories, along with their name, image, description

To access the Products page, you can click on the "Products" button available in the sidebar. It's default URL is `http://localhost:3000/products`.

#### **Dependencies**

The Producs page component imports several dependencies and custom components from external libraries or files. These dependencies include:

- `element-plus`: A Vue.js CSS library that provides various UI components used in the Menus page.
- `CategoryComponent`: A custom component for displaying a category.
- `ItemComponent`: A custom component for displaying an item,=.
- `PageTitle`: A custom component for displaying the page title (used on every page for consistency).

#### **Variables and Methods**

The Products page component defines several reactive variables and data properties using the `ref` and `computed` functions provided by Vue.js. It also defines some methods and watchers for handling events and updating data.

- `restaurantStore` and `restaurantGetter`: Store and getter for accessing restaurant data from the Pinia Store.
- `categoryStore` and `categoryGetter`: Store and getter for accessing categories data from the Pinia Store.
- `itemStore` and `itemGetter`: Store and getter for accessing items data from the Pinia Store.
- `currentProduct`: Reactive variables for managing the state of the items/categories selection.
- `selectedProducts`: Reactive variables for displaying each possible tab(Items and Categories).
- `searchCategories`, `searchItems``: Reactive variables for searching items/categories by typing their name.
- `addCategory`: A method that opens a new window where you can fill in the details of the new category.
- `addItem`: A method that opens a new window where you can fill in the details of the new item.
- `handleStorageEvent`: A method which handles the update of the persistent storage for items and categories.

#### **Page structure**

The Products page has a clearly delimited structure, in order to have a clear separation between the page functionalities.

- The main template consists of a `PageTitle` component for displaying the page title and a `el-scrollbar` component that wraps the content of the Producs page.
- **Main body**: 
- The body encapsualtes two `tabs`, which represent the items and categories sections. Clicking on them will display the corresponding section.
- When the `Items` tab is clicked (also the default tab), all items stored in the database will be shown as `ItemComponent` cards, which can be clicked for performing edit operations on the item. Adding a new item can be achieve by pressing on the `+Add item` button, which redirects the user to the Edit Item Page(`http://localhost:3000/editItemView`)
- When the `Categories` tab is clicked, all items stored in the database will be shown as `CategoryComponent` cards, which can be clicked for performing edit operations on the category. Adding a new category can be achieve by pressing on the `+Add category` button, which will redirect the user to the Edit Category Page(`http://localhost:3000/editCategoryView`). 


*Note: This documentation provides an overview of the Menus page component and its functionality. To understand the complete functionality and usage of the component, it is necessary to review the code implementation and its integration within the broader application.*


### **Edit Category Page**
The Edit Category Page page allows restaurant managers to manage and customize the Categories and Subcategories of their restaurant. It provides a user interface for:
- adding, editing, and deleting categories
- adding, editing, and deleting Subcategories
- adding, editing, and deleting images for categories and Subcategories


To access the Edit Category page, you can click on the "+Add Category" button available on the Producs page, after choosing the categories tab. It's default URL is `http://localhost:3000/editCategoryView`. You can also access the page in the 'Edit mode' when you click on a Category card from the Products page(`http://localhost:3000/editCategoryView/[categoryId]`).

#### **Dependencies**

The Edit Category page component imports several dependencies and custom components from external libraries or files. These dependencies include:

- `element-plus`: A Vue.js CSS library that provides various UI components used in the Edit Category page.
- `PageTitle`: A custom component for displaying the page title (used on every page for consistency).
- `NameNeededPopUp`: A custom component for informing the user that he has to add a name before requesting an AI generated description.
- `SubCategory`: Interfaces used in the Edit Category page, constructed in accordance to the database structure.

#### **Variables and Methods**

The Edit Category page component defines several reactive variables and data properties using the `ref` and `computed` functions provided by Vue.js. It also defines some methods and watchers for handling events and updating data.
- `addCategory`, `categoryId`: Component's props for indicating whether a new category is being added or an existing one is being edited, along with the corresponding categoryId property.
- `restaurantStore` and `restaurantGetter`: Store and getter for accessing restaurant data from the Pinia Store.
- `name`,`description`, `src`,`presentationOrder`, `subCategories`: Reactive variables for storing the attributes of the new/selected Category.
- `newSubcategoryName`,`newSubcategoryDescription`, `newSubcategorySrc`,`presentationSubcategoryOrder`: Reactive variables for storing the attributes of the new/selected Subcategory
- `tobeDeletedSubcat`, `toBeEditedSubcat`:  Reactive variables for storing the ids of the Subcategories that have to be edited/deleted in the database for the current Category
- `nameNeededPopUp`, `deleteCategoryPopup`, `deleteSubcategoryPopup`: Reactive variables for managing the visibility of the pop-ups
- `filteredSubcategories`, `hasSubcategoriesComputed`: Computed properties for ordering the Subcategories and managing their visibility.
- `saveNewSubcategoryLocally`, `editSubcategoryLocally`, `deleteSubcategoryLocally`: Methods that modify the Subcategories locally, without triggering request to the database.
- `handleAddEditCategory`, `handleDeleteCategory`, `handleAddEditSubcategory`, `handleDeleteSubcategory`: Methods that are responsible for persisting changes to Categories and Subcategories in the database.
- `addAiCategoryDescription`, `addAiSubcategoryDescription` : Methods that retrieve an AI genearated description by making a request to ChatGPT for both Subcategories and Categories.
- `openNotification` : Method that displays a notification on the screen when a Category is successfully created, edited, or deleted.

#### **Page structure**

The Edit Category page has a clearly delimited structure, in order to have a clear separation between the page functionalities.

- The main template consists of a `PageTitle` component for displaying the page title and the Main body.

- **Main body**: In the main body, there are two columns. The left column includes the Category's name, description,`Write with AI` button, image (wrapped in an el-image component), and presentation order, while the right column contains the scrollbar for Subcategories and the `add-subcategory-button`, wrapped in an `el-button` component and the `Save` which redirects the user to the Products Page(`http://localhost:3000/products`).

- **Subcategories**: 
- the content of the subcategorie are wrapped in an `el-scrollbar` component. The name and image of each Subcategory are displayed, with the image wrapped in an `el-image` component.

- **Pop-ups**:
- `addSubcategoryPopUp`: This pop-up handles the add/edit operations of a Subcategory, encapsulating the Subcategory's name, description, `Write with AI` button, image(wrapped in el-image component), and presentation order.
- `safetyPopUpDeleteSubcategory`,`deleteCategoryPopup`: The safety pop-ups prevent the accidental deletion of a Category or Subcategory.
- `NameNeededPopUp`: This pop-up prevents sending an AI genearated request without having a name for the desired Category/ Subcategory.

*Note: This documentation provides an overview of the Edit Category page component and its functionality. To understand the complete functionality and usage of the component, it is necessary to review the code implementation and its integration within the broader application.*

### **Tables Page**
*todo*

### **Settings Page**
*todo*

### **Analyics**
*todo - not implemented*

### **AI Autocompletion**
On every page where we can find a `Description` field, we can also input the decription by pressing on the `Write with AI` button which will make a request to ChatGPT in order to retrieve a AI generated description of a preset length, using the name of the item/category/subcategory/menu/restaurant.

- **Pop-ups**:
- `NameNeededPopUp`: This pop-up prevents sending an AI genearated request without having a name for the desired Item/Subcategory/ Category/Menu/Restaurant.


### **Languages**
*todo - not implemented*

### **Currency**
*todo - not implemented*

