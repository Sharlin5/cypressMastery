Cypress.config('baseUrl', 'https://petstore.swagger.io/v2');

let petId; // Shared variable to store the pet ID
let orderId; // Shared variable to store the order ID
let userId; // Shared variable to store the user ID

let usernameTemp // username temporary var
let passwordTemp // password temporary var
/* 
  For this spec file all test for each describe block uses
  {'testIsolation': false}
  This makes it that each it block work in conjunction
*/
// Note: Tests are inconsistent

const apiKey = 'special-key';

// PET endpoint
describe('Pet Store API Tests - PET', {'testIsolation': false}, () => {
  const pet = {
    id: 12345,
    name: 'Fulgoso',
    status: 'available',
  };

  const updatedPet = {
    id: 12345,
    name: 'Fulgoso Updated',
    status: 'sold',
  };

  // Create a pet before running the tests
  // Action = Mag Request using cy.api then Assert using .then method and expect
  before(() => {
    cy.api({
      method: 'POST',
      url: '/pet',
      body: pet,
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('id', pet.id)
      petId = response.body.id
    });
  });

  // Clean up by deleting the pet after all tests
  after(() => {
    cy.api({
      method: 'DELETE',
      url: `/pet/${petId}`,
    }).then((response) => {
      expect(response.status).to.eq(200)
    });
  });

  it('PUT - Update an existing pet', () => {
    cy.wrap(petId).should('exist'); // Ensure petId exists

    cy.api({
      method: 'PUT',
      url: '/pet',
      body: updatedPet,
    }).then((response) => {
      expect(response.status).to.eq(200) // Validate status code
      expect(response.body).to.have.property('id', petId) // Validate response body
      expect(response.body).to.have.property('name', updatedPet.name);
      expect(response.body).to.have.property('status', updatedPet.status)
    });
  });

  it('GET - Find pet by ID', () => {
    cy.wrap(petId).should('exist')
    cy.waitUntil(
      () =>
        cy.api({
            method: 'GET',
            url: `/pet/${petId}`,
          })
          .should((response) => {
            expect(response.status).to.eq(200);
            return response.body.name === updatedPet.name;
          }),
      {
        timeout: 10000,
        interval: 1000,
      }
    );
    cy.api({
      method: 'GET',
      url: `/pet/${petId}`,
    }).should((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('id', petId)
      expect(response.body).to.have.property('name', updatedPet.name)
    });
  });

  it('GET - Ensure no sensitive data is exposed', () => {
    cy.wrap(petId).should('exist')

    cy.api({
      method: 'GET',
      url: `/pet/${petId}`,
    }).should((response) => {
      expect(response.body).to.not.have.property('bearer-token')
      expect(response.body).to.not.have.property('access-token')
      expect(response.body).to.not.have.property('jwt-token')
      expect(response.body).to.not.have.property('password')
      expect(response.body).to.not.have.property('api_key')
    });
  });
});

// STORE Endpoint
describe('Pet store API test - STORE', {'testIsolation': false}, () => {
    const order = {
        "id": 12345, // randomly set id
        "petId": 0,
        "quantity": 0,
        "shipDate": "2025-04-22T03:15:20.231Z",
        "status": "placed",
        "complete": true
    }

    before(() => {
        cy.api({
          method: 'POST',
          url: '/store/order',
          body: order,
        }).then((response) => {
          expect(response.status).to.eq(200)
          expect(response.body).to.have.property('id', order.id)
          orderId = response.body.id
        });
    });

    // Clean up by deleting the pet after all tests
    after(() => {
        cy.api({
        method: 'DELETE',
        url: `/store/order/${orderId}`,
        
        }).then((response) => {
        expect(response.status).to.eq(200)
        });
    });

    it('GET - View inventory', () => {
        cy.api({
            method: 'GET',
            url: '/store/inventory'
        }).should((response) => {
            expect(response.status).to.eq(200);
        })
    })

    it('GET - Find order by ID', () => {
        cy.wrap(orderId).should('exist')
        cy.waitUntil(
          () =>
            cy.api({
                method: 'GET',
                url: `/store/order/${orderId}`,
              })
              .should((response) => {
                expect(response.status).to.eq(200);
              }),
          {
            timeout: 10000,
            interval: 1000,
          }
        );
        cy.api({
          method: 'GET',
          url: `/store/order/${orderId}`,
        }).should((response) => {
          expect(response.status).to.eq(200)
          expect(response.body).to.have.property('id', orderId)
        });
    });

    it('GET - Ensure no sensitive data is exposed', () => {
      cy.wrap(orderId).should('exist')
  
      cy.api({
        method: 'GET',
        url: `/store/inventory`,
      }).should((response) => {
        expect(response.body).to.not.have.property('bearer-token')
        expect(response.body).to.not.have.property('access-token')
        expect(response.body).to.not.have.property('jwt-token')
        expect(response.body).to.not.have.property('password')
        expect(response.body).to.not.have.property('api_key')
      });
    });

})

