describe('Page d\'inscription - UserSignup', () => {
  const baseUrl = 'http://localhost:8080';
  const signupApiUrl = 'http://localhost:3000/users/signup';

  beforeEach(() => {

    cy.visit(`${baseUrl}/signup`);
  });

  it('Affiche le formulaire d\'inscription', () => {

    cy.get('input[type="email"]').should('be.visible');
    cy.get('input[type="password"]').should('be.visible');
    cy.get('select').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible').and('contain', 'S\'inscrire');
  });

  it('Tente une inscription avec des informations incorrectes', () => {
    cy.intercept('POST', signupApiUrl, {
      statusCode: 400,
      body: {
        message: 'Informations invalides',
      },
    }).as('signupRequest');

    cy.get('input[type="email"]').type('invalid-email@test.net');
    cy.get('input[type="password"]').type('short');
    cy.get('select').select('guest');
    cy.get('button[type="submit"]').click();

    cy.wait('@signupRequest');
    cy.get('.error-message').should('be.visible').and('contain', 'Inscription KO');
  });

  it('Tente une inscription avec des informations correctes', () => {
    cy.intercept('POST', signupApiUrl, {
      statusCode: 201,
      body: {
        message: 'Inscription réussie',
      },
    }).as('signupRequest');

    cy.get('input[type="email"]').type('test@test.com');
    cy.get('input[type="password"]').type('validpassword');
    cy.get('select').select('admin');
    cy.get('button[type="submit"]').click();


    cy.wait('@signupRequest');
    cy.get('.error-message').should('not.exist');
    cy.url().should('eq', `${baseUrl}/`);
  });
});
