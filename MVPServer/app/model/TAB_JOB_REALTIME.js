/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TAB_JOB_REALTIME', {
    jobId: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    runTimes: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'TAB_JOB_REALTIME'
  });
};
