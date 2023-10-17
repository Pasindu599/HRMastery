-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

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
  PRIMARY KEY (`department_id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `HRM`.`pay_grades`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `HRM`.`pay_grades` ;

CREATE TABLE IF NOT EXISTS `HRM`.`pay_grades` (
  `pay_grade_id` INT NOT NULL AUTO_INCREMENT,
  `pay_grade` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`pay_grade_id`),
  UNIQUE INDEX `pay_grade_UNIQUE` (`pay_grade` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `HRM`.`employment_statuses`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `HRM`.`employment_statuses` ;

CREATE TABLE IF NOT EXISTS `HRM`.`employment_statuses` (
  `employee_status_id` INT NOT NULL AUTO_INCREMENT,
  `status` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`employee_status_id`),
  UNIQUE INDEX `status_UNIQUE` (`status` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `HRM`.`job_titles`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `HRM`.`job_titles` ;

CREATE TABLE IF NOT EXISTS `HRM`.`job_titles` (
  `job_title_id` INT NOT NULL AUTO_INCREMENT,
  `job_title` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`job_title_id`),
  UNIQUE INDEX `job_title_UNIQUE` (`job_title` ASC) VISIBLE)
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
  `supervisor_id` CHAR(5),
  `department_id` INT NOT NULL,
  `pay_grade_id` INT NOT NULL,
  `employee_status_id` INT NOT NULL,
  `job_title_id` INT NOT NULL,
  PRIMARY KEY (`employee_id`),
  INDEX `fk_employees_departments1_idx` (`department_id` ASC) VISIBLE,
  INDEX `fk_employees_pay_grades1_idx` (`pay_grade_id` ASC) VISIBLE,
  INDEX `fk_employees_employment_stasuses1_idx` (`employee_status_id` ASC) VISIBLE,
  INDEX `fk_employees_job_titles1_idx` (`job_title_id` ASC) VISIBLE,
  CONSTRAINT `fk_employees_departments`
    FOREIGN KEY (`department_id`)
    REFERENCES `HRM`.`departments` (`department_id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `fk_employees_pay_grades`
    FOREIGN KEY (`pay_grade_id`)
    REFERENCES `HRM`.`pay_grades` (`pay_grade_id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `fk_employees_employment_stasuses`
    FOREIGN KEY (`employee_status_id`)
    REFERENCES `HRM`.`employment_statuses` (`employee_status_id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `fk_employees_job_titles1`
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
  PRIMARY KEY (`leave_type_id`),
  UNIQUE INDEX `leave_type_UNIQUE` (`leave_type` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `HRM`.`leave_requests`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `HRM`.`leave_requests` ;

CREATE TABLE IF NOT EXISTS `HRM`.`leave_requests` (
  `request_id` INT NOT NULL AUTO_INCREMENT,
  `reason` TEXT NOT NULL,
  `leave_day_count` INT NOT NULL,
  `request_date` DATETIME NOT NULL,
  `approved` TINYINT NOT NULL,
  `employee_id` CHAR(5) NOT NULL,
  `leave_type_id` INT NOT NULL,
  PRIMARY KEY (`request_id`),
  INDEX `fk_leave_requests_employees1_idx` (`employee_id` ASC) VISIBLE,
  INDEX `fk_leave_requests_leave_types1_idx` (`leave_type_id` ASC) VISIBLE,
  CONSTRAINT `fk_leave_requests_employees1`
    FOREIGN KEY (`employee_id`)
    REFERENCES `HRM`.`employees` (`employee_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_leave_requests_leave_types1`
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
  INDEX `fk_remaining_leaving_days_leave_types1_idx` (`leave_type_id` ASC) VISIBLE,
  INDEX `fk_remaining_leaving_days_employees1_idx` (`employee_id` ASC) VISIBLE,
  CONSTRAINT `fk_remaining_leaving_days_leave_types1`
    FOREIGN KEY (`leave_type_id`)
    REFERENCES `HRM`.`leave_types` (`leave_type_id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `fk_remaining_leaving_days_employees1`
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
  PRIMARY KEY (`role_id`),
  UNIQUE INDEX `role_UNIQUE` (`role` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `HRM`.`user_accounts`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `HRM`.`user_accounts` ;

CREATE TABLE IF NOT EXISTS `HRM`.`user_accounts` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `user_email` VARCHAR(45) NOT NULL,
  `employee_id` CHAR(5) NOT NULL,
  `role_id` INT NOT NULL,
  PRIMARY KEY (`user_id`),
  INDEX `fk_user_accounts_employees1_idx` (`employee_id` ASC) VISIBLE,
  INDEX `fk_user_accounts_user_account_roles1_idx` (`role_id` ASC) VISIBLE,
  UNIQUE INDEX `user_email_UNIQUE` (`user_email` ASC) VISIBLE,
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE,
  CONSTRAINT `fk_user_accounts_employees1`
    FOREIGN KEY (`employee_id`)
    REFERENCES `HRM`.`employees` (`employee_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_user_accounts_user_account_roles1`
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
  INDEX `fk_num_of_leaving_days_leave_types1_idx` (`leave_type_id` ASC) VISIBLE,
  CONSTRAINT `fk_num_of_leaving_days_pay_grades1`
    FOREIGN KEY (`pay_grade_id`)
    REFERENCES `HRM`.`pay_grades` (`pay_grade_id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `fk_num_of_leaving_days_leave_types1`
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
  INDEX `fk_emergency_contact_details_employees1_idx` (`employee_id` ASC) VISIBLE,
  CONSTRAINT `fk_emergency_contact_details_employees1`
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
  `dependent_id` INT NOT NULL AUTO_INCREMENT,
  `employee_id` CHAR(5) NOT NULL,
  `dependent_name` VARCHAR(45) NOT NULL,
  `relationship` VARCHAR(45) NOT NULL,
  `age` INT NULL,
  PRIMARY KEY (`dependent_id`),
  INDEX `fk_dependent_employees1_idx` (`employee_id` ASC) VISIBLE,
  CONSTRAINT `fk_dependent_employees1`
    FOREIGN KEY (`employee_id`)
    REFERENCES `HRM`.`employees` (`employee_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

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
DROP TRIGGER IF EXISTS insert_remaining_leave_days;
DELIMITER //

CREATE TRIGGER insert_remaining_leave_days
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
            WHEN leave_type_id = 3 THEN 
                (SELECT total_days FROM num_of_leaving_days WHERE leave_type_id = 3 AND pay_grade_id = NEW.pay_grade_id LIMIT 1)
            WHEN leave_type_id = 4 THEN 
                (SELECT total_days FROM num_of_leaving_days WHERE leave_type_id = 4 AND pay_grade_id = NEW.pay_grade_id LIMIT 1)
            ELSE 0  -- Handle other leave_type_id values
        END
    FROM HRM.leave_types;
END;
//
DELIMITER ;


-- trigger for updating the number of remaining leaving days when a leave request is accepted
DROP TRIGGER IF EXISTS reudce_no_of_leaves;
DELIMITER //
CREATE TRIGGER reudce_no_of_leaves
AFTER INSERT 
ON hrm.leave_requests
FOR EACH ROW 
BEGIN 
	DECLARE current_remaining_days INT;
    
    SET current_remaining_days = (SELECT remaining_days 
								  FROM hrm.remaining_leaving_days 
								  WHERE leave_type_id= NEW.leave_type_id AND employee_id=NEW.employee_id);
	IF current_remaining_days is NULL THEN
		SET current_remaining_days=0;
	END IF;
	IF current_remaining_days !=0 THEN
		IF NEW.approved =1 THEN 
			UPDATE remaining_leaving_days 
			SET remaining_days= current_remaining_days-1 
			WHERE leave_type_id= NEW.leave_type_id AND employee_id=NEW.employee_id;
		END IF;
	END IF;
END;
//
DELIMITER ;
		
	






