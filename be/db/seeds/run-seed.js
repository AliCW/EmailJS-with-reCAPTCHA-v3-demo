const emailJS = require('../data/development-data/index.js');
const seed = require('./seed.js');
const db = require('../connection.js');

const success = () => { console.log('   ----- >>> Seeding Finished <<< -----   '); };

const runSeed = () => {
    return seed(emailJS).then(() =>
        db.end()).then(() => 
        success());
};

runSeed();