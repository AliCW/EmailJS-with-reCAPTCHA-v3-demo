const {
    findEmailJSType
} = require('../model/model.js');

const listEmailJSType = (request, response, next) => {
    findEmailJSType(request.query).then((types) => {
        response.status(200).send({type: types})
    })
    .catch(next);
};

module.exports = {
    listEmailJSType,
};