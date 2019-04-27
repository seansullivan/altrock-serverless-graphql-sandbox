const { gql } = require('apollo-server-lambda');

const schema = gql`
    type Query {
        albumByTitle(title: String!): Album
        artistsByHometown(location: String!): [Artist]
        artistsByGenre(genre: Genre): [Artist]
    }


    type Album {
        artist: Artist
        title: String!
        release_date: String!
        tracks: [Track]
    }

    type Artist {
        name: String!
        hometown: String!
        albums: [Album]
        genres: [Genre]
    }

    type Track {
        title: String
    }

    enum Genre {
        grunge
        alternative
        punk
    }
`;

module.exports = schema;
