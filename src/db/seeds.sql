USE employeetracker;

INSERT INTO employee (first_name, last_name) VALUES ('John', 'Doe');

INSERT INTO employee (first_name, last_name, manager_yn) VALUES ('Jack', 'Doe', 'Y');

INSERT INTO department (name) VALUES ('Sales');

INSERT INTO role (title, salary) VALUES ('Sales Rep', 100000.00), ('Sales Manager', 125000.00);

UPDATE employee SET role_id = (SELECT id FROM role WHERE title = 'Sales Manager') WHERE employee.first_name = 'Jack' AND employee.last_name = 'Doe';

UPDATE role SET department_id = (SELECT id FROM department WHERE name = 'Sales') WHERE title IN ('Sales Rep', 'Sales Manager');

UPDATE employee SET role_id = (SELECT id FROM role WHERE title = 'Sales Rep'), manager_id = 2 WHERE employee.first_name = 'John' AND employee.last_name = 'Doe';