const resolvers = {
    Query: {
        albumByTitle: (_, { title }, { connections: { db }}) => {
            return db.get('albums').find({title}).value();
        },

        artistsByHometown: (_, { location }, { connections: { db }}) => {
            return db.get('artists').filter({hometown: location}).value();
        },

        artistsByGenre: (_, { genre }, { connections: { db }}) => {
            return db.get('artists').filter(artist => artist.genres.includes(genre)).value();
        }
    },

    Album: {
        artist: (album, _, { connections: { db }}) => {
            return db.get('artists').find({id: album.artist}).value();
        },

        tracks: async (album, _, { loaders }) => await loaders.tracks.load(album.tracks)
    },

    Artist: {
        albums: (artist, _, { connections: { db }}) => {
            return db.get('albums').filter(album => album.artist === artist.id).value();
        }
    }
}

module.exports = resolvers;
