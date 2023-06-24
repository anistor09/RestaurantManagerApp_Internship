# EWAI group - Restaurant Manager App

## Setup and commands

Make sure to install the dependencies using `npm install`.

- To **run the project**, use the command `npm run dev`. By default, the project runs on `http://localhost:3000/`, when not authenticated you are redirected to the login portal.
- To run the **checkstyle**, use the command `npm run lint`.
- To run the **unit tests**, use either:
  - `npm run test` for the basic version: useful for quick checks, shows the coverage and only runs tests once
  - `npm run test:ui` for the UI version: useful for development, the tests are rerun after each update and there are easy to analyse using the UI
- To run the **integration/e2e (Cypress) tests**, use the command `npm run cypress`

You can use `npm run` to see all possible scripts.

## Features

Now, we will provide a comprehensive overview of the various functionalities and capabilities offered by our application. We divided each of the key features in a separate section.

### **1. Authentication and Login Page**

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

The application uses the OAuth2 standard to authenticate users. It boils down to 2 exchanges with the authenticating service: exchange user credentials for code, then exchange code for token. After the user enters his username and password in the login protal, he is redirected to `localhost:3000/callback`, which runs a script that exchanged the code for the token. Now the user is authenticated for one hour, which is the lifespan of the token. For conviniency, the token is stored in a cookie, so closing the application will not lose the token.

In order to prevent users from accessing the application without a token, there is a middleware that, on each request, checks whether the user has the token cookie set in his browser. Here there is possible concern: users can set a cookie with the name token in their browser and bypass this middleware. However, this has minimal impact, because the server from which the restaurant's details are retrieved, uses the token set in the cookie to get the restaurant id. Meaning that if the token is not valid, the user can't access any details of any restaurant.

#### **Page Structure**

The Login Page has a well-structured layout to ensure a seamless user experience. Here is an overview of its structure:

- **Wrapper**: The main container that encompasses the entire page.
- **Background Images**: Two background images (`imgUp` and `imgDown`) are displayed for aesthetic purposes.
- **Logo and Subtitle**: The logo and slogan are wrapped together to ensure proper resizing. The slogan contains multiple colors and utilizes the `capitalLetters` class for styling.
- **Button and Welcome Text**: The login button and welcome text are wrapped together to maintain a consistent layout. The welcome text serves as a friendly greeting to the user.
- **Styling**: Custom styling is applied to various elements to match the desired design. This includes font styles, button appearance, and responsive design for different screen sizes.

_Note: This documentation provides an overview of the Login Page component and its functionality. To fully understand the implementation and integration within the larger application, reviewing the code implementation is recommended._

### **2. Sidebar menu**

The Sidebar Menu component provides a sidebar navigation menu for the application. It allows users to easily navigate between different sections of the application. The component is implemented using Vue.js and utilizes various UI components from the Element Plus library. This component is available by default on all pages, apart from the login page.

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

_Note: This documentation provides an overview of the Sidebar Menu component and its functionality. To understand the complete implementation and integration within the broader application, it is recommended to review the code implementation._

### **3. Home Page**

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

_Note: This documentation provides an overview of the Home page component and its functionality. To understand the complete functionality and usage of the component, it is necessary to review the code implementation and its integration within the broader application._

### **4. Menus Page**

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
- `AddItemInMenuComponent`: A custom component pop-up for adding items to a menu.
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

_Note: This documentation provides an overview of the Menus page component and its functionality. To understand the complete functionality and usage of the component, it is necessary to review the code implementation and its integration within the broader application._

### **5. Products Page**

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

_Note: This documentation provides an overview of the Menus page component and its functionality. To understand the complete functionality and usage of the component, it is necessary to review the code implementation and its integration within the broader application._

### **6. Edit Item Page**

The edit item page allows restaurant managers to manage and customize the items of their restaurant. It provides a user interface for:
* adding, editing, and deleting items
* adding, editing, and deleting options
* adding, editing, and deleting choices

To access the Edit Item page, you can click on the "+Add Item" button available on the Producs page, after choosing the items tab. It's default URL is `http://localhost:3000/editItemView`. You can also access the page in the 'Edit mode' when you click on an Item card from the Products page(`http://localhost:3000/editItemView/[itemId]`).

#### **Dependencies**

The Edit Item page component imports several dependencies and custom components from external libraries or files. These dependencies include:

