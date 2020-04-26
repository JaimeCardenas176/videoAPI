const assert = require('assert');
const buildMessage = require('../utils/buildMessage');

describe('utils - buildMessage', function() {
    describe('when receives an entity and an action', function() {
        it('should returns the respetive message', function() {
            const result = buildMessage('movie', 'create');
            const expect = 'movie created';
            assert.strictEqual(result, expect);
        });
    });

    describe('when receives an entity and an action is a list', function(){
        it('should returns the respective message with the entity in plurar', function() {
            const result = buildMessage('movie', 'list');
            const expect = 'movies listed';
            assert.strictEqual(result, expect);
        });
    })
});

