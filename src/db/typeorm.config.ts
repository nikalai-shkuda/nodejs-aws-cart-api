import 'tsconfig-paths/register';
import { DataSource } from 'typeorm';
import { DB_CONNECTION_OPTIONS } from './db.connection';

const AppDataSource = new DataSource({
  ...DB_CONNECTION_OPTIONS,
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });

export default AppDataSource;
