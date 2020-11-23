const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const authRouter = require('./routes/admin/auth');
const productsRouter = require('./routes/admin/products');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    keys: ['asffqrqfsca134rhu1re31t4yh45hg2q4']
  })
);
app.use(authRouter);
app.use(productsRouter);

app.listen(3000, () => {
  console.log('Listening');
});


