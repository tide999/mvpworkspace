/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TAB_ALARM_REALTIME', {
    timeTag: {
      type: DataTypes.DATE,
      allowNull: false
    },
    dptId: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    alarmType: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    alarmValue: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'TAB_ALARM_REALTIME'
  });
};
