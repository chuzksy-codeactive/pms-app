import express from 'express';
import stateController from '../controllers/stateController';
import { validateBody, validateParams, schemas } from '../validators/pmsValidator';

const router = express.Router();

router.route('/state')
  .post(validateBody(schemas().createState), stateController.createState)
  .get(stateController.getAllStates);

router.route('/state/:stateId')
  .put(validateParams(schemas().stateParams), stateController.updateState)
  .delete(validateParams(schemas().stateParams), stateController.deleteState);

  export default router;