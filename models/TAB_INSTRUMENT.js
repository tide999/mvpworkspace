/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TAB_INSTRUMENT', {
    devId: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    devName: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    proDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    useUnit: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    parseFile: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    remarks: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'TAB_INSTRUMENT'
  });
};
