
USE `hrm`;
DROP function IF EXISTS `hrm`.`get_total_leaving_count`;
;

DELIMITER $$
USE `hrm`$$
CREATE FUNCTION `get_total_leaving_count`( dept_id int) RETURNS int
    READS SQL DATA
BEGIN
	DECLARE total_leaving_count int;
    SELECT count(*) into total_leaving_count FROM  all_accept_leavings a JOIN employees e ON e.employee_id = a.employee_id left join departments d on e.department_id = d.department_id where d.department_id = dept_id; 


RETURN total_leaving_count;
END$$

DELIMITER ;



DELIMITER //
CREATE FUNCTION Check_enough_remaianing_leaves(requested_no_of_leaves INT, employee_id CHAR(5), leave_type_id INT )
RETURNS integer
DETERMINISTIC
READS SQL DATA
BEGIN
 DECLARE available_days integer;
 SELECT remaining_days INTO available_days FROM remaining_leaving_days WHERE remaining_leaving_days.leave_type_id=leave_type_id AND remaining_leaving_days.employee_id=employee_id;
 IF requested_no_of_leaves > available_days THEN 
	RETURN 0;
 ELSE
	RETURN 1;
 END IF;
END //
DELIMITER ;
