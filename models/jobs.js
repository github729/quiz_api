'use strict';
module.exports = (sequelize, DataTypes) => {
  var jobs = sequelize.define('jobs', {
    jtiltle: DataTypes.STRING,
    jpostdate: DataTypes.DATE,
    jcname: DataTypes.STRING,
    jlocation: DataTypes.STRING,
    jrole: DataTypes.STRING,
    jeligibility: DataTypes.STRING,
    jlastdate: DataTypes.STRING,
    cwebsite: DataTypes.STRING,
    jexp: DataTypes.STRING,
    jcprofile: DataTypes.STRING,
    jdescription: DataTypes.STRING,
    candidateprofile: DataTypes.STRING,
    requiredskills: DataTypes.STRING,
    jurl: DataTypes.STRING,
    jclogo: DataTypes.STRING
  }, {});
  jobs.associate = function(models) {
    // associations can be defined here
  };
  return jobs;
};