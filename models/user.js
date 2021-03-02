const conn = require('./connection');

const create = async (name, email, password, role) => {
    const { insertedId } = await conn().then(
        (db) => db.collection('users').insertOne({ email, name, password, role }),
    );
    return {
        id: insertedId,
        name,
        email,
        password,
        role: role || 'user',
    };
};

const getByEmail = (email) => conn().then((db) => db.collection('users').findOne({ email }));

module.exports = {
    create,
    getByEmail,
};
