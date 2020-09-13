/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TAB_IDATA_ARGUMENTS', {
    serialNo: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    devId: {
      type: DataTypes.STRING(20),
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
    tableName: 'TAB_IDATA_ARGUMENTS'
  });
};
