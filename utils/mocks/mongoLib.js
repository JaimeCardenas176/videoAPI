const sinon = require('sinon');

const { moviesMock, filteredMoviesMock } = require('./movies');

const getAllStub = sinon.stub();
//console.log(sinon);
console.log(sinon.stub());
getAllStub.withArgs('movies').resolves(moviesMock);

const tagQuery = { tags: { $in: ['Drama'] } };
getAllStub.withArgs('movies', tagQuery).resolves(filteredMoviesMock('Drama'));

const createStub = sinon.stub().resolves(moviesMock[0].id);

class MongoLibMock {
    getAll(Collection, query) {
        return getAllStub(Collection, query);
    }
    create(collection, data) {
        return createStub(collection, data);
    }
}

module.exports = {
    getAllStub,
    createStub,
    MongoLibMock
}