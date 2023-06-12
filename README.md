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
*todo*

### **Home Page**
*todo*

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
*todo*
### **Edit Category Page**
The Edit Category Page page allows restaurant managers to manage and customize the categories and subcategories of their restaurant. It provides a user interface for:
- adding, editing, and deleting categories
- adding, editing, and deleting subcategories
- adding, editing, and deleting images for categories and subcategories


To access the Edit Category page, you can click on the "+ Add Category" button available in the sidebar. It's default URL is `http://localhost:3000/editCategoryView`. You can also access the page in the 'Edit mode' when you click on a Category card from the Products page. A possible URL is `http://localhost:3000/editCategoryView/24`

#### **Dependencies**

The Menus page component imports several dependencies and custom components from external libraries or files. These dependencies include:

- `element-plus`: A Vue.js CSS library that provides various UI components used in the Menus page.
- `PageTitle`: A custom component for displaying the page title (used on every page for consistency).
- `NameNeededPopUp`: A custom component for informing the user that he has to add a name before requesting an AI generated dexcription.
- `SubCategory`: Interfaces or types used in the Menus page, constructed in accordance to the database structure.

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

### **Tables Page**
*todo*

### **Settings Page**
*todo*

### **Analyics**
*todo - not implemented*

### **AI Autocompletion**
*todo - not implemented*

### **Languages**
*todo - not implemented*

### **Currency**
*todo - not implemented*

