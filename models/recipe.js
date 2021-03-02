const { ObjectId } = require('mongodb');
const conn = require('./connection');

const create = async (name, ingredients, preparation, userId) => {
    const { insertedId } = await conn().then(
        (db) => db.collection('recipes').insertOne({ name, ingredients, preparation, userId }),
    );
    return {
        _id: insertedId,
        name,
        ingredients,
        preparation,
        userId,
    };
};

const getAll = () => conn().then(
    (db) => db.collection('recipes').find().toArray(),
);

const getById = async (id) => conn().then(
    (db) => db.collection('recipes').findOne(ObjectId(id)),
);
const remove = async (id) => conn().then(
    (db) => db.collection('recipes').deleteOne({ _id: ObjectId(id) }),
);

const update = async (id, { name, ingredients, preparation }) => conn().then(
    (db) => db.collection('recipes').findOneAndUpdate(
        { _id: ObjectId(id) }, { $set: { name, ingredients, preparation } },
    ),
);

const upload = async (id, image) => conn().then(
    (db) => db.collection('recipes').findOneAndUpdate({ _id: ObjectId(id) }, { $set: { image } }),
);

module.exports = {
    create,
    getAll,
    getById,
    update,
    remove,
    upload,
};