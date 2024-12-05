-- MySQL Workbench Forward Engineering

-- -----------------------------------------------------
-- Schema HRM
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `HRM` ;

-- -----------------------------------------------------
-- Schema HRM
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `HRM` DEFAULT CHARACTER SET utf8 ;
USE `HRM` ;

-- -----------------------------------------------------
-- Table `HRM`.`departments`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `HRM`.`departments` ;

CREATE TABLE IF NOT EXISTS `HRM`.`departments` (
  `department_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
   PRIMARY KEY (`department_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `HRM`.`pay_grades`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `HRM`.`pay_grades` ;

CREATE TABLE IF NOT EXISTS `HRM`.`pay_grades` (
  `pay_grade_id` INT NOT NULL AUTO_INCREMENT,
  `pay_grade` VARCHAR(45) NOT NULL,
   PRIMARY KEY (`pay_grade_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `HRM`.`employment_statuses`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `HRM`.`employment_statuses` ;

CREATE TABLE IF NOT EXISTS `HRM`.`employment_statuses` (
  `employee_status_id` INT NOT NULL AUTO_INCREMENT,
  `status` VARCHAR(45) NOT NULL,
   PRIMARY KEY (`employee_status_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `HRM`.`job_titles`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `HRM`.`job_titles` ;

CREATE TABLE IF NOT EXISTS `HRM`.`job_titles` (
  `job_title_id` INT NOT NULL AUTO_INCREMENT,
  `job_title` VARCHAR(45) NOT NULL,
   PRIMARY KEY (`job_title_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `HRM`.`employees`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `HRM`.`employees` ;

CREATE TABLE IF NOT EXISTS `HRM`.`employees` (
  `employee_id` CHAR(5) NOT NULL,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `gender` ENUM('male', 'female') NOT NULL CHECK (gender = 'male' OR gender = 'female'),
  `birthdate` DATE NOT NULL,
  `marital_status` TINYINT NOT NULL,
  `supervisor_id` CHAR(5) NOT NULL,
  `department_id` INT NOT NULL,
  `pay_grade_id` INT NOT NULL,
  `employee_status_id` INT NOT NULL,
  `job_title_id` INT NOT NULL,
  
   PRIMARY KEY (`employee_id`),
   
   FOREIGN KEY (`department_id`)
   REFERENCES `HRM`.`departments` (`department_id`)
   ON DELETE NO ACTION
   ON UPDATE CASCADE,
   
   FOREIGN KEY (`pay_grade_id`)
   REFERENCES `HRM`.`pay_grades` (`pay_grade_id`)
   ON DELETE NO ACTION
   ON UPDATE CASCADE,
   
   FOREIGN KEY (`employee_status_id`)
   REFERENCES `HRM`.`employment_statuses` (`employee_status_id`)
   ON DELETE NO ACTION
   ON UPDATE CASCADE,

   FOREIGN KEY (`job_title_id`)
   REFERENCES `HRM`.`job_titles` (`job_title_id`)
   ON DELETE NO ACTION
   ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `HRM`.`leave_types`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `HRM`.`leave_types` ;

CREATE TABLE IF NOT EXISTS `HRM`.`leave_types` (
  `leave_type_id` INT NOT NULL AUTO_INCREMENT,
  `leave_type` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`leave_type_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `HRM`.`leave_requests`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `HRM`.`leave_requests` ;

CREATE TABLE IF NOT EXISTS `HRM`.`leave_requests` (
  `request_id` CHAR(5) NOT NULL,
  `reason` TEXT NOT NULL,
  `leave_day_count` INT NOT NULL,
  `request_date` DATE NOT NULL,
  `approved` TINYINT NOT NULL,
  `employee_id` CHAR(5) NOT NULL,
  `leave_type_id` INT NOT NULL,
  
   PRIMARY KEY (`request_id`),

   FOREIGN KEY (`employee_id`)
   REFERENCES `HRM`.`employees` (`employee_id`)
   ON DELETE CASCADE
   ON UPDATE CASCADE,

   FOREIGN KEY (`leave_type_id`)
   REFERENCES `HRM`.`leave_types` (`leave_type_id`)
   ON DELETE NO ACTION
   ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `HRM`.`remaining_leaving_days`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `HRM`.`remaining_leaving_days` ;

CREATE TABLE IF NOT EXISTS `HRM`.`remaining_leaving_days` (
  `leave_type_id` INT NOT NULL,
  `employee_id` CHAR(5) NOT NULL,
  `remaining_days` INT NOT NULL,
  
  PRIMARY KEY (`leave_type_id`, `employee_id`),

   FOREIGN KEY (`leave_type_id`)
   REFERENCES `HRM`.`leave_types` (`leave_type_id`)
   ON DELETE NO ACTION
   ON UPDATE CASCADE,

   FOREIGN KEY (`employee_id`)
   REFERENCES `HRM`.`employees` (`employee_id`)
   ON DELETE CASCADE
   ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `HRM`.`user_account_roles`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `HRM`.`user_account_roles` ;

CREATE TABLE IF NOT EXISTS `HRM`.`user_account_roles` (
  `role_id` INT NOT NULL AUTO_INCREMENT,
  `role` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`role_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `HRM`.`user_accounts`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `HRM`.`user_accounts` ;

CREATE TABLE IF NOT EXISTS `HRM`.`user_accounts` (
  `user_id` CHAR(5) NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(75) NOT NULL,
  `user_email` VARCHAR(45) NOT NULL,
  `employee_id` CHAR(5) NOT NULL,
  `role_id` INT NOT NULL,
  
  PRIMARY KEY (`user_id`),

   FOREIGN KEY (`employee_id`)
   REFERENCES `HRM`.`employees` (`employee_id`)
   ON DELETE CASCADE
   ON UPDATE CASCADE,

   FOREIGN KEY (`role_id`)
   REFERENCES `HRM`.`user_account_roles` (`role_id`)
   ON DELETE NO ACTION
   ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `HRM`.`num_of_leaving_days`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `HRM`.`num_of_leaving_days` ;

CREATE TABLE IF NOT EXISTS `HRM`.`num_of_leaving_days` (
  `pay_grade_id` INT NOT NULL,
  `leave_type_id` INT NOT NULL,
  `total_days` INT NOT NULL,
  
  PRIMARY KEY (`pay_grade_id`, `leave_type_id`),

   FOREIGN KEY (`pay_grade_id`)
   REFERENCES `HRM`.`pay_grades` (`pay_grade_id`)
   ON DELETE NO ACTION
   ON UPDATE CASCADE,

   FOREIGN KEY (`leave_type_id`)
   REFERENCES `HRM`.`leave_types` (`leave_type_id`)
   ON DELETE NO ACTION
   ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `HRM`.`emergency_contact_details`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `HRM`.`emergency_contact_details` ;

CREATE TABLE IF NOT EXISTS `HRM`.`emergency_contact_details` (
  `emergency_contact_id` INT NOT NULL AUTO_INCREMENT,
  `contact_name` VARCHAR(45) NOT NULL,
  `relationship` VARCHAR(45) NOT NULL,
  `contact_number` VARCHAR(45) NOT NULL,
  `employee_id` CHAR(5) NOT NULL,
  
  PRIMARY KEY (`emergency_contact_id`),
  
   FOREIGN KEY (`employee_id`)
   REFERENCES `HRM`.`employees` (`employee_id`)
   ON DELETE CASCADE
   ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `HRM`.`dependents`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `HRM`.`dependents` ;

CREATE TABLE IF NOT EXISTS `HRM`.`dependents` (
  `dependent_id` CHAR(5) NOT NULL,
  `employee_id` CHAR(5) NOT NULL,
  `dependent_name` VARCHAR(45) NOT NULL,
  `relationship` VARCHAR(45) NOT NULL,
  `age` INT NULL,
  
   PRIMARY KEY (`dependent_id`),
   
   FOREIGN KEY (`employee_id`)
   REFERENCES `HRM`.`employees` (`employee_id`)
   ON DELETE CASCADE
   ON UPDATE CASCADE)
ENGINE = InnoDB;


-- ----------------------------------------------------
-- triggers
-- ----------------------------------------------------

-- trigger for auto incrementing employee_id

DROP TRIGGER IF EXISTS employee_id_trigger;
DELIMITER //
CREATE TRIGGER employee_id_trigger 
BEFORE INSERT
ON hrm.employees
FOR EACH ROW 
BEGIN
	DECLARE max_val INT;
    SET max_val=(SELECT MAX(CAST(substring(employee_id,2) AS SIGNED))
				 FROM employees);
	IF max_val IS NULL THEN 
		SET max_val=0;
	END iF;
    
    SET NEW.employee_id=CONCAT('A',LPAD(max_val+1,4,'0'));
END;
//
DELIMITER ;


-- trigger for auto inserting the number of leaving days when a new employee entry is is inserted
DROP TRIGGER IF EXISTS employees_after_insert ;
DELIMITER //

CREATE TRIGGER  employees_after_insert
	AFTER INSERT ON HRM.employees
	FOR EACH ROW
BEGIN
    DECLARE paygrade_id INT;

    SET paygrade_id = NEW.pay_grade_id;

    INSERT INTO HRM.remaining_leaving_days (employee_id, leave_type_id, remaining_days)
    SELECT NEW.employee_id, leave_type_id, 
        CASE
            WHEN leave_type_id = 1 THEN 
                (SELECT total_days FROM num_of_leaving_days WHERE leave_type_id = 1 AND pay_grade_id = NEW.pay_grade_id LIMIT 1)
            WHEN leave_type_id = 2 THEN 
                (SELECT total_days FROM num_of_leaving_days WHERE leave_type_id = 2 AND pay_grade_id = NEW.pay_grade_id LIMIT 1)
            WHEN leave_type_id = 3 AND NEW.gender = 'female' THEN 
                (SELECT total_days FROM num_of_leaving_days WHERE leave_type_id = 3 AND pay_grade_id = NEW.pay_grade_id LIMIT 1)
            WHEN leave_type_id = 4 THEN 
                (SELECT total_days FROM num_of_leaving_days WHERE leave_type_id = 4 AND pay_grade_id = NEW.pay_grade_id LIMIT 1)
            ELSE 0  -- Handle other leave_type_id values
        END
    FROM HRM.leave_types;
END;
//
DELIMITER ;




-- Create a new trigger to update remaining_leaving_days
DROP TRIGGER IF EXISTS update_remaining_leaving_days;
DELIMITER //

CREATE TRIGGER update_remaining_leaving_days
AFTER INSERT ON HRM.leave_requests
FOR EACH ROW
BEGIN
    DECLARE current_remaining_days INT;
    
    -- Check if the leave request was approved (approved = 1)
    IF NEW.approved = 1 THEN
        -- Retrieve the remaining days for the specific leave_type_id and employee_id
        SELECT remaining_days
        INTO current_remaining_days
        FROM HRM.remaining_leaving_days
        WHERE leave_type_id = NEW.leave_type_id
        AND employee_id = NEW.employee_id;
        
        -- Check if there are enough remaining days for the leave request
        IF current_remaining_days >= NEW.leave_day_count THEN
            -- Update the remaining days in the remaining_leaving_days table
            UPDATE HRM.remaining_leaving_days
            SET remaining_days = remaining_days - NEW.leave_day_count
            WHERE leave_type_id = NEW.leave_type_id
            AND employee_id = NEW.employee_id;
        ELSE
            -- Handle the case where there are not enough remaining days
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Insufficient remaining leave days for this request.';
        END IF;
    END IF;
END;
//
DELIMITER ;

-- trigger for auto incrementing leave request_id

DROP TRIGGER IF EXISTS request_id_trigger;
DELIMITER //
CREATE TRIGGER request_id_trigger 
BEFORE INSERT
ON hrm.leave_requests
FOR EACH ROW 
BEGIN
	DECLARE max_val INT;
    SET max_val=(SELECT MAX(CAST(substring(request_id,2) AS SIGNED))
				 FROM leave_requests);
	IF max_val IS NULL THEN 
		SET max_val=0;
	END iF;
    
    SET NEW.request_id=CONCAT('L',LPAD(max_val+1,4,'0'));
END;
//
DELIMITER ;


-- trigger for auto incrementing dependent_id

DROP TRIGGER IF EXISTS dependent_id_trigger;
DELIMITER //
CREATE TRIGGER dependent_id_trigger 
BEFORE INSERT
ON hrm.dependents
FOR EACH ROW 
BEGIN
	DECLARE max_val INT;
    SET max_val=(SELECT MAX(CAST(substring(dependent_id,2) AS SIGNED))
				 FROM dependents);
	IF max_val IS NULL THEN 
		SET max_val=0;
	END iF;
    
    SET NEW.dependent_id=CONCAT('D',LPAD(max_val+1,4,'0'));
END;
//
DELIMITER ;

-- trigger for auto incrementing user_id

DROP TRIGGER IF EXISTS user_id_trigger;
DELIMITER //
CREATE TRIGGER user_id_trigger 
BEFORE INSERT
ON hrm.user_accounts
FOR EACH ROW 
BEGIN
	DECLARE max_val INT;
    SET max_val=(SELECT MAX(CAST(substring(user_id,2) AS SIGNED))
				 FROM user_accounts);
	IF max_val IS NULL THEN 
		SET max_val=0;
	END iF;
    
    SET NEW.user_id=CONCAT('U',LPAD(max_val+1,4,'0'));
END;
//
DELIMITER ;



