
Online version for viewing:
http://52.11.14.57:4500

Sentiments Front End : React with redux that allows you to login(username:"brandon", password: "test"), enter sentences, and recieve a result about the sentiment of your sentences.  

Since I wanted more practice, I used redux to handle all state management, it's a bit of overkill but I was rusty so it was good practice.

Uses Flowtypes for checking, there was a types library for my version of react-redux so a few warnings will occur for redux functions.

Sentiments Api:

This API will let authorized users submit a sentence string to the Sentiments API(community-sentiment.p.mashape.com) and recieve a determination of content tone(Positive, Neutral, Negative).

Users are authorized via Json Web Tokens(JWT) and need an Authorization header with valid token to access routes within '/protected' to submit sentences. Users can recieve their token and login by making a post request to '/login/user' with valid username/password.

Currently I added one default user to the database that is valid {username:"brandon", password: "test"}

Database is Mongodb collection named "sentiments" and we're using mongoose ORM to connect to it. Settings for Database URL, token Secret are in '/config.json' mocha/chai tests are in '/tests' and will test our API

Default Scripts to run via CLI(see package.json for more details)

npm start - start api server and serve website('./dist') - hosted port 4500

npm test - run mocha tests: api server mustt be running first

npm run development - run webpack-dev-server with live reloading - hosted on post 8080

npm run build:dev - build development un-optimized website to dist

npm run build - build production optimized website output to dist

flow - start flow server to check file for type errors
