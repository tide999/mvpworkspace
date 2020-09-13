/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TAB_REALTIME', {
    timeTag: {
      type: DataTypes.STRING(19),
      allowNull: true
    },
    devStatus: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    },
    devDeep: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    devSpeed: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    dataTemp: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    dataConv: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    dataP: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    dataSal: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    dataSV: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    dataPH: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    dataZ: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    dataY: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    iatitude: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    longitude: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    shipSpeed: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    oceanDeep: {
      type: DataTypes.FLOAT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'TAB_REALTIME'
  });
};
