/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TAB_JOB', {
    jobId: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    jobName: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    jobMode: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: 5
    },
    setDeep: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    dropTimes: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: 1
    },
    intervalTime: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: 0
    },
    safeDeep: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: 0
    },
    jobStatus: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: 3
    },
    issuedTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'TAB_JOB'
  });
};
