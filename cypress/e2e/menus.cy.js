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
      cy.intercept('GET', 'https://dev-api.ewai.fr/restaurant/1', { fixture: 'restaurant.json' }).as('getRestaurant');
      cy.visit('http://localhost:3000/menus');
      cy.wait('@getRestaurant');
    });
  
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
  
    it('Open Add menu pop-up when button is clicked', () => {
      cy.get('.menus-button').contains('Add menu').click();
      cy.get('.el-dialog').should('be.visible');
    });
  
    it('Open Edit Menu pop-up when button is clicked', () => {
      cy.get('.el-select').click();
      cy.get('.el-select-dropdown__item').first().click();
      cy.get('.menus-button').contains('Edit menu').click();
      cy.get('.el-dialog').should('be.visible');
    });
  
    it('Open Add Item in Menu pop-up when "Place item" button is clicked', () => {
      cy.get('.el-select').click();
      cy.get('.el-select-dropdown__item').first().click();
      cy.get('.menus-button').contains('Place item').click();
      cy.get('.el-dialog').should('be.visible');
    });
  
    it('Display the category tab when a menu is selected', () => {
      cy.get('.el-select').click();
      cy.get('.el-select-dropdown__item').first().click();
      cy.get('.menu-tabs').should('be.visible');
    });
  
    afterEach(() => {
      cy.window().then((win) => {
        win.close();
      });
    });
  });
  