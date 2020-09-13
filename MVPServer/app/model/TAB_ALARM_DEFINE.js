/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TAB_ALARM_DEFINE', {
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
    },
    alarmDescription: {
      type: DataTypes.STRING(200),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'TAB_ALARM_DEFINE'
  });
};
