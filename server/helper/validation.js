const Validator = require('validatorjs')


const validation = (data, rules) => {
    const validation = new Validator(data, rules);
    if(validation.passes()){
        return null;
    }
    if(validation.fails()){
        let getKey = Object.keys(validation.errors.errors)[0];
        return validation.errors.first(getKey);
    }
}

module.exports = validation;