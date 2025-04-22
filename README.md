# Cypress Testing Practice

This test automation sample project uses the following websites: **Sauce demo, Parabank and Automation Exercise** for **Cypress** practice testing. It includes tests for **Login, Registration and Cart Functionality** feature with the flexibility to run them in **headless** and **headed** modes. Currently all tests are only happy path based. 🌐

*Newly added API Testing with Pet Store API. 
  - Tests are inconsistent.

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

#### Note: To change the following tests to be tested. Add .skip to the selected it block to shorted the time it takes to perform tests. (e.g. it.skip(...))

## Features ✨

- **Login Test**: Automates the login functionality using valid and invalid credentials on the Sauce Demo website.

- **Registration Test**: Automates the registration functionality using valid credentials on the Parabank website. Data driven testing that makes use of Faker and Fixtures. Pages is also used to show ways to improve readability.

- **Automation Exercise**: Automates tests with registration, login and checkout functionality. This makes use of the different techniques to test the given functionalities.

- **API Tests**: Automates API tests for pet store api. Contains tests for pet, users and store endpoints.