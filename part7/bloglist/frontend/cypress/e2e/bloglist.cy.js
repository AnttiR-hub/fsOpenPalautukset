/* eslint-disable no-undef */
describe('Bloglist app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Testaaja 1',
      username: 'testaaja1',
      password: 'password'
    }

    const user2 = {
      name: 'Testaaja 2',
      username: 'testaaja2',
      password: 'password'
    }

    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.request('POST', 'http://localhost:3003/api/users/', user2)
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('testaaja1')
      cy.get('#password').type('password')
      cy.get('#login-button').click()
      cy.contains('Testaaja 1 logged in')
    })
    it('fails with wrong credentials', function() {
      cy.get('#username').type('testaaja1')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
      cy.get('.error').contains('Wrong username or password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('testaaja1')
      cy.get('#password').type('password')
      cy.get('#login-button').click()
      cy.contains('Testaaja 1 logged in')
    })

    it('Blog can be created', function() {
      cy.contains('Create new blog').click()
      cy.get('#title').type('test title')
      cy.get('#author').type('test author')
      cy.get('#url').type('www.test.com')
      cy.get('#create-button').click({ force: true })
      cy.contains('test title test author')
    })

    describe('Blog exists', function () {
      beforeEach(function () {
        cy.contains('Create new blog').click()
        cy.get('#title').type('test title')
        cy.get('#author').type('test author')
        cy.get('#url').type('www.test.com')
        cy.get('#create-button').click({ force: true })
        cy.contains('test title test author')
      })

      it('user can add likes', function () {
        cy.contains('View more').click()
        cy.contains('0')
          .contains('like')
          .click()

        cy.contains('1')
      })

      it('user can delete their blog', function () {
        cy.contains('View more').click()
        cy.get('#remove-button').click()
        cy.contains('remove').should('not.exist')
      })
    })

    describe('when there are more than one users', function () {
      beforeEach(function () {
        cy.contains('logout').click()

        cy.get('#username').type('testaaja2')
        cy.get('#password').type('password')
        cy.get('#login-button').click()
        cy.contains('Testaaja 2 logged in')
      })

      it('only user who created the blog can delete it', function () {
        cy.contains('Create new blog').click()
        cy.get('#title').type('test title 2')
        cy.get('#author').type('test author 2')
        cy.get('#url').type('www.test2.com')
        cy.get('#create-button').click({ force: true })
        cy.contains('test title 2 test author 2')

        cy.contains('logout').click()
        cy.get('#username').type('testaaja1')
        cy.get('#password').type('password')
        cy.get('#login-button').click()
        cy.contains('Testaaja 1 logged in')

        cy.contains('View more').click()
        cy.contains('remove').should('not.exist')
      })

      it('blogs are sorted by likes', function () {
        cy.contains('Create new blog').click()
        cy.get('#title').type('Most likes')
        cy.get('#author').type('Test')
        cy.get('#url').type('www.like.com')
        cy.get('#create-button').click({ force: true })

        cy.contains('Create new blog').click()
        cy.get('#title').type('Second most likes')
        cy.get('#author').type('Test')
        cy.get('#url').type('www.likes.com')
        cy.get('#create-button').click({ force: true })

        cy.contains('Most likes').contains('View more').click()
        cy.get('button').contains('like').click()

        cy.get('.blog').eq(0).should('contain', 'Most likes')
        cy.get('.blog').eq(1).should('contain', 'Second most likes')
      })
    })
  })
})