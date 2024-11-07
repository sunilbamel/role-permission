'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('rolepermissions', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            role_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: "roles",
                    key: 'id',
                    as: "role_id"
                },
                onUpdate: "CASCADE",
                onDelete: "RESTRICT"
            },
            permission_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: "permissiongroups",
                    key: 'id',
                    as: "permission_id"
                },
                onUpdate: "CASCADE",
                onDelete: "RESTRICT"
            },
            edit:{
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            view:{
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            add:{
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            delete:{
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            super_admin: {
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
        await queryInterface.dropTable('rolepermissions');
    }
};