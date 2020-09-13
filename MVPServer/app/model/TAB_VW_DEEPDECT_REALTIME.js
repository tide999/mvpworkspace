/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TAB_VW_DEEPDECT_REALTIME', {
    timeTag: {
      type: DataTypes.DATE,
      allowNull: false
    },
    oceanDeep: {
      type: DataTypes.FLOAT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'TAB_VW_DEEPDECT_REALTIME'
  });
};
