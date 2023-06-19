/* eslint-disable @typescript-eslint/no-unused-vars */
Cypress.on('window:before:load', (win) => {
	win.ResizeObserver = class {
		observe() {}
		unobserve() {}
		disconnect() {}
	};
});
   

describe('Settings e2e tests', () => {
	
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
		cy.visit('http://localhost:3000/settings')
		cy.wait(1000)
	});
	  

    it('Edit the restaurant details and check if the changes are made, after that make the restaurant again', () => {
      cy.get('#nameId').clear().type('NumeTest')
      cy.get('#save-button').click();
      cy.wait(1000);
      cy.get('#confirmButton').should('exist')
      cy.get('#confirmButton').click()
      cy.reload();
      cy.wait(3000);
      cy.get('#nameId').should('have.value', 'NumeTest')
      cy.get('#nameId').clear().type('The commons')
      cy.get('#save-button').click();
      cy.wait(1000);
      cy.get('#confirmButton').should('exist')
      cy.get('#confirmButton').click()
      cy.wait(3000);
      cy.reload();
      cy.get('#nameId').should('have.value', 'The commons')
    });
  

	afterEach(() => {
		cy.window().then((win) => {
			win.close();
		});
	});
});