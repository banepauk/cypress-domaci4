/// <reference types="Cypress" />
import { create } from '../page_objects/create'
const faker = require ('@faker-js/faker')

describe('create gallery', () =>{
  let galleryId;
  let email = 'test2223@gmail.com'
  let password = 'test22232' 
  let longTitle = faker.random.alpha({ count: 501 })
  let validTitle = faker.random.alpha({ count: 5 });
  let invalidTitle = faker.random.alpha({ count: 1001 })
  let shortTitle = faker.random.alpha({ count: 1})
  let validDescription = faker.random.alpha({ count: 10 })
  let invalidDescription = faker.random.alpha({ count: 1500 })
  let validUrl = 'https://upload.wikimedia.org/wikipedia/commons/4/41/Sunflower_from_Silesia2.jpg'
  let wrongUrl = 'https://upload.mp3'

  beforeEach('login via backend', () => {
    cy.loginViaBackend()
    cy.visit('/create');
    cy.url().should('include', '/create');
});



  it('descrption > 1500 characters', () =>{ 
    cy.intercept({
      method: 'POST',
      url: 'https://gallery-api.vivifyideas.com/api/galleries'
  }).as('descriptionInvalid')

    create.descriptionWith1000Char(validTitle, invalidDescription, validUrl);
    cy.wait('@descriptionInvalid').then(interseption => {
      expect(interseption.response.statusCode).to.exist
      expect(interseption.response.statusCode).eq(422)
    })
    cy.url().should('include', '/create');
    create.createHeading.should('be.visible')
      .and('have.text', 'Create Gallery')
      .and('have.css', 'color', 'rgb(72, 73, 75)')
    create.titleInput.should('be.visible')
  })



  it('title < 2 character', () =>{
    cy.intercept({
      method: 'POST',
      url: 'https://gallery-api.vivifyideas.com/api/galleries'
  }).as('shortTitle')

    create.titleContainLess2character(shortTitle, validDescription, validUrl);
    cy.wait('@shortTitle').then(interseption => {
      expect(interseption.response.statusCode).to.exist
      expect(interseption.response.statusCode).eq(422)
    })
    cy.url().should('include', '/create');
    create.createHeading.should('be.visible')
      .and('have.text', 'Create Gallery')
      .and('have.css', 'color', 'rgb(72, 73, 75)')
    create.errorMessage.should('be.visible')
      .and('have.text', 'The title must be at least 2 characters.')
      .and('have.css', 'background-color', 'rgb(248, 215, 218)')
    create.titleInput.should('be.visible')
  })



  it('wrong url format', () =>{
    cy.intercept({
      method: 'POST',
      url: 'https://gallery-api.vivifyideas.com/api/galleries'
  }).as('wrongUrl')

    create.wrongUrlFormat(validTitle, validDescription, wrongUrl);
    cy.wait('@wrongUrl').then(interseption => {
      expect(interseption.response.statusCode).to.exist
      expect(interseption.response.statusCode).eq(422)
    })
    cy.url().should('include', '/create');
    create.createHeading.should('be.visible')
      .and('have.text', 'Create Gallery')
      .and('have.css', 'color', 'rgb(72, 73, 75)')
    create.titleInput.should('be.visible')
  })


  it('title > 500 character', () =>{
    cy.intercept({
      method: 'POST',
      url: 'https://gallery-api.vivifyideas.com/api/galleries'
  }).as('longTitle')

    create.titleContainLess2character(shortTitle, validDescription, validUrl);
    cy.wait('@longTitle').then(interseption => {
      expect(interseption.response.statusCode).to.exist
      expect(interseption.response.statusCode).eq(422)
    })
    cy.url().should('include', '/create');
    create.createHeading.should('be.visible')
      .and('have.text', 'Create Gallery')
      .and('have.css', 'color', 'rgb(72, 73, 75)')
    create.errorMessage.should('be.visible')
      .and('have.text', 'The title must be at least 2 characters.')
      .and('have.css', 'background-color', 'rgb(248, 215, 218)')
    create.titleInput.should('be.visible')
  })



  it('add one image without description', () =>{
    cy.intercept({
      method: 'POST',
      url: 'https://gallery-api.vivifyideas.com/api/galleries'
  }).as('withoutDescription')
    
    create.oneImgWithoutDescription(validTitle, validUrl);
    cy.wait('@withoutDescription').then(interception => {
      galleryId = interception.response.body.id

      expect(interception.response.body.title).eq(validTitle)
      cy.visit(`/galleries/${galleryId}`)
      cy.get('h1').should('have.text', validTitle)
    })
    create.createHeading.should('be.visible')
      .and('have.text', validTitle)
      .and('have.css', 'color', 'rgb(72, 73, 75)')
    cy.url().should('not.include', '/create');
  })



  it('add one image with description', () =>{
    cy.intercept({
      method: 'POST',
      url: 'https://gallery-api.vivifyideas.com/api/galleries'
  }).as('createGallery')
    
    create.oneImgWithDescription(validTitle, validDescription, validUrl);
    cy.wait('@createGallery').then(interception => {
      galleryId = interception.response.body.id

      expect(interception.response.body.title).eq(validTitle)
      cy.visit(`/galleries/${galleryId}`)
      cy.get('h1').should('have.text', validTitle)
    })
    create.createHeading.should('be.visible')
      .and('have.text', validTitle)
      .and('have.css', 'color', 'rgb(72, 73, 75)')
    cy.url().should('not.include', '/create');
  })



  it('two images', () => {
    cy.intercept({
      method: 'POST',
      url: 'https://gallery-api.vivifyideas.com/api/galleries'
  }).as('twoImages')
  
    create.twoImage(validTitle,validDescription,validUrl);
    cy.wait('@twoImages').then(interception => {
      galleryId = interception.response.body.id

      expect(interception.response.body.title).eq(validTitle)
      cy.visit(`/galleries/${galleryId}`)
      cy.get('h1').should('have.text', validTitle)
  
    })
    create.createHeading.should('be.visible')
      .and('have.text', validTitle)
      .and('have.css', 'color', 'rgb(72, 73, 75)')
    cy.url().should('not.include', '/create');
  })



  it('moving second img', () =>{
    cy.intercept({
      method: 'POST',
      url: 'https://gallery-api.vivifyideas.com/api/galleries'
  }).as('createGalWithMoving')
    
    create.getSecondImageOnFirstPlaceUsingArrow(validTitle,validDescription,validUrl);
    cy.wait('@createGalWithMoving').then(interception => {
      galleryId = interception.response.body.id

      expect(interception.response.body.title).eq(validTitle)
      cy.visit(`/galleries/${galleryId}`)
      cy.get('h1').should('have.text', validTitle)
    })
    create.createHeading.should('be.visible')
      .and('have.text', validTitle)
      .and('have.css', 'color', 'rgb(72, 73, 75)')
    cy.url().should('not.include', '/create');
  })
})
