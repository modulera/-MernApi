import { User } from './user';

export const User = User;

import connection from '../clients/db';
// export const connected = async () => await connection.authenticate().catch(error => error)

export default {
  User,
  connected: async () => {
    await connection.authenticate()
      .then(() => console.log('DB connection has been established successfully.'))
      .catch(error => {
        console.error('Unable to connect to the database:')
        throw error
      })
  },
}