import { Router } from 'express';
import { USER_ROLES } from '../constants/constants.js';
import verifyAuth from '../middleware/authorize.js';
import AppointmentController from '../controllers/appointment.controller.js';

const router = Router();

router.get('/', verifyAuth([USER_ROLES.USER]), AppointmentController.getUserAppointments);
router.post('/', verifyAuth([USER_ROLES.USER]), AppointmentController.makeAppointment);
router.put('/:id', verifyAuth([USER_ROLES.USER]), AppointmentController.updateAppointment);
router.delete('/:id', verifyAuth([USER_ROLES.USER]), AppointmentController.deleteAppointment);

export default router;
