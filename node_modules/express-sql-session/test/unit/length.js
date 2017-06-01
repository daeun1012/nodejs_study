var async = require('async');
var chai = require('chai');
var expect = chai.expect;

var sessionStore = require('../session-store');
var TestManager = require('../test-manager');

describe("SessionStore#length(callback)", function() {
    before(TestManager.tearDown);
    before(TestManager.setUp);
    after(TestManager.tearDown);

    var fixtures = require('../fixtures/sessions');

    it('should give an accurate count of the total number of sessions', function(done) {
        var num_sessions = 0;

        async.eachSeries(fixtures, function(fixture, nextFixture) {
            var sid = fixture.session_id;
            var data = fixture.data;

            sessionStore.set(sid, data, function(err) {
                expect(err).to.be.null();
                num_sessions++;

                sessionStore.length(function(err, count) {
                    expect(err).to.be.null();
                    expect(count).to.equal(num_sessions);

                    nextFixture();
                });
            });
        }, done);
    });
});
