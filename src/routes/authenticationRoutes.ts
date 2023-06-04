import { authentication } from './../controllers/UserController.js';
import { phoneNumberVerification } from '../controllers/CellPhoneNumberController.js';
import express from 'express';

const authenticationRoute = express.Router();

authenticationRoute.post('/authentication', phoneNumberVerification, authentication);

export default authenticationRoute;
