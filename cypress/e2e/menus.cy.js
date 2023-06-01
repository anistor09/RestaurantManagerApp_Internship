/* eslint-disable @typescript-eslint/no-unused-vars */
Cypress.on('window:before:load', (win) => {
	win.ResizeObserver = class {
		observe() {}
		unobserve() {}
		disconnect() {}
	};
});

describe('Menus e2e tests', () => {
	beforeEach(() => {
		cy.viewport(1500, 900);
		cy.intercept('GET', 'https://dev-api.ewai.fr/restaurant/1', { fixture: 'restaurant.json' }).as(
			'getRestaurant',
		);
		cy.visit('http://localhost:3000/menus');
		cy.wait('@getRestaurant');
	});

	// Basic tests - display instructions, open pop-ups, display category tab

	it('Display instructions when no menu is selected', () => {
	  cy.get('#menus-description-wrapper').should('be.visible');
	  cy.get('#menus-instructions').should(
	    'contain',
	    'Manage and customize your menus easily with these steps:',
	  );
	  cy.get('#menus-steps').should(
	    'contain',
	    'Step 1: Select your menu \nStep 2: Choose the category \nStep 3: Choose the subcategory \nStep 4: Happy editing!',
	  );
	});

	it('Select a menu', () => {
	  cy.get('[data-testid="select-menu"]').click();
	  cy.get('.el-select-dropdown__item').first().click();
	});

	it('Open Create new menu pop-up when button is clicked', () => {
	  cy.get('.menus-button').contains('Create new menu').click();
	  cy.get('.el-dialog').should('be.visible');
	});

	it('Open Edit Menu pop-up when button is clicked', () => {
	  cy.get('.el-select').click();
	  cy.get('.el-select-dropdown__item').first().click();
	  cy.get('.menus-button').contains('Edit menu').click();
	  cy.get('.el-dialog').should('be.visible');
	});

	it('Open Add Item in Menu pop-up when button is clicked', () => {
	  cy.get('.el-select').click();
	  cy.get('.el-select-dropdown__item').first().click();
	  cy.get('.menus-button').contains('Add item to menu').click();
	  cy.get('.el-dialog').should('be.visible');
	});

	it('Display the category tab when a menu is selected', () => {
	  cy.get('.el-select').click();
	  cy.get('.el-select-dropdown__item').first().click();
	  cy.get('.menu-tabs').should('be.visible');
	});

	// Real Flow tests TODO: add test for placing an item and then deleting it

	it('Add a menu and then delete it', () => {
		// Open the Create new menu pop-up
		cy.get('.menus-button').contains('Create new menu').click();
		cy.get('.el-dialog').should('be.visible');
	  
		// Enter menu details and save
		cy.get('[data-testid="add-name-to-menu"]').type('Cypress Test');
		cy.get('[data-testid="add-button"]').click();
		cy.intercept('POST', '/api/menus/addMenu', {
      	  statusCode: 200,
    	}).as('add-menu')
		cy.get('[data-testid="confirm-add"]').click();
		cy.wait('@add-menu')
	  
		// Assert that only one menu is added
		cy.get('[data-testid="select-menu"]').click();
		cy.get('.el-select-dropdown__item')
		  .filter((index, element) => Cypress.$(element).text().includes('Cypress Test'))
		  .should('have.length', 1)
		  .click();
		
		// Enter the Edit Menu pop-up and perform delete
		cy.get('.menus-button').contains('Edit menu').click();
		cy.get('.el-dialog').should('be.visible');
		cy.get('[data-testid="delete-button"]').click();
		cy.intercept('DELETE', '/api/menus/-1', {
      	  statusCode: 200,
    	}).as('delete-menu')
		cy.get('[data-testid="confirm-delete"]').click();
		cy.wait('@delete-menu')
	  
		// Check that the menu was actually deleted
		cy.get('[data-testid="select-menu"]').click();
		cy.get('.el-select-dropdown__item')
		  .filter((index, element) => Cypress.$(element).text().includes('Cypress Test'))
		  .should('not.exist');
	  });

	  it('Find a subcategory in ALL DAY MENU and click it', () => {
		// Find the menu in the dropdown and click on it
		cy.get('[data-testid="select-menu"]').click();
		cy.get('.el-select-dropdown__item')
		  .filter((index, element) => Cypress.$(element).text().includes('ALL DAY MENU'))
		  .should('have.length', 1)
		  .click();

		// Find the category in the menu and click on it
		cy.get('.el-tabs__item')
		  .filter((index, element) => Cypress.$(element).text().includes('Drink'))
		  .should('have.length', 1)
		  .click();

		// Find the subcategory in the category and click on it
		cy.get('[data-testid="subcategory-component"]')
		  .filter(':visible')
		  .filter((index, element) => Cypress.$(element).text().includes('Soft drinks'))
		  .should('have.length', 1)
		  .click();
	  });
	  

	afterEach(() => {
		cy.window().then((win) => {
			win.close();
		});
	});
});
