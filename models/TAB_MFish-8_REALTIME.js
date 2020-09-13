/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TAB_MFish-8_REALTIME', {
    timeTag: {
      type: DataTypes.DATE,
      allowNull: false,
      primaryKey: true
    },
    devStatus: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      defaultValue: 0
    },
    devDeep: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    devSpeed: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    dataTemp: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    dataConv: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    dataP: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    dataSal: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    dataSV: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    dataPH: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    dataZ: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    dataY: {
      type: DataTypes.FLOAT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'TAB_MFish-8_REALTIME'
  });
};