- `element-plus`: A Vue.js CSS library that provides various UI components used in the Edit Category page.
- `PageTitle`: A custom component for displaying the page title (used on every page for consistency).
- `NameNeededPopUp`: A custom component for informing the user that he has to add a name before requesting an AI generated description.
- `Option-Component`: A custom component used for dysplayin information about the options and the choices that are related to it.
- `SubCategory`: Interface used in the Edit Item page, constructed in accordance to the database structure.
- `Category`: Interface used in the Edit Item page, constructed in accordance to the database structure.
- `Option`: Interface used in the Edit Item page, constructed in accordance to the database structure.
- `Choice`: Interface used in the Edit Item page, constructed in accordance to the database structure.
- `allergens`: Data used for storing all possible allergens

#### **Variables and Methods**

The Edit Item page component defines several reactive variables and data properties using the `ref` functions provided by Vue.js. It also defines some methods for handling events and updating data.

- `addItem`, `itemId`: Component's props for indicating whether a new item is being added or an existing one is being edited, along with the corresponding itemId property.
- `restaurantStore` and `restaurantGetter`: Store and getter for accessing restaurant data from the Pinia Store.
- `categoryStore`, `categoryGetter`, `deleteGetter`: Store and getters for accesing updates made to categories from other tabs.
- `itemStore`, `itemGetter`, `deleteGetter`: Store and getters for pushing updates to items to the products page.
- `name`,`description`, `src`,`presentationOrder`, `price`, `longDescription`, `category`, `subCategory`, `sideItems`, `selectedAllergens`, `options`: Reactive variables for storing the attributes of the new/selected item.
- `item`,`dummyItem`,`realItem`, `dummyCategory`: Variables used for storing item information and for initialization
- `addOptionPopUp`,`delteteOptionPopUp`,`editOptionPopUp`,`ddChoicePopUp`,`deleteItemPopUp`,`nameNeededPopUp`: Reactive variables used for triggering pop-ups
- `optionNameField`,`optionDescriptionField`,`optionMandatory`,`selectedOption`,`selectedOptionName`,`newOptionId`: Reactive variables used for field inputting in the option-related pop-ups
- `choiceName`,`selectedOption`,`newChoiceId`: Reactive variables used for field inputting in the choice-related pop-ups
- `defaultSrc`: Variable used to store a default image for items 
- `acceptedTypes`: Variable used to store all accepted types of files for image upload
- `categories`,`allItems`: Variables that encapsulate all categories or items that the restaurant has
- `disableSubCateg`,`subCategories`: Variables used to manipulate the behavior of the subcategory selector
- `allergen`: Variable used to maintain initial state of allergens of an item
- `fetchHelper`: Function to handle server communication
- `changeCategory`: Method that alters the displayed subcategories whenever the category selected for an item changes
- `handleAddChoiceEmit`,`handleEditOptionEmit`,`handleDeleteOptionEmit`,`handleDeleteChoiceEmit`,`handleEditChoiceEmit`: Methods that handle emits sent from the Option-Component
- `handleAddChoice`,`handleAddOption`,`handleEditOption`,`handleDeleteOption`,`handleAddOption`: Methods that handle local adding, deleting and editing of choices or options
- `handleDeleteItem` - Method that handles the deletion of an item
- `addOption` - Method that handles the opening of the add an option pop-up
- `SubCategoryDeepCopy`, `CategoryDeepCopy`, `ChoiceDeepCopy`, `OptionDeepCopy`: Methods that make deep copies of different data structures used
- `cancelButton`: Method that cancels the action of adding an item
- `saveButton`: Method that either saves or edits an item in the database
- `deleteButton`: Method that triggers the safety delete pop-up
- `openNotification` : Method that displays a notification on the screen when a Category is successfully created, edited, or deleted.
- `addCategory`,`editCategory` : Methods that trigger the opening of the add/edit category page
- `handleStorageEvent`: Methods that scans and reacts to updates to the local storage
- `addAiShortDescription`, `addAiLongDescription`, `addAiDescription`: Methods used for handling the ai generated descriptions
- `handleFileUpload`: Method used for handling the uploads of files to the page 

#### **Page structure**

The Edit Item page has a clearly delimited structure, in order to have a clear separation between the page functionalities.

- The main template consists of a `PageTitle` component for displaying the page title and the Main body.

- **Main body**: In the main body, there are tree columns. The left column includes the items's name, description, category, subcategory, and the cancel/delete button. In the middle is the selector for the side-dishes and a table that contains card for each of the options that are atributed to the item. On the right there are fields for price, presentation number, long description, photo with the change and delete buttons, the allergens and finally the save button. 

