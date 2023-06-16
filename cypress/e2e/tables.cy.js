/* eslint-disable @typescript-eslint/no-unused-vars */
Cypress.on('window:before:load', (win) => {
	win.ResizeObserver = class {
		observe() {}
		unobserve() {}
		disconnect() {}
	};
});
   

describe('Tables e2e tests', () => {
	
	beforeEach(() => {
		cy.viewport(1500, 900);
	  
		// Login on the test account
		cy.visit('http://localhost:3000/login');
		cy.get('[data-testid="login-button"]').click().click();
		
		cy.origin('https://auth.ewai.fr', async () => {
			cy.get('#signInFormUsername').type('test@ewai.fr', {force: true});
			cy.get('#signInFormPassword').type('9AFPz3DCT@', {force: true});
			await cy.get('.submitButton-customizable').filter(':visible').click({ force: true});
		})

		cy.wait(1000)
		cy.visit('http://localhost:3000/tables')
		cy.wait(1000)
	});
	  

	// Basic tests - display instructions, open pop-ups, display category tab

	it('Add a new table, edit it and delete it', () => {
	  // Add a table
    cy.get('#addTableButton').click()
    cy.get('#addtableInput1').clear().type('999')
    cy.get('#addtableInput2').clear().type('999')
    cy.intercept('POST', '/api/table/add', {
      statusCode: 200,
    }).as('add-table')
    cy.get('#addTableButtonConfirm').click()
    cy.wait('@add-table')
    cy.contains('Table 999').should('exist')

    // Edit the table
    cy.get('[data-testid="select"]').click();
	  cy.get('.el-select-dropdown__item').contains("Table 999").click();
    cy.contains('Table 999').should('be.visible')
    cy.contains('Edit').click()
    cy.get('#addtableInput3').clear().type('888')
    cy.get('#addtableInput4').clear().type('888')
    cy.intercept('PUT', '/api/table/update', {
      statusCode: 200,
    }).as('edit-table')
    cy.contains('Save').click()
    cy.get('[data-testid="select"]').click();
	  cy.get('.el-select-dropdown__item').contains("Table 888").click();
    cy.contains('Table 888').should('be.visible')

    // Delete the added table
    cy.get('[data-testid="select"]').click();
	  cy.get('.el-select-dropdown__item').contains("Table 888").click();
    cy.contains('Table 888').should('be.visible')
    cy.contains('Delete').click()
    cy.contains('Yes').click()
    
    cy.get('[data-testid="select"]').click();
		cy.get('.el-select-dropdown__item')
		  .filter((index, element) => Cypress.$(element).text().includes('Table 888'))
		  .should('not.exist');
	});

	afterEach(() => {
		cy.window().then((win) => {
			win.close();
		});
	});
});