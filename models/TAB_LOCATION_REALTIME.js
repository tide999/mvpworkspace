/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TAB_LOCATION_REALTIME', {
    timeTag: {
      type: DataTypes.DATE,
      allowNull: false,
      primaryKey: true
    },
    devId: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    iatitude: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    longitude: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    shipSpeed: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    content: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'TAB_LOCATION_REALTIME'
  });
};
