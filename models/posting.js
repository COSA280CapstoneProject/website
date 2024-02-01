module.exports = (sequelize, DataTypes) => {
    const Posting = sequelize.define('Posting', {
        jobTitle: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true, // Make sure the job title is not empty
                len: [1, 255] // Job title length restrictions if necessary
            }
        },
        jobDetails: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: true // Make sure the job details are not empty
            }
        },
        targetAudience: {
            type: DataTypes.STRING,
            allowNull: true, // This can be null if they don't want to specify a target audience
        },
        skillsEducation: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: true // Make sure the skills and education field is not empty
            }
        },
        applicationMethod: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: true, // Make sure there is an application method provided
                isUrl: true // Checks for url format (assuming hyperlink is provided as a part of the application method)
            }
        }
    }, {
        // Model options
        timestamps: true, // Adds createdAt and updatedAt timestamps
    });

    return Posting;
};
