import mongoose from 'mongoose';

const UserShema = new mongoose.Schema({
  name: {
    type: String,
    require: false,
  },
  phoneNumber: {
    type: String,
    index: true,
    unique: true,
    require: true,
  },
});

export default mongoose.model('User', UserShema);
