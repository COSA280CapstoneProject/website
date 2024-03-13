const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
    const Admin = sequelize.define('Admin', {
        // Define the attributes of the Admin model
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            }
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true,
                len: [4, 20] // Assuming username length should be between 4 and 20 characters
            }
        },
        password_hash: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        }, resetPasswordToken: {
            type: DataTypes.STRING,
            allowNull: true // This field can be empty if the reset token is not set
        },
        resetPasswordExpires: {
            type: DataTypes.DATE,
            allowNull: true // This field can be empty if the reset token is not set
        }
    }, {
        // Model options
        timestamps: true, // Adds createdAt and updatedAt timestamps
        hooks: {
            // Hash the password before saving the Admin model
            beforeCreate: async (admin) => {
                const salt = await bcrypt.genSalt(10);
                admin.password_hash = await bcrypt.hash(admin.password_hash, salt);
            },
            // Hash the password before updating the Admin model
            beforeUpdate: async (admin) => {
                if (admin.changed('password_hash')) {
                    const salt = await bcrypt.genSalt(10);
                    admin.password_hash = await bcrypt.hash(admin.password_hash, salt);
                }
            }
        }
    });

    // Instance method to compare hashed passwords
    Admin.prototype.comparePassword = async function(password) {
        return await bcrypt.compare(password, this.password_hash);
    };

    return Admin;
};