// USERS Endpoint
// response body does not contain user data, only able to check response status
describe('Pet store API test - USERS', {'testIsolation': false}, () => {
    const user = {
        "id": 40,
        "username": 'JohnDoe',
        "firstName": 'John',
        "lastName": 'Doe',
        "email": 'johndoe@email.com',
        "password": 'password',
        "phone": '0123456789',
        "userStatus": 0
    }

    const updatedUser = {
        "id": 40,
        "username": 'JohnDoe Updated',
        "firstName": 'John',
        "lastName": 'Doe',
        "email": 'johndoe@email.com',
        "password": 'password',
        "phone": '0123456789',
        "userStatus": 0
    }

    // use sample user
    // comment out very inconsitent
    /*
    it('GET - Find user by username', () => {
        cy.api({
            method: 'GET',
            url: `/user/user1`,
        }).should((response) => {
            expect(response.status).to.eq(200)
            // Not in response body
            //expect(response.body).to.have.property('username', 'user1')
            //usernameTemp = response.body.username
            //passwordTemp = response.body.password
        });
    })
    */

    // Check error code
    it('GET - Find user with invalid username', () => {
      cy.api({
          method: 'GET',
          url: `/user/USerDoesNotExist`,
          failOnStatusCode: false,
      }).should((response) => {
          expect(response.status).to.eq(404)
      });
  })

    it('GET - Login existing user', () => {
        cy.api({
            method: 'GET',
            url: `/user/login`, 
            qs: {
                username: usernameTemp, // Set the username parameter
                password: passwordTemp, // Set the password parameter
            },
        }).should((response) => {
            expect(response.status).to.eq(200);   
        })
    })
    // Note: API error(?) any username and password is accepted.

    it('POST - Add a user', () => {
        cy.api({
            method: 'POST',
            url: `/user`,
            body: user,
        }).should((response) => {
            expect(response.status).to.eq(200)
            //expect(response.body).to.have.property('username', user.username)
            usernameTemp = user.username
            passwordTemp = user.password
        });
    })

    // get created user
    it('GET - Find user by username', () => {
      cy.wrap(user.username).should('exist')
      cy.wait(1000)
      cy.api({
          method: 'GET',
          url: `/user/${user.username}`,
      }).should((response) => {
          expect(response.status).to.eq(200)
          expect(response.body).to.have.property('username', user.username)
      });
  })

    it('PUT - Update a user', () => {
        cy.api({
            method: 'PUT',
            url:`/user/${user.username}`,
            body: updatedUser,
        }).should((response) => {
            expect(response.status).to.eq(200) // Validate status code
            usernameTemp = updatedUser.username
        });
    })

    it('DELETE - Delete a user', () => {
        cy.wrap(usernameTemp).should('exist')
        cy.wait(1000)
        cy.api({
            method: 'DELETE',
            url: `/user/${usernameTemp}`,
        }).then((response) => {
            expect(response.status).to.eq(200)
        });
    })

    it('DELETE - Delete an invalid user', () => {
        cy.api({
            method: 'DELETE',
            url: `/user/rAndOmDoNOtExISt`,
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.eq(404)
        });
    })

    it('GET - Logout current user', () => {
        cy.api({
            method: 'GET',
            url: '/user/logout', 
        }).then((response) => {
            expect(response.status).to.eq(200);   
        })
    })
})

