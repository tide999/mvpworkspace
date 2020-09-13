/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TAB_ORIGINAL_REALTIME', {
    timeTag: {
      type: DataTypes.DATE,
      allowNull: false,
      primaryKey: true
    },
    devId: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    datas: {
      type: DataTypes.STRING(200),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'TAB_ORIGINAL_REALTIME'
  });
};
