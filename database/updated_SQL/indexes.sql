
-- add indexes

CREATE INDEX idx_name ON hrm.departments (name);

CREATE INDEX idx_employee_id ON hrm.employees (employee_id);

CREATE INDEX idx_birthdate ON hrm.employees (birthdate);

CREATE INDEX idx_employee_details ON hrm.employees (first_name, last_name, gender, department_id);

CREATE INDEX idx_leave_type ON hrm.leave_types (leave_type);

CREATE INDEX idx_relationship ON hrm.emergency_contact_details (relationship);