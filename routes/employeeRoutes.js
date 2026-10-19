const express = require('express');
const employeeController = require('../controllers/employeeController');
const auth = require('../middleware/auth');

const router = express.Router();
router.use(auth);

router.get('/employees', employeeController.getAllEmployees);
router.post('/employees', employeeController.createEmployee);
router.get('/employees/:eid', employeeController.getEmployeeById);
router.put('/employees/:eid', employeeController.updateEmployee);
router.delete('/employees', employeeController.deleteEmployee);

module.exports = router;