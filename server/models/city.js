const city = (sequelize, DataTypes) => {
  const City = sequelize.define('city', {
    name: { type: DataTypes.STRING, allowNull: false },
    males: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    females: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    total: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  });

  City.beforeCreate((city) => {
    city.total = Number.parseInt(city.males, 10) + Number.parseInt(city.females, 10);
  });

  City.associate = models => {
    City.belongsTo(models.State, {
      foreignKey: 'stateId',
      onDelete: 'CASCADE',
    });
  }

  return City;
}

export default city;