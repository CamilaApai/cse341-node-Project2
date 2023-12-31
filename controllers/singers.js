const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// Get the entire singers collection.
async function getAllSingers(req, res) {
  try {
    const result = await mongodb.getDb().db().collection('singers').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (err) {
    console.error('Error retrieving singers:', err);
    return res.status(500).json({ error: 'An internal server error occurred while retrieving the singers.' });
  }
}

// Get a single singer from the singers collection by id.
async function getSingleSinger(req, res) {
  try {
    const singerId = req.params.id;
    if (!ObjectId.isValid(singerId)) {
      return res.status(400).json({ error: 'Invalid singer id.' });
    }
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('singers').find({ _id: userId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  } catch (err) {
    console.error('Error retrieving the singer:', err);
    return res.status(500).json({ error: 'An internal server error occurred while retrieving the singer.' });
  }
}

// Add a new singer to the singers collection.
async function addSinger(req, res) {
  try {
    if (!req.body.firstName || !req.body.lastName || !req.body.age || !req.body.birthday ||
      !req.body.birthYear || !req.body.birthTown || !req.body.country) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
    const singer = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      age: req.body.age,
      birthday: req.body.birthday,
      birthYear: req.body.birthYear,
      birthTown: req.body.birthTown,
      country: req.body.country
    };
    const response = await mongodb.getDb().db().collection('singers').insertOne(singer);
    if (response.acknowledged) {
      res.status(201).json({
        message: 'singer created successfully.', singerId: response.insertedId,
      });
    } else {
      res.status(500).json({ error: 'An internal server error occurred while creating the singer.' });
    }
  } catch (err) {
    console.error('Error adding singer:', err);
    res.status(500).json({ error: 'An internal server error occurred.' });
  }
}

// Update one of the singers from the singers collection by id.
async function updateSinger(req, res) {
  try {
    if (!req.body.firstName || !req.body.lastName || !req.body.age || !req.body.birthday ||
      !req.body.birthYear || !req.body.birthTown || !req.body.country) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
    const userId = new ObjectId(req.params.id);
    const singer = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      age: req.body.age,
      birthday: req.body.birthday,
      birthYear: req.body.birthYear,
      birthTown: req.body.birthTown,
      country: req.body.country
    };
    const response = await mongodb.getDb().db().collection('singers').replaceOne({ _id: userId }, singer);
    if (response.modifiedCount > 0) {
      return res.status(204).json({ message: 'Singer updated successfully.' });
    } else {
      res.status(200).json({ message: 'The singer data was not updated.' });
    }
  } catch (err) {
    console.error('Error updating singer:', err);
    return res.status(500).json({ error: 'An internal server error occurred while updating the singer.' });
  }
}

// Delete a singer from the singers collection by id.
async function deleteSinger(req, res) {
  try {
    const singerId = req.params.id;
    if (!ObjectId.isValid(singerId)) {
      return res.status(400).json({ error: 'Invalid singer id.' });
    }
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('singers').remove({ _id: userId }, true);
    if (response.deletedCount > 0) {
      return res.status(200).json({ message: 'singer deleted successfully.' });
    } else {
      res.status(404).json({ error: 'The singer was not found.' });
    }
  } catch (err) {
    console.error('Error deleting singer:', err);
    return res.status(500).json({ error: 'An internal server error occurred while updating the singer.' });
  }
}


module.exports = { getAllSingers, getSingleSinger, addSinger, updateSinger, deleteSinger };