import { DB_CONF } from './consts';

import { Sequelize } from 'sequelize';
const connection = new Sequelize(DB_CONF['MYSQL_DB'], DB_CONF['MYSQL_USER'], DB_CONF['MYSQL_PASS'], {
    host: DB_CONF['MYSQL_HOST'],
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