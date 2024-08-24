const developmentData = require('../data/development-data/index.js');
const testData = require('../data/test-data/index.js');
const seed = require('./seed.js');
const db = require('../connection.js');

const success = () => { console.log('   ----- >>> Seeding Finished <<< -----   '); };

const runSeed = () => {
    return seed(developmentData).then(() =>
        db.end()).then(() => 
        success());
};

runSeed();