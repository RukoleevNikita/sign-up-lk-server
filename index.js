import express  from 'express';
import mongoose from 'mongoose';
import adminRoute from './adminPanelRoutes.js'
import CardProductModel from './models/CardProduct.js';
import cors from 'cors';
// import { registerValidation, loginValidation } from './validation.js';
// import { UserController } from "./controllers/index.js";
// import { checkAuth, handleValidationErrors} from './utils/index.js';

/*
  "email": "",
  "password": "",
  "fullName": ""
*/
mongoose
  .connect('loginPassword')
  .then(() => console.log('Db is connected'))
  .catch((err) => console.log('Db error', err));

const app = express();
app.use(express.json());
app.use(cors());
// app.use('/signup/uploads', express.static('uploads'));

app.use('/signup', signupRoute);

app.get('/getdate/:id', async (req, res) => {
  try {} catch (err) {
    console.error(err);
    res.status(500).json({
        error: 'Failed to load selected date' 
    });
}
});

app.get('/get-all-dates', async (req, res) => {
  try {} catch (err) {
    console.error(err);
    res.status(500).json({
        error: 'Items not found' 
    });
  }
});

app.listen(4444, (err) => {
  if(err) {
    return console.log(err);
  }
  console.log('Server started');
});

