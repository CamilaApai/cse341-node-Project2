const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// Get the entire Contacts collection.
async function getAllContacts(req, res, next) {
  const result = await mongodb.getDb().db().collection('contacts').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
}

// Get a single Contact from the contacts collection by id.
async function getSingleContact(req, res, next) {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('contacts').find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
}

module.exports = { getAllContacts, getSingleContact };