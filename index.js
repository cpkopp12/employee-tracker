//DECLARATIONS: db(connections.js), inquirer, console.table------------------------------
const db = require('./db/connection');
const inquirer = require('inquirer');
const cTable = require('console.table');

//APP OBJECT ------------------------------------
function App() {
    //prompts -------------
    //opening prompt
    this.firstPrompt = [{
        type: 'list',
        message: 'What would you like to do?',
        name: 'firstPromptAction',
        choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit']
    }];

    //add employee
    this.addEmployeePrompt = [{
        type: 'input',
        name: 'firstName',
        message: "Enter employee's first name: "
    },
    {
        type: 'input',
        name: 'lastName',
        message: "Enter employee's last name: "
    },
    {
        type: 'input',
        name: 'roleId',
        message: "Enter employee's role id: "
    }];

    //add role
    this.addRolePrompt = [{
        type: 'input',
        name: 'title',
        message: 'Enter title of the role: '
    },
    {
        type: 'input',
        name: 'salary',
        message: 'Enter salary of the role: '
    },
    {
        type: 'input',
        name: 'departmentId',
        message: 'Enter department id for the role: '
    }];

    

    //db queries -------------------
    //view employees
    this.viewAllEmployeesQuery = `Select * FROM employees`;
    //add employee
    this.addEmployeeQuery = `INSERT INTO employees (first_name, last_name, role_id) VALUES (?, ?, ?)`;
    //view roles
    this.viewAllRolesQuery = `SELECT * FROM roles`;
    //add role 
    this.addRoleQuery = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`;

    
    
};

//app methods
App.prototype.initApp = function() {
    //first inquirer prompt
    inquirer
        .prompt(app.firstPrompt)
        .then(({ firstPromptAction }) => {
            if (firstPromptAction === 'View All Employees') {
                //db query for view all employees
                db.query(app.viewAllEmployeesQuery, (err,rows) => {
                    if (err) {
                        console.log(err.message);
                        return;
                    }
                    console.log(rows);
                });
            } else if (firstPromptAction === 'Add Employee') {
                inquirer
                    .prompt(app.addEmployeePrompt)
                    .then(({ firstName, lastName, roleId }) => {
                        //db query for add emplooyee
                        const params = [firstName, lastName, roleId];
                        db.query(app.addEmployeeQuery, params, (err, result) => {
                            if (err) {
                                console.log(err.message);
                                return;
                            }
                            console.log(result);
                            console.log('added succesfully');
                        });
                    });
            } else if (firstPromptAction === 'View All Roles') {
                //db.query for view all roles
                db.query(app.viewAllRolesQuery, (err,rows) => {
                    if (err) {
                        console.log(err.message);
                        return;
                    }
                    console.log(rows);
                });
            } else if (firstPromptAction === 'Add Role') {
                inquirer
                    .prompt(app.addRolePrompt)
                    .then(({ title, salary, departmentId }) => {
                        //db query for add role
                        const params = [title, salary, departmentId];
                        console.log(params);
                        db.query(app.addRoleQuery, params, (err, results) => {
                            if (err) {
                                console.log(err.message);
                                return;
                            }
                            console.log(results);
                            console.log('added succesfully');
                        });
                    });
            }
        });
};

//INIT APP ----------------------------------
const app = new App();
app.initApp();