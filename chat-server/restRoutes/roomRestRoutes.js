const express = require('express');
const roomRouter = new express.Router();

const roomModel = require('../models/Room');

// Get all Rooms
roomRouter.get('/', (req, res) => {
  roomModel.getAll().then(result => {
    res.json(result);
  })
  .catch(error => {
    res.status(500).send(err);
  })
});

// Get all Rooms
roomRouter.post('/', (req, res) => {
    console.log(req.body);
    const newRoomName = req.body.roomname;
    console.log(`newRoomName: ${newRoomName}`);
    roomModel.addRoom(newRoomName).then(result => {
      res.json(result);
    })
    .catch(error => {
      res.status(500).send(error);
    })
  });


module.exports = roomRouter;