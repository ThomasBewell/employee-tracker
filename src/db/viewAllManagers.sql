SELECT emp.id, concat(emp.first_name, " ", emp.last_name) name, role.title, dept.name department, role.salary, concat(manager.first_name, " ", manager.last_name) manager_name
FROM ((employee emp
    LEFT JOIN employee manager ON manager.id = emp.manager_id)
    LEFT JOIN role ON emp.role_id = role.id
    LEFT JOIN department dept ON role.department_id = dept.id)
WHERE emp.manager_yn = 'Y'
ORDER BY name