const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcryptjs');;

class User extends Model {}

User.init(
    {
        // keeps track of individual users
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
    //   stores email - must be unique to prevent multiple accounts on one email
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
      },
    //   username is just for display
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    //   password validates to require at least 8 characters
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [8]
        }
      },
    //   stores the id's of attempted challenges
      attemped: {
        type: DataTypes.INTEGER
      },
    //   stores the id's of completed challenges
      passed: {
        type: DataTypes.INTEGER
      }
    },
    {
        // hash's user passwords on creation
        hooks: {
            async beforeCreate (newUserData) {
                const newPass = await bcrypt.hash(newUserData.password, 8);
                newUserData.password = newPass;
                return newPass;
            }
        },
      sequelize,
      freezeTableName: true,
      underscored: true,
      modelName: 'gallery',
    }
  );
  
  module.exports = User;