# Mongoose Monky Demo
Example of Mocha tests of Mongoose using Monky Factories

This is a simple demo that helps illustrate patterns for testing
mongoose models and schemas. Specifically models with reference
and validation.

[![Coverage Status](https://coveralls.io/repos/d1b1/mongoose-monky-demo/badge.svg?branch=master&service=github)](https://coveralls.io/github/d1b1/mongoose-monky-demo?branch=master)

[ ![Codeship Status for d1b1/mongoose-monky-demo](https://codeship.com/projects/d8b267c0-3a28-0133-28f2-52d3cc3ef445/status?branch=master)](https://codeship.com/projects/101808)

## Need
This project does not really solve a problem, as much as provide a simple way to test the different features
built into the `monky` project with different validation option for `mongoose` schema. Happy to add more tests
and features. It is easier to test in a standalone repo that to try to fight the features to a large testing
suite.

## Models
* User (name, username (required/unique), password, email (required/unique) )
* Product (name, brand, category, photoUrl)
* UserProduct (User (ref), Product (ref), Date)

## References
* https://github.com/behrendtio/monky
* http://mongoosejs.com/

## Install 
    npm install

## How to Run?

    npm test
