import mongoose, { Schema } from 'mongoose';
import { USER_ROLES } from '../../constants/constants.js';
import User from './user.model.js';

const DoctorSchema = new Schema({
  specialization: {
    type: String,
    required: [true, 'Specialization is required']
  },
  hospitalDetails: [
    {
      hospital: {
        type: String,
        required: [true, 'Hospital name is required']
      },
      location: {
        type: String,
        required: [true, 'Location is required']
      },
      arrivalTimes: [
        {
          dayOfWeek: {
            type: String,
            enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            required: [true, 'Day of the week is required']
          },
          time: {
            type: String,
            required: [true, 'Start time is required']
          }
        }
      ],
      bookingFee: {
        type: Number,
        required: [true, 'Booking fee is required']
      }
    }
  ]
});

const Doctor = User.discriminator(USER_ROLES.DOCTOR, DoctorSchema);

export default Doctor;

// export default mongoose.models.User.discriminator(USER_ROLES.DOCTOR, DoctorSchema);
