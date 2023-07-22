const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// Get the entire Albums collection.
async function getAllAlbums(req, res) {
  try {
    const result = await mongodb.getDb().db().collection('albums').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (err) {
    console.error('Error retrieving albums:', err);
    return res.status(500).json({ error: 'An internal server error occurred while retrieving the albums.' });
  }
}

// Get a single album from the Albums collection by id.
async function getSingleAlbum(req, res) {
  try {
    const albumId = req.params.id;
    if (!ObjectId.isValid(albumId)) {
      return res.status(400).json({ error: 'Invalid album id.' });
    }
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('albums').find({ _id: userId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  } catch (err) {
    console.error('Error retrieving the album:', err);
    return res.status(500).json({ error: 'An internal server error occurred while retrieving the album.' });
  }
}

// Add a new album to the Albums collection.
async function addAlbum(req, res) {
  try {
    if (!req.body.artist || !req.body.albumAmount || !req.body.firstAlbum || !req.body.lastAlbum ||!req.body.mostSuccessfulAlbum) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
    const album = {
      artist: req.body.artist,
      albumAmount: req.body.albumAmount,
      firstAlbum: req.body.firstAlbum,
      lastAlbum: req.body.lastAlbum,
      mostSuccessfulAlbum: req.body.mostSuccessfulAlbum
    };
    const response = await mongodb.getDb().db().collection('albums').insertOne(album);
    if (response.acknowledged) {
      res.status(201).json({
       message: 'album created successfully.', albumId: response.insertedId,
      });
    } else {
      res.status(500).json({ error: 'An internal server error occurred while creating the album.' });
    }
  } catch (err) {
    console.error('Error adding album:', err);
    res.status(500).json({ error: 'An internal server error occurred.' });
  }
}

// Update one of the Albums from the Albums collection by id.
async function updateAlbum(req, res) {
  try {
    if (!req.body.artist || !req.body.albumAmount || !req.body.firstAlbum || !req.body.lastAlbum ||!req.body.mostSuccessfulAlbum) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
    const userId = new ObjectId(req.params.id);
    const album = {
      artist: req.body.artist,
      albumAmount: req.body.albumAmount,
      firstAlbum: req.body.firstAlbum,
      lastAlbum: req.body.lastAlbum,
      mostSuccessfulAlbum: req.body.mostSuccessfulAlbum
    };
    const response = await mongodb.getDb().db().collection('albums').replaceOne({ _id: userId }, album);
    if (response.modifiedCount > 0) {
      return res.status(204).json({message: 'Album updated successfully.' });
    } else {
      res.status(200).json({message: 'The album data was not updated.' });
    }
  } catch (err) {
    console.error('Error updating album:', err);
    return res.status(500).json({ error: 'An internal server error occurred while updating the album.' });
  }
}

// Delete a album from the Albums collection by id.
async function deleteAlbum(req, res) {
  try {
    const albumId = req.params.id;
    if (!ObjectId.isValid(albumId)) {
      return res.status(400).json({ error: 'Invalid album id.' });
    }
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('albums').remove({ _id: userId }, true);
    if (response.deletedCount > 0) {
      return res.status(200).json({message: 'album deleted successfully.' });
    } else {
      res.status(404).json({ error: 'The album was not found.' });
    }
  } catch (err) {
    console.error('Error deleting album:', err);
    return res.status(500).json({ error: 'An internal server error occurred while updating the album.' });
  }
}


module.exports = { getAllAlbums, getSingleAlbum, addAlbum, updateAlbum, deleteAlbum };