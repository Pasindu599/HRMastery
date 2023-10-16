USE `hrm`;
DROP function IF EXISTS `get_total_leaving_count`;

USE `hrm`;
DROP function IF EXISTS `hrm`.`get_total_leaving_count`;
;

DELIMITER $$
USE `hrm`$$
CREATE DEFINER=`root`@`localhost` FUNCTION `get_total_leaving_count`( dept_id int) RETURNS int
    READS SQL DATA
BEGIN
	DECLARE total_leaving_count int;
    SELECT count(*) into total_leaving_count FROM  all_accept_leavings a JOIN employees e ON e.employee_id = a.employee_id left join departments d on e.department_id = d.department_id where d.department_id = dept_id; 


RETURN total_leaving_count;
END$$

DELIMITER ;
;

