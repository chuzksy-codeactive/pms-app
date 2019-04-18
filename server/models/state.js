const state = (sequelize, DataTypes) => {
  const State = sequelize.define('state', {
    name: { type: DataTypes.STRING }
  });

  State.associate = models => {
    State.hasMany(models.City, {
      foreignKey: 'stateId'
    });
  }

  return State;
}

export default state;