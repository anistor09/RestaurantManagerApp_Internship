/* eslint-disable @typescript-eslint/no-unused-vars */
Cypress.on('window:before:load', (win) => {
    win.ResizeObserver = class {
        observe() { }
        unobserve() { }
        disconnect() { }
    };
});

describe('EditSubCategory e2e tests', () => {
    beforeEach(() => {
        cy.viewport(1500, 900);

        // Login on the test account
        cy.visit('http://localhost:3000/login');
        cy.get('[data-testid="login-button"]').click().click();

        cy.origin('https://auth.ewai.fr', async () => {
            cy.get('#signInFormUsername').type('test@ewai.fr', { force: true });
            cy.get('#signInFormPassword').type('9AFPz3DCT@', { force: true });
            await cy.get('.submitButton-customizable').filter(':visible').click({ force: true });
        })

        cy.wait(1000)
        cy.visit('http://localhost:3000/products')
        cy.wait(1000)
    });


    // Basic tests - display instructions, open pop-ups, display category tab

    it('Add a new category', () => {

        // cy.contains('Categories')
        //     .should('be.visible')
        //     .click();

        // cy.visit('http://localhost:3000/editCategoryView')

        // cy.get('#input-category-name').type('Cypress Category Name')

        // cy.get('#input-category-description').type('Cypress Category Description')

        // cy.get('#input-category-order').clear().type('-1')

        // cy.get('[data-testid="add-subcategory"]').click();
        // cy.get('#add_subcategory_popup').should('be.visible');

        // cy.get('[data-testid="subcategory-name-input"').type('Cypress Subcategory Name')

        // cy.get('[data-testid="subcategory-description-input"').type('Cypress Subcategory Description')

        // cy.get('[data-testid="subcategory-presentationorder-input"').clear().type('-1')

        // cy.get('[data-testid="save-subcategory-button"]').click();

        // cy.intercept('POST', '/api/category/add', (req) => {
        //     req.reply({
        //         statusCode: 200,
        //         body: 123,
        //     });
        // }).as('getData');

        // cy.intercept('POST', '/api/subcategory/add', (req) => {
        //     req.reply({
        //         statusCode: 200,
        //         body: 123,
        //     });
        // }).as('getSubcategoryData');

        // cy.get('#saveCategoryButton').click();

        // cy.wait('@getData')
        // cy.wait('@getSubcategoryData')

        // cy.wait(10000)

        // cy.visit('http://localhost:3000/products')

        // cy.contains('Categories')
        //     .should('be.visible')
        //     .click();

       
        // cy.get('#categories')
        //     .contains('#title', 'Cypress Category Name').should('be.visible')

        // cy.visit('http://localhost:3000/editCategoryView/-1')

        // cy.intercept('DELETE', '/api/category/delete', (req) => {

        //     req.reply({
        //         statusCode: 200,
        //     });
        // }).as('deleteData');

        // cy.get('#deleteCategoryButton').click();

        // cy.wait('@deleteData')

        // cy.visit('http://localhost:3000/products')

        // cy.get('#categories')
        //     .contains('#title', 'Cypress Category Name').should('not.be.visible')


    });
       

    afterEach(() => {
        cy.window().then((win) => {
            win.close();
        });
    });
});
