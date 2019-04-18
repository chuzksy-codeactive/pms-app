import 'dotenv/config';
import Sequelize from 'sequelize';

const dbURL = process.env.NODE_ENV === 'development' ? process.env.PMS_DEV: process.env.PMS_PROD;

const sequelize = new Sequelize(
  dbURL, {
    dialect: 'postgres'
  },
);

const models = {
  City: sequelize.import('./city'),
  State: sequelize.import('./state'),
};

Object.keys(models).forEach(key => {
  if('associate' in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };
export default models;