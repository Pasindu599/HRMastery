USE `hrm`;
CREATE  OR REPLACE VIEW `hrm`.`all_accept_leavings` AS
    SELECT 
        `hrm`.`leave_requests`.`request_id` AS `request_id`,
        `hrm`.`leave_requests`.`reason` AS `reason`,
        `hrm`.`leave_requests`.`leave_day_count` AS `leave_day_count`,
        `hrm`.`leave_requests`.`request_date` AS `request_date`,
        `hrm`.`leave_requests`.`approved` AS `approved`,
        `hrm`.`leave_requests`.`employee_id` AS `employee_id`,
        `hrm`.`leave_requests`.`leave_type_id` AS `leave_type_id`
    FROM
        `hrm`.`leave_requests`
    WHERE
        (`hrm`.`leave_requests`.`approved` = 1);


CREATE 
 OR REPLACE VIEW `hrm`.`emp_supervisor` AS
    SELECT 
        `e`.`employee_id` AS `employee_id`,
        `e`.`first_name` AS `emp_name`,
        `e`.`supervisor_id` AS `supervisor_id`,
        `s`.`first_name` AS `sup_name`
    FROM
        (`hrm`.`employees` `e`
        LEFT JOIN `hrm`.`employees` `s` ON ((`e`.`supervisor_id` = `s`.`employee_id`)));


CREATE  OR REPLACE VIEW `hrm`.`employee_without_custom_attributes` AS
    SELECT 
        `hrm`.`employees`.`employee_id` AS `employee_id`,
        `hrm`.`employees`.`first_name` AS `first_name`,
        `hrm`.`employees`.`last_name` AS `last_name`,
        `hrm`.`employees`.`gender` AS `gender`,
        `hrm`.`employees`.`birthdate` AS `birthdate`,
        `hrm`.`employees`.`marital_status` AS `marital_status`,
        `hrm`.`employees`.`supervisor_id` AS `supervisor_id`,
        `hrm`.`employees`.`department_id` AS `department_id`,
        `hrm`.`employees`.`pay_grade_id` AS `pay_grade_id`,
		`hrm`.`employees`.`employee_status_id` AS `employee_status_id`,
		`hrm`.`employees`.`job_title_id` AS `job_title_id`

    FROM
        `hrm`.`employees`;


CREATE  OR REPLACE VIEW hrm.profile_view AS
    SELECT 
        hrm.employees.employee_id AS employee_id,
        hrm.employees.first_name AS first_name,
        hrm.employees.last_name AS last_name
    FROM
        hrm.employees