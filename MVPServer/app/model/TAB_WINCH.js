/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TAB_WINCH', {
    wId: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    wName: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    wModel: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    serialNo: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    proDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    useUnit: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    remarks: {
      type: DataTypes.STRING(200),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'TAB_WINCH'
  });
};