- **Option Table**:
- the cards related to options are wrapped in an `el-scrollbar` component. Pressing one of the card will lead it to expand and show all the choices related to that option togheter with buttons that let the used add,edit,delete the choices and the options.

- **Pop-ups**:
- `addOptionPopUp`: - Pop-up that handles adding a options to an item
- `delteteOptionPopUp`: Pop-up that handles deleting a option from an item
- `editOptionPopUp`: Pop-up that handles editing a oprion of an item
- `addChoicePopUp`: Pop-up that handles adding a choice to a option
- `deleteItemPopUp`: Pop-up that handles the deletion of an an item 
- `NameNeededPopUp`: This pop-up prevents sending an AI genearated request without having a name for the desired Category/ Subcategory.

_Note: This documentation provides an overview of the Edit Item page component and its functionality. To understand the complete functionality and usage of the component, it is necessary to review the code implementation and its integration within the broader application._
### **7. Edit Category Page**

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
- `tobeDeletedSubcat`, `toBeEditedSubcat`: Reactive variables for storing the ids of the Subcategories that have to be edited/deleted in the database for the current Category
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

_Note: This documentation provides an overview of the Edit Category page component and its functionality. To understand the complete functionality and usage of the component, it is necessary to review the code implementation and its integration within the broader application._

### **8. Tables Page**

The Tables Page page allows restaurant managers to manage the tables their restaurant. It provides a user interface for adding, editing, and deleting tables, as well as see their QR code.

To access the Tables page, you can click on the "Tables" button available in the sidebar. It's default URL is http://localhost:3000/tables.

#### **Dependencies**

The page imports several dependencies and custom components from external libraries or files. These dependencies include:

- `element-plus`: A Vue.js CSS library that provides various UI components used in the Edit Category page.
- `PageTitle`: A custom component for displaying the page title (used on every page for consistency).
- `TableComponent`: A custom component for displaying the different tables in a nice card view structure.
- `SearchBar`: A custom component used to encapsulate the search bar used in the page to search for tables for faster access.

#### **Variables and Methods**

The page defines several reactive variables and data properties using the `ref` and `computed` functions provided by Vue.js. It also defines some methods and watchers for handling events and updating data.

- `restaurantStore` and `restaurantGetter`: Store and getter for accessing restaurant data from the Pinia Store.
- `tables`: This variable is a reference (ref) to the tableRestaurantSet property of the restaurant object. It contains an array of tables in the restaurant.
- `selectedTable`: This variable is a reference to an empty string (''). It is used to track the currently selected table.
- `addPopup`, `editPopup`, `deletePopup`, `qrcodePopup`: These variables are references (ref) that control the visibility of pop-ups or dialogs. They are initially set to false and can be toggled to true to show the corresponding pop-up.
- `qrcodeUrl`: This variable is a reference to an empty string (''). It holds the URL of a QR code associated with a table.
- `tableId`, `tableNumber`, `tableCapacity`: These variables are references to numeric values (0). They store the ID, number, and capacity of the currently selected table.
- `filteredTables`: This computed property filters the tables based on the selectedTable value. If selectedTable is empty, it returns all the tables; otherwise, it filters the tables to match the selected table number.
- `handleDelete()`: This asynchronous function handles the deletion of a table. It makes a useFetch request to the specified API endpoint to delete the table with the tableId value. After successful deletion, it updates the tables by removing the deleted table from the array, and sets deletePopup to false to hide the delete pop-up.
- `getTable`: This computed property retrieves the table object that matches the tableId value from the tables array.
- `tableUrl`: This computed property retrieves the url property of the selected table using the getTable computed property.
- `handleEdit()`: This asynchronous function handles the editing of a table. It creates a requestBody object with the updated table information and makes a useFetch request to update the table data in the API. After a successful update, it finds the index of the edited table in the tables array and replaces it with the updated table information. Finally, it sets editPopup to false to hide the edit pop-up.
- `handleAdd()`: This function handles the addition of a new table. It creates a requestBody object with the new table information and makes a useFetch request to add the table data in the API. Upon a successful response, it pushes the new table object (including the assigned id, number, capacity, and url) to the tables array. It also sets addPopup to false to hide the add pop-up.
- `watchEffect()`: This function establishes a reactive effect that runs whenever the getTable computed property changes. It updates the tableNumber and tableCapacity variables to match the currently selected table's number and capacity.

