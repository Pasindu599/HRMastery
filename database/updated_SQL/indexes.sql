
-- add indexes

CREATE INDEX idx_department ON hrm.departments (department_id);

CREATE INDEX idx_pay_grades ON hrm.pay_grades (pay_grade_id);

CREATE INDEX idx_employment_statuses ON hrm.employment_statuses (employments_status_id);

CREATE INDEX idx_job_titles ON hrm.job_titles (job_title_id);

CREATE INDEX idx_leave_types ON hrm.leave_types (leave_type_id);

CREATE INDEX idx_remaining_leaving_days ON hrm.remaining_leaving_days (leave_type_id);

CREATE INDEX idx_user_account_roles ON hrm.user_account_roles (role_id);

CREATE INDEX idx_user_accounts ON hrm.user_accounts (user_id);

CREATE INDEX idx_num_of_leaving_days ON hrm.num_of_leaving_days (pay_grade_id,leave_type_id);

CREATE INDEX idx_emergency_contact_details ON hrm.emergency_contact_details (emergency_contact_id);



