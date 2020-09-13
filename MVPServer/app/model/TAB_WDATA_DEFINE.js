/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TAB_WDATA_DEFINE', {
    serialNo: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    wId: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    dataType: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    fieldName: {
      type: DataTypes.STRING(20),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'TAB_WDATA_DEFINE'
  });
};
