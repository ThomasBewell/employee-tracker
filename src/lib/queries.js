const path = require('path');
const fs = require('fs');

const queries = {
    viewAllEmployees: fs.readFileSync(path.join(__dirname, '../db/viewAllEmployees.sql')).toString(),
    viewAllDepartments: fs.readFileSync(path.join(__dirname, '../db/viewAllDepartments.sql')).toString(),
    viewAllRoles: fs.readFileSync(path.join(__dirname, '../db/viewAllRoles.sql')).toString(),
    viewAllManagers: fs.readFileSync(path.join(__dirname, '../db/viewAllManagers.sql')).toString(),
    addEmployee: fs.readFileSync(path.join(__dirname, '../db/addEmployee.sql')).toString(),
    addDepartment: fs.readFileSync(path.join(__dirname, '../db/addDepartment.sql')).toString(),
    addRole: fs.readFileSync(path.join(__dirname, '../db/addRole.sql')).toString(),
    updateEmployeeRole: fs.readFileSync(path.join(__dirname, '../db/updateEmployeeRole.sql')).toString(),
}