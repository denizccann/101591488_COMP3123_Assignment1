const Employee = require('../models/Employee');
exports.getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find({ user: req.user.userId });
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};
exports.createEmployee = async (req, res) => {
    try {
        const newEmployee = new Employee({
            ...req.body,
            user: req.user.userId
        });

        await newEmployee.save();
        res.status(201).json({ message: 'Employee created successfully.', employee_id: newEmployee._id });
    } catch (error) {
        res.status(400).json({ message: 'Failed to create employee.', error: error.message });
    }
};
exports.getEmployeeById = async (req, res) => {
    try {
        const employee = await Employee.findOne({ _id: req.params.eid, user: req.user.userId });
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found.' });
        }
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

exports.updateEmployee = async (req, res) => {
    try {
        const updatedEmployee = await Employee.findOneAndUpdate(
            { _id: req.params.eid, user: req.user.userId },
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedEmployee) {
            return res.status(404).json({ message: 'Employee not found or unauthorized.' });
        }
        res.status(200).json({ message: 'Employee details updated successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

exports.deleteEmployee = async (req, res) => {
    try {
        const employeeId = req.query.eid;
        if (!employeeId) {
            return res.status(400).json({ message: 'Employee ID (eid) is required.' });
        }

        const deletedEmployee = await Employee.findOneAndDelete({ _id: employeeId, user: req.user.userId });
        if (!deletedEmployee) {
            return res.status(404).json({ message: 'Employee not found or unauthorized.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};