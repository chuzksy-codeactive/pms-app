import Joi from 'joi';

const validateBody = (schema) => {
  return (req, res, next) => {
    const { value, error } = Joi.validate(req.body, schema);

    if (error) {
      return res.status(400).json(error);
    }

    if (!req.value) { req.value = {}; }
    req.value['body'] = value;
    next();
  }
}

const validateParams = (schema) => {
  return (req, res, next) => {
    const { value, error } = Joi.validate(req.params, schema);

    if (error) {
      return res.status(400).json(error);
    }

    if (!req.value) { req.value = {}; }
    req.value['params'] = value;
    next();
  }
}

const schemas = () => ({
  createState: Joi.object().keys({
    name: Joi.string().trim().required(),
  }),
  stateParams: Joi.object().keys({
    stateId: Joi.number().integer().required(),
  }),
  createCity: Joi.object().keys({
    name: Joi.string().trim().required(),
    males: Joi.number().integer().required(),
    females: Joi.number().integer().required(),
    stateId: Joi.number().integer().required()
  }),
  cityParams: Joi.object().keys({
    cityId: Joi.number().integer().required()
  }),
})

export { validateBody, validateParams, schemas };
