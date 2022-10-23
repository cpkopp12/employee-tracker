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
    }
    ,
    {
        type: 'input',
        name: 'managerId',
        message: "Enter employee's manager id: "
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

    //add department
    this.addDepartmentPrompt = [{
        type: 'input',
        name: 'name',
        message: 'Enter department name: '
    }];

    //update employee role
    this.updateEmployeePrompt = [{
        type: 'input',
        name: 'updateRoleId',
        message: 'Enter the new role id: '
    },
    {
        type: 'input',
        name: 'updateEmployeeId',
        message: 'Enter the employee id: '
    }];

    

    //db queries -------------------
    //view employees
    this.viewAllEmployeesQuery = `Select * FROM employees`;
    //add employee
    this.addEmployeeQuery = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
    //view roles
    this.viewAllRolesQuery = `SELECT * FROM roles`;
    //add role 
    this.addRoleQuery = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`;
    //view department
    this.viewAllDepartmentsQuery = `SELECT * FROM departments`;
    //add department
    this.addDepartmentQuery = `INSERT INTO departments (name) VALUES (?)`;
    //update employee role query
    this.updateEmployeeQuery = `UPDATE employees SET role_id = ? WHERE id = ?`


    
    
};

//app methods
App.prototype.initApp = function() {
    //first inquirer prompt
    inquirer
        .prompt(app.firstPrompt)
        .then(({ firstPromptAction }) => {
            if (firstPromptAction === 'View All Employees') {
                //db query for view all employees
                db.promise().query(app.viewAllEmployeesQuery)
                .then(([rows,fields]) => {
                    console.table(rows);
                    app.initApp();
                });
            } else if (firstPromptAction === 'Add Employee') {
                inquirer
                    .prompt(app.addEmployeePrompt)
                    .then(({ firstName, lastName, roleId, managerId }) => {
                        //db query for add emplooyee
                        const params = [firstName, lastName, roleId, managerId];
                        db.promise().query(app.addEmployeeQuery, params)
                        .then(([rows,fields]) => {
                            console.table(rows);
                            console.log('added succesfully');
                            app.initApp();
                        });
                    });
            } else if (firstPromptAction === 'View All Roles') {
                //db.query for view all roles
                db.promise().query(app.viewAllRolesQuery)
                .then(([rows,fields]) => {
                    console.table(rows);
                    app.initApp();
                });
            } else if (firstPromptAction === 'Add Role') {
                inquirer
                    .prompt(app.addRolePrompt)
                    .then(({ title, salary, departmentId }) => {
                        //db query for add role
                        const params = [title, salary, departmentId];
                        db.promise().query(app.addRoleQuery, params)
                        .then(([rows,fields]) => {
                            console.table(rows);
                            console.log('added succesfully');
                            app.initApp();
                        });
                    });
            } else if (firstPromptAction === 'View All Departments') {
                // db query for view all departments
                db.promise().query(app.viewAllDepartmentsQuery)
                .then(([rows,fields]) => {
                    console.table(rows);
                    app.initApp();
                });
            } else if (firstPromptAction === 'Add Department') {
                inquirer
                    .prompt(app.addDepartmentPrompt)
                    .then(({ name }) => {
                        //db query for add department
                        const params = [name];
                        db.promise().query(app.addDepartmentQuery, params)
                        .then(([rows,fields]) =>{
                            console.table(rows);
                            console.log('added succesfully');
                            app.initApp();
                        });
                    });
            } else if (firstPromptAction === 'Update Employee Role') {
                inquirer
                    .prompt(app.updateEmployeePrompt)
                    .then(({ updateRoleId, updateEmployeeId }) => {
                        //db querry for update employee role
                        const params = [updateRoleId, updateEmployeeId];
                        db.promise().query(app.updateEmployeeQuery, params)
                        .then(([rows,fields]) => {
                            console.table(rows);
                            console.log('updated succesfully');
                            app.initApp();
                        });
                    });
            } else {
                db.end();
            }
        });
};

//INIT APP ----------------------------------
const app = new App();
app.initApp();

