/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TAB_CONTROL', {
    timeTag: {
      type: DataTypes.DATE,
      allowNull: false
    },
    sourceId: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    cmdId: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    cmdContent: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'TAB_CONTROL'
  });
};
