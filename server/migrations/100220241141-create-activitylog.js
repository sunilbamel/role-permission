'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('activity_logs', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            user_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: "admins",
                    key: 'id',
                    as: "user_id"
                },
                onUpdate: "CASCADE",
                onDelete: "RESTRICT"
            },
            ip_address: {
                type: Sequelize.STRING
            },
            payload: {
                type: Sequelize.TEXT
            },
            response: {
                type: Sequelize.TEXT,
                defaultValue: null
            },
            type: {
                type: Sequelize.STRING
            },
            status: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('activity_logs');
    }
};