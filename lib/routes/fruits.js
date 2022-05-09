'use strict';

const express = require('express');

const router = express.Router();

const validations = require('../validations');
const fruits = require('../api/fruits');

router.get('/fruits/:id', async (request, response) => {
  const { id } = request.params;
  try {
    const result = await fruits.find(id);
    if (result.rowCount === 0) {
      response.status(404);
      return response.send(`Item ${id} not found`);
    }
    return response.send(result.rows[0]);
  } catch (error) {
    response.sendStatus(400);
  }
});

router.get('/fruits', async (_, response) => {
  try {
    const results = await fruits.findAll();
    response.send(results.rows);
  } catch (error) {
    console.log(error);
    response.sendStatus(400);
  }
});

router.post('/fruits', validations.validateCreateUpdateRequest, (request, response) => {
  const { name, stock } = request.body;
  return fruits.create(name, stock).then(result => {
    response.status(201);
    return response.send(result.rows[0]);
  }).catch(error => {
    response.status(400);
    response.send(error);
  });
});

router.put('/fruits/:id', validations.validateCreateUpdateRequest, async (request, response) => {
  const { name, stock } = request.body;
  const { id } = request.params;
  try {
    const result = fruits.update({ name, stock, id });

    if (result.rowCount === 0) {
      response.status(404);

      return response.send(`Unknown item ${id}`);
    }

    return response.sendStatus(204);
  } catch (error) {
    response.status(400);

    response.send(error);
  }
});

router.delete('/fruits/:id', async (request, response) => {
  const { id } = request.params;
  try {
    const result = await fruits.remove(id);

    if (result.rowCount === 0) {
      response.status(404);
      return response.send(`Unknown item ${id}`);
    }

    return response.sendStatus(204);
  } catch (error) {
    response.status(400);
    response.send(error);
  }
});

module.exports = router;
