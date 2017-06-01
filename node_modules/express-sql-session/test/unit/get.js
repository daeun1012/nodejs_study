var async = require('async');
var chai = require('chai');
var expect = chai.expect;
var sessionStore = require('../session-store.js');
var TestManager = require('../test-manager.js');

describe('SessionStore#get(sid, cb)', function() {
    before(TestManager.tearDown);
    before(TestManager.setUp);
    after(TestManager.tearDown);

    var fixtures = require('../fixtures/sessions');

    describe('when a session exists', function() {
        before(TestManager.populateSessions);

        it("should return session data", function(done) {
            async.each(fixtures, function(fixture, nextFixture) {
                var sid = fixture.session_id;
                var data = fixture.data;

                sessionStore.get(sid, function(err, session) {
                    expect(err).to.be.null();
                    expect(JSON.stringify(session)).to.equal(JSON.stringify(data));

                    nextFixture();
                });
            }, done);
        });
    });

    describe('when a session does not exist', function() {
        before(TestManager.clearSessions);

        it("should return null", function(done) {
            async.each(fixtures, function(fixture, nextFixture) {
                var sid = fixture.session_id;
                var data = fixture.data;

                sessionStore.get(sid, function(error, session) {
                    expect(error).to.be.null();
                    expect(session).to.be.null();
                    nextFixture();
                });
            }, done);
        });
    });
});
