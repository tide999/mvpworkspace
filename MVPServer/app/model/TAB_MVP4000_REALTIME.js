/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TAB_MVP4000_REALTIME', {
    timeTag: {
      type: DataTypes.DATE,
      allowNull: false,
      primaryKey: true
    },
    devDeep: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    cableOut: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    cableRelease: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    cableSpeed: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    AD1: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    AD2: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    AD3: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    AD4: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    AD5: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    AD6: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    AD7: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    AD8: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    DA1: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    DA2: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    DA3: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    DA4: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    HC1: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    HC2: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    wStatus: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    DI1: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    DI2: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    DI3: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    DI4: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    DO1: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    DO2: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'TAB_MVP4000_REALTIME'
  });
};
