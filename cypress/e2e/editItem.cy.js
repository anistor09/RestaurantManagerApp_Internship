/* eslint-disable @typescript-eslint/no-unused-vars */
Cypress.on('window:before:load', (win) => {
    win.ResizeObserver = class {
        observe() { }
        unobserve() { }
        disconnect() { }
    };
});

describe('EditItem e2e tests', () => {
    beforeEach(() => {
        cy.viewport(1500, 900);

        // Login on the test account
		cy.visit('http://localhost:3000/login');
		cy.wait(1000)
		cy.get('[data-testid="login-button"]').click();

		cy.origin('https://auth.ewai.fr', async () => {
			cy.get('#signInFormUsername').type('test@ewai.fr', {force: true});
			cy.get('#signInFormPassword').type('9AFPz3DCT@', {force: true});
			await cy.get('.submitButton-customizable').filter(':visible').click({ force: true});
		})

		cy.wait(1000)
        cy.visit('http://localhost:3000/products')
        cy.wait(1000)
    });

    it('Add Item Page is Accesable', () => {
        cy.get('#addItemButtonProducts').should('be.visible');
        cy.visit('http://localhost:3000/editItemView')
        cy.wait(2000)
        cy.get('#item-name-field').type('TestCypress')
        cy.get('#item-description-field').type('testCypress')

        cy.get('#item-category-select').click()
        cy.get('.el-select-dropdown__item')
		  .filter((index, element) => Cypress.$(element).text().includes('Drinks'))
		  .should('have.length', 1)
		  .click();
        cy.get('#item-subcategory-select').click()
        cy.get('.el-select-dropdown__item')
		  .filter((index, element) => Cypress.$(element).text().includes('Beer'))
		  .should('have.length', 1)
		  .click();
        cy.get('#item-presentation-field').clear().type('2')
        cy.get('#item-price-field').clear().type('3')
        cy.get('#item-long-description-field').type('TestCypress')
        cy.get('#item-allergens-select').click({force: true})
        cy.get('.el-select-dropdown__item')
		  .filter((index, element) => Cypress.$(element).text().includes('Eggs'))
		  .should('have.length', 1)
		  .click();
    });


    afterEach(() => {
        cy.window().then((win) => {
            win.close();
        });
    });
});
