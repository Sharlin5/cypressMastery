import { faker } from '@faker-js/faker';

export function generateCustomerData() {

  const randomNumber = faker.string.numeric(2);
  const usernameBase = faker.internet.username();
  const username = `${usernameBase}${randomNumber}`;
  //const username = usernameBase + randomNumber;
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    zipCode: faker.location.zipCode(),
    phoneNumber: faker.phone.number(), // pwedeng custom test data yung phone number
    ssn: faker.string.numeric(9),
    //username: faker.internet.username(),
    username: username,
    password: 'passw0rd',
  };
}

export function generateUserData(){
  const randomNumber = faker.string.numeric(2);
  const usernameBase = faker.internet.username();
  const username = `${usernameBase}${randomNumber}`;
  
  const randomGend = faker.number.int({ min: 1, max: 2 });

  return {
    title: "Mr.",
    name: faker.person.fullName(),
    email: faker.internet.email(),
    gender: randomGend,
    password: 'password123',
    day: '10',
    month: faker.date.month(),
    //year: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }).getFullYear(),
    year: '2013',
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    company: faker.company.name(),
    address: faker.location.streetAddress(),
    address2: faker.location.streetAddress(),
    country: "Australia",
    state: "Victoria",
    city: "Melbourne",
    zipcode: "3004",
    mobileNum: "09123456789",
    cardNum: faker.finance.creditCardNumber(),
    cvc: "1234",
    endMonth: "03",
    endYear: "2030"
  };
}