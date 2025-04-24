# Cypress Testing Practice

This test automation sample project makes use of **Cypress** to perform test on different websites. It contains the following sample tests.

**Sauce demo tests**
- Login and Cart Functionality tests

**Parabank tests**
- Registration tests

**Automation Exercise tests**
- Registration, Login and Checkout test with continuous flow.

**API tests**
- Performs API tests for the following sample APIs:
  - https://petstore.swagger.io/v2
  - https://github.com/Sharlin5/cypress-test-automation-2025/tree/staging

The tests can be run in **headless** and **headed** modes. 🌐

## Table of Contents 📚

- [Installation](#installation)
- [Running the Tests](#running-the-tests)
  - [Headless Mode](#headless-mode)
  - [Headed Mode](#headed-mode)
- [Features](#features)

---

## Installation 🛠️
### 1. Create a Project Folder
- First, create a project folder named CypressProject on your Desktop (or in your preferred location):
- Windows: Navigate to your Desktop, right-click, and select New Folder. Name it CypressProject.

- Mac/Linux: Open your terminal and run the following command to create a folder:

```bash
mkdir ~/Desktop/CypressProject
```
### 2. Clone the Repository

```bash
cd ~/Desktop/CypressProject
git clone https://github.com/Sharlin5/cypressMastery.git
```

### 3. Install Dependencies

```bash
cd CypressProject/cypressMastery
npm init
npm install cypress --save-dev  
```
### Clone the git for API Test
### 1. Clone the Repository
```bash
cd ~/Desktop/CypressProject
git clone https://github.com/Sharlin5/cypress-test-automation-2025.git
```

### 2. Install Dependencies
- Redirect to where you downloaded the repository with cd then perform the following.
```bash
git checkout staging
cd backend
npm install
```
open a new terminal with (+)
```bash
npm install  
```
### 3. Run the server
- To run the server for API Testing, Redirect to the correct folder.
```bash
cd backend
node server.js
```


## Running the Tests 🏃‍♂️
- We have spec file (a Test Code/File) and they can be run in both headless and headed modes.

### Headless Mode 🧑‍💻 (Without Browser UI)

1. Login Test (Headless)
- To run the login test in headless mode:

```bash
npm run login-test
```

2. Registration Test (Headless)
- To run the registration test in headless mode:

```bash
npm run registration-test
```

3. Automation Exercise Test (Headless)
- To run the registration test in headless mode:

```bash
npm run auto-prac-test
```


### Headed Mode 🖥️ (With Browser UI)
- In headed mode, the browser runs with a visible UI. This mode is useful for debugging and visual verification of test actions.

- To run the tests in headed mode:

```bash
npx cypress open
```

- Select E2E testing.
- Select a browser.
- Select the spec file you want to test.

#### Note: To change the following tests to be tested. Add .skip to the selected it block to shorten the time it takes to perform tests. (e.g. it.skip(...))

## Features ✨

- **Login Test**: Automates the login functionality using valid and invalid credentials on the Sauce Demo website.

- **Registration Test**: Automates the registration functionality using valid credentials on the Parabank website. Data driven testing that makes use of ***Faker*** and ***Fixtures***. Pages is also used to show ways to improve readability.

- **Automation Exercise**: Automates tests with registration, login and checkout functionality. This makes use of the different techniques to test the given functionalities.
  - List of tools/functions/techniques used:
    - Commands
    - Fakers
    - Fixtures
    - Pages

- **API Tests**: Pet Store API and User API tests
  - Automates API tests for pet store api. Contains tests for pet, users and store endpoints. Note: the tests for this API is inconsistent.
  - Automates API tests for a simple user api. Contains api tests for login, registration and view users.