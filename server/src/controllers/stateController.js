import models from '../../models';

const createState = (req, res) => {
  const { name } = req.body;
  return models.State.findOrCreate({
    where: {
      name,
    },
  }).then(([state, created]) => {
    if(!created) {
      return res.status(400).json({
        message: 'State details already exist',
      });
    }

    return res.status(201).json({
      message: 'State successfully created',
      data: state
    })
  }).catch((err) => {
    /* istanbul ignore next */
    return res.status(400).json({
      message: 'Error occur while creating state',
      error: err
    })
  });
}

const getAllStates = (req, res) => {
  return models.State.findAll({
    include: [models.City],
  }).then((states) => {
    return res.status(200).json({
      message: 'States successfully retrieved',
      data: states
    });
  }).catch((err) => {
    /* istanbul ignore next */
    return res.status(400).json({
      message: 'Error occur while retrieving',
      error: err
    });
  });
}

const updateState = (req, res) => {
  const { stateId } = req.params;
  const { name } = req.body;

  return models.State.findAll({
    where: { id: stateId },
  }).then((state) => {
    if (state.length < 1) {
      return res.status(404).json({
        message: 'State not found'
      })
    }

    return models.State.update({
      name: name || state[0].name
    }, {
      returning: true, where: { id: stateId }
    }).then((updatedState) => {
      return res.status(200).json({
        message: 'State successfully updated',
        data: updatedState
      });
    }).catch((err) => {
      /* istanbul ignore next */
      return res.status(400).json({
        message: 'Error ocurred while updating state',
        error: err
      });
    });
  }).catch((err) => {
    /* istanbul ignore next */
    return res.status(400).json({
      message: 'Error occurred while retrieving the state',
      error: err
    });
  });
}

const deleteState = (req, res) => {
  const { stateId } = req.params;
  return models.State.findAll({
    where: { id: stateId },
  }).then((state) => {
    if (state.length < 1) {
      return res.status(404).json({
        message: 'State can not be found',
        data: state
      });
    }

    return models.State.destroy({
      where: { id: stateId }
    }).then(() => {
      return res.status(200).json({
        message: 'State successfully deleted',
        data: state
      })
    }).catch((err) => {
      /* istanbul ignore next */
      return res.status(res).json({
        message: 'Error occurred while deleting',
        error: err
      })
    });  
  }).catch((err) => {
    /* istanbul ignore next */
    return res.status(res).json({
      message: 'Error occur while retrieving the state',
      error: err
    });
  }); 
}

const stateController = {
  createState,
  getAllStates,
  updateState,
  deleteState
};

export default stateController;