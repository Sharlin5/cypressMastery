import { faker } from '@faker-js/faker';
/*
    {
        "name": createdUserName,
        "email" : createdUserEmail,
        "password": 'password123'
    },
*/

let userId;
let createdUserName;
let createdUserEmail;
let editedUserName;
let editedUserEmail;

const newUser = {
    name: faker.person.firstName(),
    email: faker.internet.email(),
    password: 'password123',
};

const editUser = {
    name: faker.person.firstName(),
    email: faker.internet.email(),
    password: 'password123',
}

describe('User API Tests', () => {
    it('REGISTER - Should create a user successfully', () => {
        cy.api({
            method: 'POST',
            url: 'http://localhost:3000/api/users/register',
            body: newUser,
        }).should((response) => {
            expect(response.status).to.eq(201);
            expect(response.body.message).to.eq('User registered');
            expect(response.body.user).to.have.property('id');
            expect(response.body.user.name).to.eq(newUser.name);
            expect(response.body.user.email).to.eq(newUser.email);

            // Store the user details for later assertions
            userId = response.body.user.id;
            createdUserName = response.body.user.name;
            createdUserEmail = response.body.user.email;
        });
    });

    it('VIEW - Should get the created user by ID', () => {
        cy.api({
            method: 'GET',
            url: 'http://localhost:3000/api/users/' + userId,
            headers: {
                'Authorization': 'Bearer STATIC_TOKEN_123',
            },
        }).should((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('id', userId);
            expect(response.body).to.have.property('name', createdUserName);
            expect(response.body).to.have.property('email', createdUserEmail);
        });
    });

    it('LOGIN - Should login newly created user', () => {
        cy.api({
            method: 'POST',
            url: 'http://localhost:3000/api/users/login',
            body: {
                "email": createdUserEmail,
                "password": 'password123'
            }
        }).should((response) => {
            expect(response.status).to.eq(200);
        });
    })

    it('VIEW - Should get all users', () => {
        cy.api({
            method: 'GET',
            url: 'http://localhost:3000/api/users/',
            headers: {
                'Authorization': 'Bearer STATIC_TOKEN_123',
            },
        }).should((response) => {
            expect(response.status).to.eq(200);
        });
    });

    it('PUT - Should update user information', () => {
        cy.request({
            method: 'PUT',
            url: `http://localhost:3000/api/users/${userId}`,
            body: editUser,
            headers: {
                Authorization: 'Bearer STATIC_TOKEN_123',
            },
        }).should((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.user.name).to.eq(editUser.name);
            expect(response.body.user.email).to.eq(editUser.email);
        });
    })

    it('PATCH - Should update password', () => {
        cy.request({
            method: 'PATCH',
            url: `http://localhost:3000/api/users/${userId}`,
            body: {
                "password": 'password1234'
            },
            headers: {
                Authorization: 'Bearer STATIC_TOKEN_123',
            },
        }).should((response) => {
            expect(response.status).to.eq(200);
        });
    })

    it('DELETE - Should delete user', () => {
        cy.request({
            method: 'DELETE',
            url: `http://localhost:3000/api/users/${userId}`,
            headers: {
                Authorization: 'Bearer STATIC_TOKEN_123',
            },
        }).should((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('message', "User deleted");
        });
    })
});

describe('User API Tests - Error Handling', () => {
    const invalidId = 1234;

    // create another user for the next tests
    before(() => {
        cy.api({
            method: 'POST',
            url: 'http://localhost:3000/api/users/register',
            body: newUser,
        }).should((response) => {
            expect(response.status).to.eq(201);
            userId = response.body.user.id;
            createdUserName = response.body.user.name;
            createdUserEmail = response.body.user.email;
        });
    })

    // error handling
    it('VIEW - Should show error message when getting nonexistent user.', () => {
        cy.api({
            method: 'GET',
            url: 'http://localhost:3000/api/users/' + invalidId,
            headers: {
                'Authorization': 'Bearer STATIC_TOKEN_123',
            },
            failOnStatusCode: false,
        }).should((response) => {
            expect(response.status).to.eq(404);
        });
    });

    // registered with previous test rerun the same user should get error status
    it('REGISTER - Should show email already exist when registering existing email', () => {
        cy.api({
            method: 'POST',
            url: 'http://localhost:3000/api/users/register',
            body: newUser,
            failOnStatusCode: false,
        }).should((response) => {
            expect(response.status).to.eq(400);
            expect(response.body).to.have.property('message', "Email already exists");
        })
    })

    // missing fields register
    it('REGISTER - Should show All fields required message when fields are empty ', () => {
        cy.api({
            method: 'POST',
            url: 'http://localhost:3000/api/users/register',
            body: {
                name: "",
                email: "",
            },
            failOnStatusCode: false,
        }).should((response) => {
            expect(response.status).to.eq(400);
            expect(response.body).to.have.property('message', "All fields required");
        })
    })

    it('LOGIN - Should show error message when using invalid email', () => {
        cy.api({
            method: 'POST',
            url: 'http://localhost:3000/api/users/login',
            body: {
                "email": 'InvalidEmail',
                "password": 'password123'
            },
            failOnStatusCode: false,
        }).should((response) => {
            expect(response.status).to.eq(400);
            expect(response.body).to.have.property('message', "User not found");
        });
    })

    it('LOGIN - Should show error message when using incorrect password', () => {
        cy.api({
            method: 'POST',
            url: 'http://localhost:3000/api/users/login',
            body: {
                "email": createdUserEmail,
                "password": 'password112344'
            },
            failOnStatusCode: false,
        }).should((response) => {
            expect(response.status).to.eq(401);
            expect(response.body).to.have.property('message', "Invalid password");
        });
    })

    it('PUT - Should show error message trying to perform update on nonexistent userID', () => {
        cy.request({
            method: 'PUT',
            url: `http://localhost:3000/api/users/${invalidId}`,
            body: {
                "name": 'practiceName',
                "email": 'practiceEmail',
                "password": 'password123'
            },
            headers: {
                Authorization: 'Bearer STATIC_TOKEN_123',
            },
            failOnStatusCode: false,
        }).should((response) => {
            expect(response.status).to.eq(404);
            expect(response.body).to.have.property('message', "User not found");
        });
    })

    it('PUT - Should show error message when there are empty field', () => {
        cy.request({
            method: 'PUT',
            url: `http://localhost:3000/api/users/${userId}`,
            body: {
                "name": "",
                "password": 'password123'
            },
            headers: {
                Authorization: 'Bearer STATIC_TOKEN_123',
            },
            failOnStatusCode: false,
        }).should((response) => {
            expect(response.status).to.eq(400);
            expect(response.body).to.have.property('message', "All fields required");
        });
    })

    it('PATCH - Should have correct error status when invalidId is used', () => {
        cy.request({
            method: 'PATCH',
            url: `http://localhost:3000/api/users/${invalidId}`,
            body: {
                "password": 'password1234'
            },
            headers: {
                Authorization: 'Bearer STATIC_TOKEN_123',
            },
            failOnStatusCode: false,
        }).should((response) => {
            expect(response.status).to.eq(404);
            expect(response.body).to.have.property('message', "User not found");
        });
    })

    it('DELETE - Should show correct error message when deleting nonexistent user', () => {
        cy.request({
            method: 'DELETE',
            url: `http://localhost:3000/api/users/${invalidId}`,
            headers: {
                Authorization: 'Bearer STATIC_TOKEN_123',
            },
            failOnStatusCode: false,
        }).should((response) => {
            expect(response.status).to.eq(404);
            expect(response.body).to.have.property('message', "User not found");
        });
    })

})