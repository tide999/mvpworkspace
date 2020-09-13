/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TAB_VW_LOCATION_REALTIME', {
    timeTag: {
      type: DataTypes.DATE,
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
    }
  }, {
    sequelize,
    tableName: 'TAB_VW_LOCATION_REALTIME'
  });
};
