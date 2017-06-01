var chai = require('chai');
var expect = chai.expect;

var sessionStore = require('../session-store.js');
var TestManager = require('../test-manager.js');

describe('SessionStore#_firstRow(rows)', function() {
    describe('for all arrays', function() {
        it("should return the first indice", function(done) {
            var arr = [0, 1, 2, 3, 4];
            expect(sessionStore._firstRow(arr)).to.equal(0);
            // does not modify original array
            expect(arr[0]).to.equal(0);
            done();
        });

        it("should return null if empty array", function(done) {
            expect(sessionStore._firstRow([])).to.be.null();
            done();
        });
    });

    describe('for non-arrays', function() {
        it("should return null", function(done) {
            expect(sessionStore._firstRow(null)).to.be.null();
            expect(sessionStore._firstRow({})).to.be.null();
            expect(sessionStore._firstRow(undefined)).to.be.null();
            expect(sessionStore._firstRow('some string')).to.be.null();
            expect(sessionStore._firstRow(1234)).to.be.null();
            done();
        });
    });
});
