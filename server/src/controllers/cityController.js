import models from '../../models';

const createCity = (req, res) => {
  const { 
    name, males, females, stateId
  } = req.body;

  return models.City.findOrCreate({
    where: { name },
    defaults: {
      males,
      females,
      stateId,
    },
  }).then(([city, created]) => {
    if (!created) {
      return res.status(400).json({
        message: 'City already exit'
      });
    }

    return res.status(201).json({
      data: city,
      message: 'City created successfully'
    });
  }).catch((err) => {
    /* istanbul ignore next */
    return res.status().json({
      message: 'Error occur while creating city',
      error: err
    });
  });  
}

const getAllCities = (req, res) => {
  return models.City.findAll({
    include: [models.State],
  }).then(city => {
    return res.status(200).json({
      message: 'Cities successfully retrieved',
      data: city
    })
  }).catch((err) => {
    /* istanbul ignore next */
    return res.status(400).json({
      message: 'Error occur while retrieving cities',
      error: err
    });
  })
}

const updateCity = (req, res) => {
  const { cityId } = req.params;
  const {
    name, males, females, stateId,
  } = req.body;

  return models.City.findAll({
    where: {
      id: cityId,
    },
  }).then((city) => {
    if (city.length < 1) {
      return res.status(404).json({
        message: 'City not found',
        data: city
      });
    }

    const numOfMales = males || city[0].males
    const numOfFemales = males || city[0].females;
    const total = numOfMales + numOfFemales;

    return models.City.update({
      name: name || city[0].name,
      males: numOfMales || city[0].males,
      females: numOfFemales || city[0].females,
      stateId: stateId || city[0].stateId,
      total
    }, {
        returning: true,
        where: { id: cityId },
      }).then(updatedCity => {
        return res.status(200).json({
          message: 'City successfully updated',
          data: updatedCity
        })
      }).catch((err) => {
        /* istanbul ignore next */
        return res.status(400).json({
          message: 'Error ocurred while updating city',
          error: err
        })
      });
  }).catch((err) => {
    /* istanbul ignore next */
    return res.status(400).json({
      message: 'Error occurred while retrieving the city',
      error: err
    });
  });
}

const deleteCity = (req, res) => {
  const { cityId } = req.params;

  return models.City.findAll({
    where: { id: cityId }
  }).then((city) => {
    if (city.length < 1) {
      return res.status(404).json({
        message: 'City not found',
        data: city
      });
    }

    return models.City.destroy({
      where: { id: cityId },
    }).then(() => {
      return res.status(200).json({
        message: 'City successfully deleted',
        data: city
      });
    }).catch((err) => {
      /* istanbul ignore next */
      return res.status(res).json({
        message: 'Error occurred while deleting city',
        error: err
      });
    });
  }).catch((err) => {
    /* istanbul ignore next */
    return res.status(res).json({
      message: 'Error occur while retrieving the city',
      error: err
    });
  });  
}

const cityController = {
  deleteCity,
  updateCity,
  createCity,
  getAllCities
}

export default cityController