/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TAB_VW_IDATA_ARGUMENTS', {
    serialNo: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: 0
    },
    devId: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    devName: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    arguName: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    arguData: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'TAB_VW_IDATA_ARGUMENTS'
  });
};
