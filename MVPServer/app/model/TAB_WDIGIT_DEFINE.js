/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TAB_WDIGIT_DEFINE', {
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
    dataIndex: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    dataValue: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    dataDescription: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'TAB_WDIGIT_DEFINE'
  });
};