#### **Page structure**

The Tables page has a clearly delimited structure, in order to have a clear separation between the page functionalities.

- The main template consists of a `PageTitle` component for displaying the page title and the Main body.

- **Main body**: In the main body, there is a search bar, a button to add new tables and a grid of tables. Th grid's cells are table components, which are used to display the details of a table in a card style.

_Note: This documentation provides an overview of the Tables page and its functionality. To understand the complete functionality and usage of the page, it is necessary to review the code implementation and its integration within the broader application._

### **9. Settings Page**

The Settings page allows restaurant managers to change the details of their restaurant, such as the name, description, working hours, address, phone number or email. This page also allows the managers to change the currency and language of the app.  It provides a user interface for:

- Editing and saving changes to the restaurant details
- Uploading and deleting the restaurant logo and background image
- Adding an AI-generated description for the restaurant
- Changing the currency and language of the application

To access the Settings page, you can click on the "Settings" button available in the sidebar. Its default URL is http://localhost:3000/settings.

#### **Dependencies**

The Settings page imports several dependencies and custom components from external libraries or files. These dependencies include:

- `element-plus`: A Vue.js CSS library that provides various UI components used in the Edit Category page.
- `PageTitle`: A custom component for displaying the page title (used on every page for consistency).
- `NameNeededPopUp`: A custom component for informing the user that he has to add a name before requesting an AI generated description.

#### **Variables and Methods**


The Settings page component defines several reactive variables and data properties using the ref and computed functions provided by Vue.js. It also defines some methods for handling events and updating data.

- `currencyStore`, `restaurantStore`, `languageStore`: Store hooks for accessing currency, restaurant, and language data from the Pinia Store.
- `restaurant`: Getter for accessing the restaurant data.
- `src`, `name`, `addresse`, `description`, `imageUrl`, `phoneNumber`, `email`, `category`: Reactive variables for managing the restaurant details.
- `selectedCurrency`, `selectedLanguage`: Reactive variables for managing the selected currency and language.
- `computedLanguageId`: Computed property for accessing the ID of the selected language.
- `workingDays`: Computed property for accessing the translated names of the weekdays.
- `acceptedTypes`: An array of accepted image types for logo and background image uploads.
- `logoEdited`, `backgroundEdited`: Reactive variables for managing the edited logo and background image files.
- `handleFileUploadLogo`, `deleteImgLogo`, `handleFileUploadBackground`, `deleteImgBackground`: Methods for handling logo and background image uploads and deletions.
- `openErrorNotification`: A method for displaying an error notification.
- `doubleCheck`: A reactive variable for managing the confirmation dialog for saving changes.
- `deepCopyHours`: A method for creating a deep copy of the restaurant's working hours.
- `startTimes`, `endTimes`: Reactive variables for managing the opening and closing times of each day.
- `saveChanges`: A method for saving the changes made to the restaurant details and working hours.
- `addAiRestaurantDescription`: A method for generating an AI-generated description for the restaurant.
- `changeCurrencyGlobally`, `changeLanguageGlobally`: Methods for changing the currency and language settings globally.

#### **Page structure**
The Settings page has a structured layout to present the different settings and functionalities clearly.

- The main template consists of a PageTitle component for displaying the page title.
- `First half`: The first half of the page contains the name, address and description. It includes an option to see, upload or delete the restaurant logo and background image.
- `Second half`: The second half of the page contains the phone number, email, category, working hours, currency and the language. Here all this information can be edited.
- `Save changes`: Button to save all the changed information. If this button is not pressed, when changing the page, all the information will be loss.


### **10. Analytics**

The Analytics are a very powerful tool to analyse the performance of a restaurant. Frontend-wise, the analytics visualization is possible using two components: `analytics-bar-component` and `analytics-graph-component`. These components utilize ApexCharts library to display data processed and collected on the Analytics Backend in the form of bar charts and area graphs respectively. ApexCharts is a powerful and extensible charting library that supports various chart types and customization options.

#### **Dependencies**

Before using the Analytics components, make sure you have the following dependency installed:

- 'vue3-apexcharts': A wrapper for ApexCharts library that integrates it with Vue 3.

#### **`Analytics Bar Component`**

The `analytics-bar-component` is a Vue component that displays analytics data using a bar chart.

Props:

