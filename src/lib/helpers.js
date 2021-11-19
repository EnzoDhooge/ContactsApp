require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const helpers = {};

helpers.encryptPassword = async(password) => {
    const salt = await bcrypt.genSaltSync(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
};

helpers.matchPassword = async(password, savedPassword) => {
    try {
        return await bcrypt.compareSync(password, savedPassword);
    } catch (error) {
        console.log(error);
    }
};

helpers.encryptJwt = (contacts) => {
    contacts.forEach((e) => {
        const token = jwt.sign({id: e.id}, process.env.SECRET_JWT);
        e.id = token;
    });
};

helpers.decryptJwt = (token) => {

    try {

        if (!token) {
            return false;
        }
    
        const decoded = jwt.verify(token, process.env.SECRET_JWT);
        return decoded.id;

    } catch (error) {
        return false;
    }
    
};


module.exports = helpers;