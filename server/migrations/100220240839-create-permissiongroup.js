'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('permissiongroups', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING
            },
            short_code: {
                type: Sequelize.STRING
            },
            status: {
                type: Sequelize.INTEGER,
                defaultValue: 1
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('permissiongroups');
    }
};