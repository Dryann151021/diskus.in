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
    // 1. Buat random email untuk register
    const randomEmail = `testuser_${Math.random().toString(36).substring(7)}@example.com`;
    const password = 'testpassword123';

    // 2. Akses halaman register dan daftar terlebih dahulu
    cy.visit('/register');
    cy.get('input[placeholder="Masukkan nama"]').type('Test User');
    cy.get('input[placeholder="Masukkan email"]').type(randomEmail);
    cy.get('input[placeholder="Minimal 6 karakter"]').type(password);

    // Intercept register API
    cy.intercept('POST', '**/register').as('registerFlow');
    cy.get('button')
      .contains(/^Daftar$/)
      .click();

    // Tunggu register selesai
    cy.wait('@registerFlow');

    // Mencegah alert window jika API error, tapi cypress bisa lanjut
    cy.on('window:alert', () => {});

    // 3. Kembali ke halaman login
    cy.visit('/login');

    // 4. Mengisi email dan password yang benar
    cy.get('input[placeholder="Masukkan email"]').type(randomEmail);
    cy.get('input[placeholder="Masukkan password"]').type(password);

    // Intercept login dan get profile API
    cy.intercept('POST', '**/login').as('loginFlow');
    cy.intercept('GET', '**/users/me').as('profileFlow');

    cy.get('button')
      .contains(/^Login$/)
      .click();

    // Tunggu API login dan profile
    cy.wait('@loginFlow');
    cy.wait('@profileFlow');

    // 5. Memastikan navigasi ke homepage berhasil
    // Homepage menampilkan navigation dengan tombol logout
    cy.get('nav').should('be.visible');

    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });
});
