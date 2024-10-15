import mongoose, { Schema } from 'mongoose';

const DoctorSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User reference is required']
    },
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
  },
  {
    timestamps: true
  }
);

export default mongoose.model.Doctor || mongoose.model('Doctor', DoctorSchema);
