import Appointment from '../models/appointment.model.js'; // Adjust the path as necessary
import { getUsers } from './user.service.js';

// Get all appointments
export const getAllAppointments = async () => {
  try {
    const appointments = await Appointment.find().populate('user', 'fullName');
    return appointments.map((appointment) => {
      const appointmentObj = appointment.toObject();
      return {
        ...appointmentObj,
        doctorName: appointment.schedule.doctor.fullName,
        hospital: appointment.schedule.hospital
      };
    });
  } catch (error) {
    throw new Error('Error fetching appointments: ' + error.message);
  }
};

// Function to get all Chart Data
export const getAppointmentStats = async () => {
  try {
    console.log('getAppointmentStats');

    const result = await Appointment.aggregate([
      // Join with the user model to get gender information
      {
        $lookup: {
          from: 'users', // Assuming the user collection is named 'users'
          localField: 'user',
          foreignField: '_id',
          as: 'userDetails'
        }
      },
      { $unwind: '$userDetails' },

      // Filter for users with role 'user'
      { $match: { 'userDetails.role': 'user' } },

      // Extract year and month from createdAt, and format them as "YY/MM"
      {
        $group: {
          _id: {
            formattedDate: {
              $concat: [
                { $toString: { $mod: [{ $year: '$createdAt' }, 100] } }, // Year in "YY" format
                '/',
                {
                  $cond: [
                    { $lt: [{ $month: '$createdAt' }, 10] },
                    { $concat: ['0', { $toString: { $month: '$createdAt' } }] },
                    { $toString: { $month: '$createdAt' } }
                  ]
                } // Month with leading zero if necessary
              ]
            }
          },
          totalAppointments: { $sum: 1 },
          maleCount: {
            $sum: {
              $cond: [
                {
                  $or: [
                    { $eq: ['$userDetails.gender', 'male'] },
                    { $eq: ['$userDetails.gender', 'Male'] }
                  ]
                },
                1,
                0
              ]
            }
          },
          femaleCount: {
            $sum: {
              $cond: [
                {
                  $or: [
                    { $eq: ['$userDetails.gender', 'female'] },
                    { $eq: ['$userDetails.gender', 'Female'] }
                  ]
                },
                1,
                0
              ]
            }
          },
          hospitalAppointments: {
            $push: {
              hospital: '$schedule.hospital',
              count: 1
            }
          }
        }
      },
      // Sort by formatted date
      { $sort: { '_id.formattedDate': 1 } }
    ]);

    // Group by hospital name and count appointments
    result.forEach((entry) => {
      const hospitalCounts = entry.hospitalAppointments.reduce((acc, curr) => {
        acc[curr.hospital] = (acc[curr.hospital] || 0) + curr.count;
        return acc;
      }, {});
      entry.hospitalAppointments = hospitalCounts;
    });

    // Get the total patient count
    const totalPatients = await getUsers('user').then((users) => users.length);

    console.log('result', result);
    console.log('totalPatients: ', totalPatients);

    return { stats: result, totalPatients: totalPatients || 0 };
  } catch (error) {
    throw new Error('Error fetching appointment stats: ' + error.message);
  }
};
