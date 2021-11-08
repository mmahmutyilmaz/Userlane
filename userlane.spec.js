/// <reference types="cypress" />

import 'cypress-file-upload';

describe('example to-do app', () => {

  
  it('should visit userlane-careers', () => {

    cy.visit('https://www.userlane.com/careers')
    cy.get('.jobs-list>div').contains('QA/Test Engineer').should('have.length.above',0);
    
  })

  it('should post the application form', () => {

    cy.visit('https://jobs.lever.co/userlane/19b969e3-e406-486c-82e6-483f62fe597f');
    cy.get('a.postings-btn').eq(0).click();
    cy.get('#resume-upload-input').attachFile('myCV.txt');
    cy.get('[name="name"]').type('Ahmet');
    cy.get('[name="email"]').type('my email');
    cy.get('[name="phone"]').type('my phone');
    cy.get('[name="org"]').type('my company');
    cy.get('[name="urls[LinkedIn]"]').type('my linkedin');
    cy.get('[name="cards[b6003f01-23c3-4880-bdc9-a553b23948a9][field0]"]').type('I can start 1st of the following month');
    cy.get('[name="cards[feb7d9d3-23a6-4c29-9e9f-5d9db2a872f4][field0]"]').eq(0).click();
    cy.get('[name="cards[a84c6739-175e-4233-aeee-8806fce30c87][field0]"]').type('my salary expectation');
    cy.get('[name="comments"]').type('I am the best person you can hire :)');
    cy.get('[name="consent[marketing]"]').eq(1).click();
    //At this stage the user should pass Captcha
    //cy.get('button.postings-btn').click();
    //
    cy.intercept('POST', {
      statusCode: 200
     
    })
    cy.intercept('POST', 'https://ec.walkme.com/event/backEvent').as('new-user')
// trigger network calls by manipulating web app's user interface, then
cy.wait('@new-user').should('have.property', 'response.statusCode', 201)
    
})
})