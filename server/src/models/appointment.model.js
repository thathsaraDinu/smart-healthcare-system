import mongoose, { Schema } from 'mongoose';

export const AppointmentSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    appointmentNumber: {
      type: Number,
      default: 1
    },
    patientName: {
      type: String,
      required: [true, 'Patient name is required']
    },
    email: {
      type: String,
      required: [true, 'Email is required']
    },
    phoneNumber: {
      type: String,
      required: [true, 'Phone number is required']
    },
    area: {
      type: String,
      required: [true, 'Area is required']
    },
    nic: {
      type: String,
      required: [true, 'NIC is required']
    },
    ispaid: {
      type: Boolean,
      default: true,
      default: false
    },
    schedule: {
      doctor: {
        fullName: {
          type: String,
          required: [true, 'Full name is required']
        },
        gender: {
          type: String,
          required: [true, 'Gender is required']
        },
        specialization: {
          type: String,
          required: [true, 'Specialization is required']
        }
      },
      hospital: {
        type: String,
        required: [true, 'Hospital name is required']
      },
      location: {
        type: String,
        required: [true, 'Location is required']
      },
      bookingFee: {
        type: Number,
        required: [true, 'Booking fee is required']
      },
      date: {
        type: String,
        required: [true, 'Date fee is required']
      },
      time: {
        type: String,
        required: [true, 'Time fee is required']
      }
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model.Appointments || mongoose.model('Appointment', AppointmentSchema);
