const { app } = require('./app');
const dotenv = require('dotenv');

//Utils
const { db } = require('./utils/dababase');
const { initModels } = require('./utils/initModels');
// const { initModels } = require('./utils/initModels')

db.authenticate()
  .then(() => console.log('Database authenticated'))
  .catch((err) => console.log(err));

// Models relations

initModels();

db.sync()
  .then(() => console.log('Database synced'))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(
    `This movie server is running in Port ${PORT}`
  );
});
