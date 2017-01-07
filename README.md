
<<<<<<< HEAD


Sentiments Front End : React with redux that allows you to login(username:"brandon", password: "test"), enter sentences, and recieve a result about the sentiment of your sentences.  

Since I wanted more practice, I used redux to handle all state management, it's a bit of overkill but I was rusty.

Uses Flowtypes for checking, there was a types library for my version of react-redux so a few warnings will occur for redux functions.

Sentiments Api:

This API will let authorized users submit a sentence string to the Sentiments API(community-sentiment.p.mashape.com) and recieve a determination of content tone(Positive, Neutral, Negative).

Users are authorized via Json Web Tokens(JWT) and need an Authorization header with valid token to access routes within '/protected' to submit sentences. Users can recieve their token and login by making a post request to '/login/user' with valid username/password.

Currently I added one default user to the database that is valid {username:"brandon", password: "test"}

Database is Mongodb collection named "sentiments" and we're using mongoose ORM to connect to it. Settings for Database URL, token Secret are in '/config.json' mocha/chai tests are in '/tests' and will test our API

Terminal Commands(see package.json for more details)

npm start - start api server and serve website('./dist')
npm test - run mocha tests: api server most be running first
npm run dev - run development build of website with webpack-dev-server
npm run webpack - build production optimized website output to dist
flow - start flow server to check file for type errors
=======
senti-test node-demo-for-betterPT

Everything except design/implementation of react frontend page is finished including tests for API, API documentation, webpack configuration, flowtype, etc. Recently got hit by a car in a hit & run accident so I've been chasing the taxi driver down on monday for much of the day. No injuries or heavy damage but a real iffy monday.

Will finish up React components today(Tuesday).

** TODO ** 

Change database URL to my own DB servers instead of my local database

Finish the React pages

Move to my production server to host web app.

========================

This API will let authorized users submit a sentence string to the
Sentiments API(community-sentiment.p.mashape.com) and recieve a
determination of content tone(Positive, Neutral, Negative). 

Users are authorized via Json Web Tokens(JWT) and need an Authorization header
with valid token to access routes within '/protected' to submit sentences. 
Users can recieve their token and login by making a post request to
'/login/user' with valid username/password.

Currently I added one default user to the database that is valid
{username:"Brandon", password: "test"} 

Database is Mongodb collection named "sentiments" and we're using mongoose ORM
to connect to it. Settings for Database URL, token Secret are in '/config.json' 
mocha/chai tests are in '/tests' and will test our API 

Terminal Commands(see package.json for more details) 

npm start - start api server and serve website('./dist')
npm test - run mocha tests - api server most be running first
npm run dev - run development build of website with webpack-dev-server
npm run webpack - build production optimized website output to dist
flow - start flow server to check files
>>>>>>> master
