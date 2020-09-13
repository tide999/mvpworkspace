/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TAB_SHOW_DEFINE', {
    serialNo: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    dptId: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    fieldName: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    dataName: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    dataUnit: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    showInChart: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      defaultValue: 0
    },
    topLeft: {
      type: DataTypes.INTEGER(4),
      allowNull: true,
      defaultValue: 0
    },
    sameAs: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'TAB_SHOW_DEFINE'
  });
};
