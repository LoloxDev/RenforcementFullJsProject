describe('Page de Connexion - UserLogin', () => {
  const baseUrl = 'http://localhost:8080';
  const apiUrl = 'http://localhost:3000/users/login';

  beforeEach(() => {
    cy.visit(`${baseUrl}/login`);
  });

  it('Affiche le formulaire de connexion', () => {
    cy.get('input[type="email"]').should('be.visible');
    cy.get('input[type="password"]').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible').and('contain', 'Se connecter');
  });

  it('Tente de se connecter avec des identifiants incorrects', () => {
    cy.intercept('POST', apiUrl, {
      statusCode: 401,
      body: {
        message: 'Identifiants incorrects',
      },
    }).as('loginRequest');

    cy.get('input[type="email"]').type('test@test.com');
    cy.get('input[type="password"]').type('wrongpassword');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginRequest');
    cy.get('.error-message').should('be.visible').and('contain', 'Identifiants incorrects');
  });

  it('Tente de se connecter avec des identifiants corrects', () => {
    cy.intercept('POST', apiUrl, {
      statusCode: 200,
      body: {
        token: 'fake-jwt-token',
        message: 'Connexion réussie',
      },
    }).as('loginRequest');

    cy.get('input[type="email"]').type('test@test.com');
    cy.get('input[type="password"]').type('correctpassword');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginRequest');

    cy.get('@loginRequest').its('response.statusCode').should('eq', 200);
    cy.url().should('eq', `${baseUrl}/`);
  });
});
