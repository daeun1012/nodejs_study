var async = require('async');
var chai = require('chai');
var expect = chai.expect;

var sessionStore = require('../session-store.js');
var TestManager = require('../test-manager');

describe('SessionStore#destroy(sid, cb)', function() {
    before(TestManager.tearDown);
    before(TestManager.setUp);
    after(TestManager.tearDown);

    var fixtures = require('../fixtures/sessions');

    describe('when the session exists', function() {
        before(TestManager.populateSessions);

        it('should delete the session', function(done) {
            async.each(fixtures, function(fixture, nextFixture) {
                var sid = fixture.session_id;
                var data = fixture.data;

                sessionStore.destroy(sid, function(err) {
                    expect(err).to.be.null();

                    sessionStore.get(sid, function(err, session) {
                        expect(err).to.be.null();
                        expect(session).to.be.null();
                        nextFixture();
                    });
                });
            }, done);
        });
    });

    describe('when the session does not exist,', function() {
        before(TestManager.clearSessions);

        it('should do nothing', function(done) {
            async.each(fixtures, function(fixture, nextFixture) {
                var sid = fixture.session_id;
                var data = fixture.data;

                sessionStore.destroy(sid, function(err) {
                    expect(err).to.be.null();
                    nextFixture();
                });
            }, done);
        });
    });
});
