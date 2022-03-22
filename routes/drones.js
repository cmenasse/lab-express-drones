const express = require('express');
const router = express.Router();

// require the Drone model here
const Drone = require('../models/Drone.model.js')

router.get('/drones', async (req, res, next) => {
  // Iteration #2: List the drones
  // ... your code here
  const drones = await Drone.find()
  res.render('drones/list', {drones})
});

router.get('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  // ... your code here
  res.render("drones/create-form");
});

router.post('/drones/create', async (req, res, next) => {
  // Iteration #3: Add a new drone
  // ... your code here
  const {name, propellers, maxSpeed} = req.body;
  const newDrone = {
    name,
    propellers,
    maxSpeed,
  };
  await Drone.create(newDrone);
  res.redirect("/drones");
});

router.get('/drones/:id/edit', async (req, res, next) => {
  // Iteration #4: Update the drone
  // ... your code here
  const drone = await Drone.findById(req.params.id);
  res.render("drones/update-form", {drone});
});

router.post('/drones/:id/edit', async (req, res, next) => {
  // Iteration #4: Update the drone
  // ... your code here
  const {name, propellers, maxSpeed} = req.body;
  const editedDrone = {
    name,
    propellers,
    maxSpeed,
  };
  await Drone.findByIdAndUpdate(req.params.id, editedDrone);
  res.redirect("/drones");
});

router.post('/drones/:id/delete', async (req, res, next) => {
  // Iteration #5: Delete the drone
  // ... your code here
  await Drone.findByIdAndDelete(req.params.id);
  res.redirect("/drones");
});

module.exports = router;
