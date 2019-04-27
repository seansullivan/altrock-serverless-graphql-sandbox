const DataLoader = require('dataloader');

const createLoaders = ({ db }) => {
    const getTracksById = batches => Promise.resolve(batches.map(ids => ids.map(id => db.get('tracks').find({id}).value())))

    return {
        tracks: new DataLoader(getTracksById)
    };
}

module.exports = createLoaders;
