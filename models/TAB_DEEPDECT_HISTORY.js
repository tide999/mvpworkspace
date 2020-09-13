/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TAB_DEEPDECT_HISTORY', {
    timeTag: {
      type: DataTypes.DATE,
      allowNull: false,
      primaryKey: true
    },
    devId: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    oceanDeep: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    content: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'TAB_DEEPDECT_HISTORY'
  });
};
