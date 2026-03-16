/**
 * Skenario pengujian End-to-End Login
 *
 * - Login spec
 *   - should display login page correctly
 *   - should display alert when email/password is wrong
 *   - should login successfully and redirect to homepage
 */

describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should display login page correctly', () => {
    // Memastikan elemen-elemen login form ditampilkan
    cy.get('input[placeholder="Masukkan email"]').should('be.visible');
    cy.get('input[placeholder="Masukkan password"]').should('be.visible');
    cy.get('button')
      .contains(/^Login$/)
      .should('be.visible');
  });

  it('should display alert when email/password is wrong', () => {
    // Mengisi email dan password yang salah
    cy.get('input[placeholder="Masukkan email"]').type('wrong@example.com');
    cy.get('input[placeholder="Masukkan password"]').type('wrongpassword');

    cy.get('button')
      .contains(/^Login$/)
      .click();

    // Memastikan window.alert muncul dengan pesan error
    cy.on('window:alert', (str) => {
      expect(str).to.be.a('string');
    });
  });

  it('should login successfully and redirect to homepage', () => {
    // Use test credentials
    const testEmail = 'johndoe@example.com';
    const testPassword = 'password123';

    // Intercept login dan get profile API
    cy.intercept('POST', '**/login').as('loginFlow');
    cy.intercept('GET', '**/users/me').as('profileFlow');

    // Mengisi email dan password
    cy.get('input[placeholder="Masukkan email"]').type(testEmail);
    cy.get('input[placeholder="Masukkan password"]').type(testPassword);

    cy.get('button')
      .contains(/^Login$/)
      .click();

    // Tunggu API login dan profile
    cy.wait('@loginFlow', { timeout: 10000 });
    cy.wait('@profileFlow', { timeout: 10000 });

    // Memastikan navigasi ke homepage berhasil
    cy.url().should('include', '/');
    cy.get('nav').should('be.visible');
  });
});
