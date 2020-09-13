/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TAB_SYSTEM_DEFINE', {
    dptId: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    dptName: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    dptType: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    },
    dptStatus: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    }
  }, {
      freezeTableName: true, 
      timestamps: false
  },{
    sequelize,
    tableName: 'TAB_SYSTEM_DEFINE'
  });
};
