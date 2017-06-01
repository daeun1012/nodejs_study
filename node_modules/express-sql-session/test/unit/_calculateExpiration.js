var chai = require('chai');
var expect = chai.expect;

var sessionStore = require('../session-store.js');
var TestManager = require('../test-manager.js');

describe('SessionStore#_calculateExpiration(cookie)', function() {
    describe("if cookie passed in", function() {
        it("should return the expiration time in seconds using cookie's expiration property", function(done) {
            var cookie = {
                expires: new Date()
            };

            expect(sessionStore._calculateExpiration(cookie)).to.equal(Math.round(cookie.expires.getTime() / 1000));
            done();
        });
    });

    describe("if no cookie passed in", function() {
        it("should calculate the expiration date for any new cookies", function(done) {
            var expires = new Date(Date.now() + sessionStore.expires);
            expect(sessionStore._calculateExpiration()).to.equal(Math.round(expires.getTime() / 1000));
            done();
        });
    });
});
