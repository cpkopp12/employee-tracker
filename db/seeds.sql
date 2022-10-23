INSERT INTO departments (name)
VALUES 
    ('Accounting'),
    ('Sales');

INSERT INTO roles (title, salary, department_id)
VALUES 
    ('Taxes', 10.00, 1),
    ('Rep', 3.00, 2);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES 
    ('Bilbo', 'Baggins', 1, null),
    ('Frodo', 'Baggins', 1, 1);