- `title` (String, required): The title of the analytics card.
- `itemNames` (Array of Array of Strings, required): An array containing the names of the items displayed on the chart. Each inner array represents a different set of items that were most popular in a specific timeframe. There are 4 timeframes: last week, last month, six months, last year.
- `itemValues` (Array of Array of Numbers, required): An array containing the values of the items displayed on the chart. Each inner array corresponds to the values of the corresponding items.

The timeframes can be accessed through the four buttons available at the end of the chart in the Home Page.

#### **`Analytics Graph Component`**

The `analytics-graph-component` is a Vue component that displays analytics data using an area graph.

Props:

- `title` (String, required): The title of the analytics card.
- `shortTitle` (String, required): A shorter version of the title used as a label in the graph.
- `graphValues` (Array of Array of Numbers, required): An array containing the values for the graph. Each inner array represents a data point with the first element being the timestamp and the second element being the value.

The timeframes can be accessed through the five buttons available at the end of the chart in the Home Page.

#### **Extensibility**

Both `analytics-bar-component` and `analytics-graph-component` leverage the ApexCharts library, which provides a wide range of options for customizing the charts. You can refer to the [ApexCharts documentation](https://apexcharts.com/docs/) to explore the available configuration options and extend the components further to suit your specific needs.

On the Analytics Backend, each of the current analytics has a corresponding processing algorithm, which are structured into a Strategy Design Pattern again for extensibility purposes.

_Note: The usage examples above assume that you have registered and imported the `AnalyticsBarComponent` and `AnalyticsGraphComponent` components correctly._

### **11. AI Autocompletion**

On every page where we can find a `Description` field, we can also input the decription by pressing on the `Write with AI` button which will make a request to ChatGPT in order to retrieve a AI generated description of a preset length, using the name of the item/category/subcategory/menu/restaurant.

The prompt that we use has the follwoing format `Please give me a description of around ${data.length} characters for a ${data.target} named ${data.itemName}, which is part of a restaurant menu. Please make sure each sentence is coherent and is finished.` where data.length is the desired length of the description, data.target is the type for which we want a description(e.g. item/category/subcategory/menu/restaurant) and data.itemName is the name of the target(e.g. Pizza restaurant, sweets, french fries).

The request is made to `gpt-3.5-turbo` and it uses `"temperature": 1.0` as a parameter for the request in order to have diverse(high randomization) responses for our requests. The price for the requests made to `https://api.openai.com/v1/chat/completions`, is `$0.02 / 1K tokens`, which is supported by our client, who provides us with a private token. If the server experiences an unexpected overload, the user will be provided with a response advising them to retry after a short wait.

- **Pop-ups**:
- `NameNeededPopUp`: This pop-up prevents sending an AI genearated request without having a name for the desired Item/Subcategory/ Category/Menu/Restaurant.

### **12. Languages**

Our app supports multiple languages. Is it possible to choose the desired language from the settings page. 

For implementing the language, we used several steps: 

- `translations.json`: In this file we store language-specific translations for different components or text elements used in the application.
- `languages.json`: In this file we store the languages supported by our app along with their IDs.
- `Language store`: Every page imports useLanguageStore from the ../store/language module, indicating the usage of a language store to manage language-related data and state.
- `Language Id`: The computedLanguageId variable is defined using the computed function from Vue's composition API. It computes the current language ID from the idGetter property of the language store.

To write the text for a specific component we used the structure: `translations[computedLanguageId].desiredText`. This means that the app use the translation of the `desiredText` with the computed ID which represent the ID of the selected language. 

To add a new language, follow the steps:

- add the language and a new ID in `languages.json`
- complete the map from the `store/language.ts` with the new language
- extend `translation.json` by adding another object with all the translation.

### **13. Currency**

Our app supports multiple currencies. Is it possible to choose the desired currency from the settings page. 

For implementing the currency, we used several steps: 

- `currency.json`: In this file we store all the possible currencies that the user can choose from. Currently, our system supports three currencies: `€, £, and $`. However, it is easily extendable to accommodate additional currencies.

- `Currency store`: On every page, the useCurrencyStore is imported from the ../store/currency module, which encapsulates the currently selected store.

In order to display the currency of the product next to the price of it we use the followings attribute `currencyStore.currencyGetter.currency`, which is encapsulated in the `computed` function, `computedCurrency`. In order to change the currency from the already existing ones, users need to navigate to the `Settings page`, select a currency from the drop-down menu, and click on the `Save` button. The updated currency selection will be reflected on all pages where prices are displayed.

To add a new language, follow the steps:
- add the language symbol and a new ID in `currency.json` 


