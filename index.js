const app = require('./app');
const { port } = require('./src/config');

app.listen(port, () => {
  console.log(`App listenning on port ${port}`);
});
