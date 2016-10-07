/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var bcrypt = require("bcrypt")

module.exports = {

  attributes: {
    email: {
      type: "email",
      required: true,
      unique: true
    },
    password: {
      type: "string",
      minLength: 6,
      protected: true,
      required: true,
      columnName: "encryptedPassword"
    },

    toJSON: function () {
      var obj = this.toObject();
      delete obj.password;
      return obj;
    }
  },
  validationMessages: {
    password: {
      required: "Password is required"
    },

    email: {
      required: "Email is required",
      email: "Invalid email",
      unique: "Email already registered"
    }
  }

};

