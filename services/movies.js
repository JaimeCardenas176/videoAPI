//const { moviesMock } = require('../utils/mocks/movies');
const MongoLib = require('../lib/mongo')

class MoviesService {
    constructor() {
        this.collection = 'movies';
        this.mongoDb = new MongoLib();
    }
    async getMovies({ tags }) {
        const query = tags && { tags: { $in: tags }};
        const movies = await this.mongoDb.getAll(this.collection, query);
        return movies || [];
    }

    async getMovie({ movieId }) {

        const movie = await this.mongoDb.getOne(this.collection, movieId);
        return movie || {};
    }

    async createMovie({ movie }) {
        const createdMovieId = await this.mongoDb.create(this.collection, movie);
        return createdMovieId;
    }

    async updateMovie({ movieId, movie} = {}) {
        const updatedMovieId = await this.mongoDb.update(this.collection, movieId, movie);
        return updatedMovieId;
    }

    async deleteMovie({ movieId }) {
        const deletedMovieId = await this.mongoDb.delete(this.collection, movieId);
        return deletedMovieId;
    }
}

module.exports = MoviesService;