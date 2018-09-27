'use strict';
const bcrypt = require('bcrypt-nodejs');
const config = require('../config/config.json')['system'];

module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define('user', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6, 120],
          msg: "Email address must be between 6 and 120 characters in length"
        },
        isEmail: {
          msg: "Email address must be valid"
        },
        isUnique: function (value, next) {
          var self = this;
          user.find({
            where: { email: value },
            attributes: ['id']
          }).done(function (user, error) {
            if (error) {
              return next(error);
            }
            else if (user) {
              if (user && self.email !== user.email) {
                return next('Email address already in use!');
              }
            }
            next();
          });
        }
      }
    },
    contact_number: DataTypes.INTEGER,
    password_hash: DataTypes.STRING
  }, {
      instanceMethods: {
        generateHash: function (password) {
          return bcrypt.hashSync(password, bcrypt.genSaltSync(config.salt), null);
        },
        validPassword: function (password, user) {
          return bcrypt.compareSync(password, user.password_hash)
        },
        getFullname: function () {
          return [this.firstname, this.lastname].join(' ');
        }
      }
    });

  user.associate = function (models) {
    // associations can be defined here
  };

  user.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(config.salt), null);
  }
  return user;
};