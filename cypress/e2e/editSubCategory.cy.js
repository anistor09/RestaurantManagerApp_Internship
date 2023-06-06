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
        cy.visit('http://localhost:3000/editCategoryView')
        cy.wait(1000)
    });


    // Basic tests - display instructions, open pop-ups, display category tab

    it('Add Cayegory Page is Visible', () => {
        cy.get('#add-Category-Info').should('be.visible');

        cy.get('#category-name').should(
            'contain',
            'Name',
        );
        cy.get('#category-description').should(
            'contain',
            'Description',
        );
        cy.get('#category-orderinmenu').should(
            'contain',
            'Order in Menu',
        );
    });

    it('Add subcategory popup shows up', () => {
        cy.get('[data-testid="add-subcategory"]').click();
        cy.get('#add_subcategory_popup').should('be.visible');
    });

    it('Add subcategory popup contains right information/fields', () => {
        cy.get('[data-testid="add-subcategory"]').click();
        cy.get('#add_subcategory_popup').should('be.visible');

        cy.get('[data-testid="subcategory-name-title"').should(
            'contain',
            'Name: ',
        );
        cy.get('[data-testid="subcategory-description-title"').should(
            'contain',
            'Description: ',
        );
        cy.get('[data-testid="subcategory-presentation-order-title"').should(
            'contain',
            'Presentation order: ',
        );
    });

    /// Adding the subcategory and verifying that the details are added, edited  and then deleted correctly
    it('Add/Edit/Delete a new subcategory', () => {
        cy.get('[data-testid="add-subcategory"]').click();
        cy.get('#add_subcategory_popup').should('be.visible');

        cy.get('[data-testid="subcategory-name-input"').type('Cypress Subcategory Name')

        cy.get('[data-testid="subcategory-description-input"').type('Cypress Subcategory Description')

        cy.get('[data-testid="subcategory-presentationorder-input"').clear().type('-1')

        cy.get('[data-testid="save-subcategory-button"]').click();

        cy.get('#subcategory-list').contains('Cypress Subcategory Name')

        cy.get('#subcategory-list')
            .filter((index, element) => Cypress.$(element).text().includes('Cypress Subcategory Name'))
            .should('have.length', 1).get('[data-testid="edit-subcategory"]').click();

        cy.get('[data-testid="subcategory-name-input"').should('have.value', 'Cypress Subcategory Name')

        cy.get('[data-testid="subcategory-description-input"]').should('have.value', 'Cypress Subcategory Description')

        cy.get('[data-testid="subcategory-presentationorder-input"]').should('have.value', '-1')

        cy.get('[data-testid="subcategory-name-input"').type(' Edited')

        cy.get('[data-testid="subcategory-description-input"').type(' Edited')

        cy.get('[data-testid="subcategory-presentationorder-input"').clear().type('-2')

        cy.get('[data-testid="save-subcategory-button"]').click();

        cy.get('#subcategory-list')
            .filter((index, element) => Cypress.$(element).text().includes('Cypress Subcategory Name Edited'))
            .should('have.length', 1).get('[data-testid="edit-subcategory"]').click();

        cy.get('[data-testid="subcategory-name-input"').should('have.value', 'Cypress Subcategory Name Edited')

        cy.get('[data-testid="subcategory-description-input"]').should('have.value', 'Cypress Subcategory Description Edited')

        cy.get('[data-testid="subcategory-presentationorder-input"]').should('have.value', '-2')


        cy.get('#cancelAddEditSubcategory').click();

        cy.get('#subcategory-list')
            .filter((index, element) => Cypress.$(element).text().includes('Cypress Subcategory Name Edited'))
            .should('have.length', 1).get('#deleteSubcategory').click();

        cy.get('#yessafetyPopUpDeleteSubcategory').click();

        cy.get('#subcategory-list')
            .filter((index, element) => Cypress.$(element).text().includes('Cypress Subcategory Name Edited'))
            .should('have.length', 0)

    });

    afterEach(() => {
        cy.window().then((win) => {
            win.close();
        });
    });
});
