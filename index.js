//DECLARATIONS: db(connections.js), inquirer------------------------------
const db = require('./db/connection');
const inquirer = require('inquirer');

//APP OBJECT ------------------------------------
function App() {
    //prompts
    this.firstPrompt = [{
        type: 'list',
        message: 'What would you like to do?',
        name: 'firstPromptAction',
        choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit']
    }];
};