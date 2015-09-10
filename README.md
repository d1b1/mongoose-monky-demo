# Mongoose Monky Demo
Example of Mocha tests of Mongoose using Monky Factories

This is a simple demo that helps illustrate patterns for testing
mongoose models and schemas. Specifically models with reference
and validation.

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
