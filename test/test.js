var supertest = require("supertest");
var should = require("should");

// This agent refers to PORT where program is runninng.

var server = supertest.agent("http://localhost:3000");

// UNIT test begin

describe("SAMPLE unit test", function () {

    // #1 should return home page

    it("should return response", function (done) {

        // calling home page api
        server
            .get("/users/fetch")
            .expect("Content-type", /json/)
            .expect(200) // THis is HTTP response
            .end(function (err, res) {
                // HTTP status should be 200
                console.log("res",res.status);
                res.status.should.equal(200);
                // success key should be true.
                res.body.success.should.equal(true);
                done();
            });
    });

});