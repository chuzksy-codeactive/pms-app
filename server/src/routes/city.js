import express from 'express';
import cityController from '../controllers/cityController';
import { validateBody, validateParams, schemas } from '../validators/pmsValidator';

const router = express.Router();

router.route('/city')
  .post(validateBody(schemas().createCity), cityController.createCity)
  .get(cityController.getAllCities);

router.route('/city/:cityId')
  .put(validateParams(schemas().cityParams), cityController.updateCity)
  .delete(validateParams(schemas().cityParams), cityController.deleteCity);

export default router;


