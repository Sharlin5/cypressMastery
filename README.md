# Cypress Sauce Demo

This test automation sample project contains **Sauce demo website** using **Cypress** framework for testing. It includes tests for **Login** feature with the flexibility to run them in **headless** and **headed** modes. 🌐

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
- We have spec file (a Test Code/File) Login feature, and they can be run in both headless and headed modes.

### Headless Mode 🧑‍💻 (Without Browser UI)

1. Login Test (Headless)
- To run the login test in headless mode:

```bash
npm run login-test
```


### Headed Mode 🖥️ (With Browser UI)
- In headed mode, the browser runs with a visible UI. This mode is useful for debugging and visual verification of test actions.

1. Login Test (Headed)
- To run the login test in headed mode:

```bash
npx cypress open
```

- select E2E testing.
- select a browser.

## Features ✨

- **Login Test**: Automates the login functionality using valid and invalid credentials on the Sauce Demo website.
