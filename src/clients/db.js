import dotenv from 'dotenv'
dotenv.config({ path: `.env.${process.env.NODE_ENV.trim() || 'dev'}` })

import { Sequelize } from 'sequelize';
const connection = new Sequelize(process.env.MYSQL_DB, process.env.MYSQL_USER, process.env.MYSQL_PASS, {
    host: process.env.MYSQL_HOST,
    dialect: "mysql",
    operatorsAliases: 0,
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    logging: (response, connection) => {
        // console.log(response)
    },
    //   dialectOptions: {
    //     socketPath: "/var/run/mysqld/mysqld.sock"
    //   },
    //   define: {
    //     paranoid: true
    //   }
});

export default connection;