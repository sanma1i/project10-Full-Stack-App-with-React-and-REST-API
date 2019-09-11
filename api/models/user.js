'use strict';

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {

                notEmpty: {
                    msg: 'First name is required'
                }
            },
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {

                notEmpty: {
                    msg: 'Last name is required'
                }
            },
        },
        emailAddress: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: {
                    msg: 'Please enter a valid email.'
                },
                notEmpty: {
                    msg: 'Email address is required'
                },
            },
            unique: {
                args: true,
                msg: "This e-mail already exists."

            },


        },

        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {

                notEmpty: {
                    msg: 'Password is required'
                }
            },
        }
    }, {});
    User.associate = (models) => {
        models.User.hasMany(models.Course, {
            as: 'user',
            foreignKey: {
                fieldName: 'userId',
                allowNull: false,
            },
        });
    }
    return User;
};