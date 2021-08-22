const connection = require('../config/config');
const queries = require('./queries');
const consoleTable = require('console.table');
const inquirer = require('inquirer');
const actionsList = require('./actionsList');
const util = require('util');
const { allowedNodeEnvironmentFlags } = require('process');
const { connect } = require('../config/config');
const { deepStrictEqual } = require('assert');
const query = util.promisify(connection.query).bind(connection);

// start app
const start = () => {
    inquirer
        .prompt({
            name: "action",
            type: "rawlist",
            message: "What would you like to do?",
            choices: actionsList.actionsList
        })
        .then((answer) => {
            if (answer.action === 'Quit') {
                quitApp();
            } else {
                switch (answer.action) {
                    case actionsList.actionsList[0]:
                        viewAllEmployees();
                        break;
                    
                    case actionsList.actionsList[1]:
                        viewAllDepartments();
                        break;

                    case actionsList.actionsList[2]:
                        viewAllRoles();
                        break;
                    
                    case actionsList.actionsList[3]:
                        addEmployee();
                        break;

                    case actionsList.actionsList[4]:
                        addDepartment();
                        break;

                    case actionsList.actionsList[5]:
                        addRole();
                        break;

                    case actionsList.actionsList[6]:
                        updateEmployeeRole();
                        break;
                }
            }
        })
}

// Get data
const getRoles = () => {
    return query(queries.viewAllRoles);
}

const getEmployees = () => {
    return query(queries.viewAllEmployees);
}

const getDepartments = () => {
    return query(queries.viewAllDepartments);
}

// View data
const viewAllEmployees = async () => {
    try {
        const rows = await getEmployees();
        console.table(rows);
        start();
    } catch (err) {
        console.log(err);
    }
}

const viewAllDepartments = async () => {
    try {
        const rows = await getDepartments();
        console.table(rows);
        start();
    } catch (err) {
        console.log(err);
    }
}

const viewAllRoles = async () => {
    try {
        const rows = await getRoles();
        console.table(rows);
        start();
    } catch (err) {
        console.log(err);
    }
}

// Add data
const addEmployee = async () => {
    try {
        const promptUser = () => {
            return inquirer
                .prompt([
                    {
                        name: "empFirstName",
                        type: "input",
                        message: "Enter the employee's first name."
                    },
                    {
                        name: "empLastName",
                        type: "input",
                        message: "Enter the employee's last name."
                    },
                    {
                        name: "empManagerYN",
                        type: "rawlist",
                        message: "Is this employee a manager (Y/N)?",
                        choices: ["N", "Y"]
                    },
                    {
                        name: "empRoleId",
                        type: "rawlist",
                        choices: function () {
                            const choiceArray = [];
                            getRoles.forEach((role) => {
                                const roleObj = {
                                    name: role.title,
                                    value: role.id
                                }
                                choiceArray.push(roleObj)
                            })
                            return choiceArray;
                        },
                        message: "Select a role for the employee."
                    },
                    {
                        name: "empManagerId",
                        type: "rawlist",
                        choices: function () {
                            const choiceArray = [];
                            managers.forEach((mgr) => {
                                const mgrObj = {
                                    name: mgr.name,
                                    value: mgr.id
                                }
                                choiceArray.push(mgrObj)
                            })
                            return choiceArray;
                        },
                        message: "Select a manager for the employee."
                    }
                ])
                .then((answer) => {
                    connection.query(
                        queries.addEmployee,
                        {
                            first_name: answer.empFirstName,
                            last_name: answer.empLastName,
                            role_id: answer.empRoleId,
                            manager_id: answer.empManagerId,
                            manager_yn: answer.empManagerYN
                        },
                        (err) => {
                            if (err) throw err;
                            console.log(`${answer.empFirstName} ${answer.empLastName} was added.`);
                            start();
                        }
                    )
                })
        }
        await promptUser();
    } catch (err) {
        console.log(err);
    }
}

const addRole = async () => {
    try {
        const promptUser = () => {
            return inquirer
                .prompt([
                    {
                        name: "roleTitle",
                        type: "input",
                        message: "Enter a name for the new role."
                    },
                    {
                        name: "roleSalary",
                        type: "input",
                        message: "Enter a salary for the role."
                    },
                    {
                        name: "roleDeptId",
                        type: "rawlist",
                        choices: function () {
                            const choiceArray = [];
                            depts.forEach((dept) => {
                                const deptObj = {
                                    name: dept.department_name,
                                    value: dept.id
                                }
                                choiceArray.push(deptObj)
                            })
                            return choiceArray;
                        },
                        message: "Select a department for the new role."
                    }
                ])
                .then((answer) => {
                    connection.query(
                        queries.addRole,
                        {
                            title: answer.roleTitle,
                            salary: answer.roleSalary,
                            department_id: answer.roleDeptId
                        },
                        (err) => {
                            if (err) throw err;
                            console.log(`${answer.roleTitle} was added.`)
                            start();
                        }
                    )
                })
        }
        const depts = await getDepartments();
        await promptUser();
    } catch (err) {
        console.log(err);
    }
}