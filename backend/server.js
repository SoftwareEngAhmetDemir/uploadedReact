const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const compression = require('compression');

// var socketserver = require('./Socket/index')



require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(compression());
app.use(cookieParser());
app.use(cors());

app.use(express.json());
const uri =
  process.env.ATLAS_URI ||
  'mongodb+srv://murat:murat3838@cluster0-2yepv.gcp.mongodb.net/test?authSource=admin&replicaSet=Cluster0-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true';
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('connection MongoDB');
});


const userRouter = require('./routes/user');
const staffRouter = require('./routes/staff');
const estateRouter = require('./routes/estate');
const estatepropsRouter = require('./routes/estateprops');
const cityRouter = require('./routes/city');
const banksRouter = require('./routes/banks');
const uploadImgRouter = require('./routes/uploadImg');
const customerRouter = require('./routes/customers');
const customersGroupsRouter = require('./routes/customersGroups');
const estateCategoryRouter = require('./routes/estate.category');
const contentRouter = require('./routes/content');
const sendmail = require('./routes/sendmail');

app.use(bodyParser.json());

app.use('/customers', customerRouter);
app.use('/customersgroups', customersGroupsRouter);
app.use('/user', userRouter);
app.use('/staff', staffRouter);
app.use('/estate', estateRouter);
app.use('/estateprops', estatepropsRouter);
app.use('/city', cityRouter);
app.use('/banks', banksRouter);
app.use('/uploadimg', uploadImgRouter);
app.use('/estatecategory', estateCategoryRouter);
app.use('/content', contentRouter);
app.use('/sendmail', sendmail);

app.use(express.static(path.join(__dirname, '../build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

app.listen(port, () => {
  console.log('sever is runnin port: ' + port);
});

