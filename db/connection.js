//DECLARATIONS: mysql -------------------------------------
const mysql = require('mysql2');

//CONNECT DATABASE-----------------------------------------------------
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Cammatt12!',
        database: 'employee_tracker'
    },
    console.log('Connected to the employee-tracker database.')
);

//EXPORTS: db ---------------------------------------------------------------
module.exports = db;