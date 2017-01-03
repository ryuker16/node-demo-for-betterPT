/**
 *  Tests - tests our API to ensure sentiments is recieving/responding to sentences
 *  and that our routes are authenticated/can login users in.
 *
 * Run "npm test" in Terminal/CLI to run tests
 *
 * Mocha with Chai as out assertion library
 */


var unirest = require('unirest');
var url = "http://localhost:3000/";
var chai = require('chai');

var should = chai.should();
var token;

describe("Attempt to login and get Json Web Token", () => {

    it("logged in and returned a JWT token without error",
        (done) => {
            unirest.post(url + 'login/user')
                .send({
                    username: "Brandon",
                    password: "test"
                })
                .end((result) => {
                    result.code.should.equal(200);
                    result.body.should.be.a('string');
                    token = result.body;
                    done();
                })
        })

});


describe("Attempt to make post request as authorized user", () => {
    it("should give us status code 200 with positive content review based on sentence", (done) => {
        unirest.post(url + 'protected/send')
            .header('Authorization', "Bearer " + token)
            .send({
                sentence: 'Today is a very good day in beautiful san francisco'
            })
            .end((result) => {
                result.code.should.equal(200);
                result.body.sentiment.should.equal("Positive")
                result.body.sentiment.should.be.a('string');
                console.log(result.body);
                done();
            })
    })

    it("should give us status code 200 with positive negative review based on sentence", (done) => {
        unirest.post(url + 'protected/send')
            .header('Authorization', "Bearer " + token)
            .send({
                sentence: 'Today is a horrible day in insane san francisco'
            })
            .end((result) => {
                result.code.should.equal(200);
                result.body.sentiment.should.equal("Negative")
                result.body.sentiment.should.be.a('string');
                console.log(result.body);
                done();
            })
    })

});
