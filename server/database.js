
import { Sequelize } from "sequelize";


const sequelize = new Sequelize({
    

  });
  

  sequelize
  .authenticate()
  .then(() => {
    console.log('Successfully connected to the database.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error.message);
  });

export default sequelize;