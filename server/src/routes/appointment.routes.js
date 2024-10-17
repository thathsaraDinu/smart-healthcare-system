import { Router } from 'express';
import AppointmentController from '../controllers/appointment.controller.js';

const router = Router();

router.get('/:id', AppointmentController.getUserAppointments);
router.post('/', AppointmentController.makeAppointment);
router.put('/:id', AppointmentController.updateAppointment);
router.delete('/:id', AppointmentController.deleteAppointment);

export default router;
