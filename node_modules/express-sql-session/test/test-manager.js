var async = require('async');
var sessionStore = require('./session-store');
var fixtures = require('./fixtures/sessions');

exports.setUp = function(done) {
    sessionStore.ensureTable(function(err) {
        if(err) {
            return done(new Error(err));
        }
        else {
            return done();
        }
    });
};

exports.hasTable = function(done) {
    sessionStore.knex.schema.hasTable(sessionStore.table)
        .then(function(exists) {
            done(null, exists);
        })
        .catch(function(err) {
            done(new Error(err));
        });
};

exports.tearDown = function(done) {
    exports.hasTable(function(err, exists) {
        if(err) {
            return done(err);
        }

        if(!exists) {
            return done();
        }

        sessionStore.knex.schema.dropTable(sessionStore.table)
            .then(function() {
                done();
            })
            .catch(function(err) {
                done(new Error(err));
            });
    });
};

exports.populateSessions = function(done) {
    async.each(fixtures, function(fixture, nextFixture) {
        var sid = fixture.session_id;
        var data = fixture.data;
        sessionStore.set(sid, data, nextFixture);
    }, function(err) {
        if(err) {
            done(new Error(err));
        }
        else {
            done();
        }
    });
};

exports.clearSessions = function(done) {
    exports.tearDown(function(err) {
        if(err) {
            return done(err);
        }

        exports.setUp(function(err) {
            if(err) {
                return done(err);
            }
            else {
                done();
            }
        });
    });
};
