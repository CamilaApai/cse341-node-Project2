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

// Add a new Contact to the contacts collection.
async function addContact(req, res, next) {
  try {
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };
    const response = await mongodb.getDb().db().collection('contacts').insertOne(contact);
    if (response.acknowledged) {
      res.status(201).json({message: 'Contact created successfully.', contactId: response.insertedId,
      });
    } else {
      res.status(500).json({ error: 'An internal server error occurred while creating the contact.' });
    }
  } catch (err) {
    console.error('Error adding contact:', err);
    res.status(500).json({ error: 'An internal server error occurred.' });
  }
}

// Update one of the Contacts from the contacts collection by id.
async function updateContact(req, res, next) {
  try {
    const userId = new ObjectId(req.params.id);
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };
    const response = await mongodb.getDb().db().collection('contacts').replaceOne({ _id: userId }, contact);
    if (response.modifiedCount > 0) {
      return res.status(204).json({ message: 'Contact updated successfully.' });
    } else {
      res.status(200).json({ message: 'The contact data was not updated.' });
    }
  } catch (err) {
    console.error('Error updating contact:', err);
    return res.status(500).json({ error: 'An internal server error occurred while updating the contact.' });
  }
}

// Delete a Contact from the contacts collection by id.
async function deleteContact(req, res, next) {
  try {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('contacts').remove({ _id: userId }, true);
    if (response.deletedCount > 0) {
      return res.status(200).json({ message: 'Contact deleted successfully.' });
    } else {
      res.status(404).json({ error: 'The contact was not found.' });
    }
  } catch (err) {
    console.error('Error deleting contact:', err);
    return res.status(500).json({ error: 'An internal server error occurred while updating the contact.' });
  }
}


module.exports = { getAllContacts, getSingleContact, addContact, updateContact, deleteContact };