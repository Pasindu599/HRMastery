-- department
INSERT INTO `departments` (`name`) VALUES ('Men\'s Wear');
INSERT INTO `departments` (`name`) VALUES ('Women\'s Wear');
INSERT INTO `departments` (`name`) VALUES ('Kid\'s Wear');

-- 
INSERT INTO `job_titles` (`job_title`) VALUES ('HR Manager');
INSERT INTO `job_titles` (`job_title`) VALUES ('Accountant');
INSERT INTO `job_titles` (`job_title`) VALUES ('Software Engineer');
INSERT INTO `job_titles` (`job_title`) VALUES ('QA Engineer');

--
INSERT INTO `employment_statuses` (`employee_status_id`, `status`) VALUES (1, 'Intern - full time');
INSERT INTO `employment_statuses` (`employee_status_id`, `status`) VALUES (2, 'Intern - part time');
INSERT INTO `employment_statuses` (`employee_status_id`, `status`) VALUES (3, 'Contract - full time');
INSERT INTO `employment_statuses` (`employee_status_id`, `status`) VALUES (4, 'Contract - part time');
INSERT INTO `employment_statuses` (`employee_status_id`, `status`) VALUES (5, 'Permanent');
INSERT INTO `employment_statuses` (`employee_status_id`, `status`) VALUES (6, 'Freelance');
--------------

INSERT INTO `HRM`.`leave_types` (`leave_type`) VALUES ('Annual');
INSERT INTO `HRM`.`leave_types` (`leave_type`) VALUES ('Casual');
INSERT INTO `HRM`.`leave_types` (`leave_type`) VALUES ('Maternity');
INSERT INTO `HRM`.`leave_types` (`leave_type`) VALUES ('No-pay');

-----------------------------------
INSERT INTO `HRM`.`pay_grades` (`pay_grade`) VALUES ('Level 1');
INSERT INTO `HRM`.`pay_grades` (`pay_grade`) VALUES ('Level 2');
INSERT INTO `HRM`.`pay_grades` (`pay_grade`) VALUES ('Level 3');
INSERT INTO `HRM`.`pay_grades` (`pay_grade`) VALUES ('Level 4');

INSERT INTO `HRM`.`user_account_roles` (`role`) VALUES ('Admin');
INSERT INTO `HRM`.`user_account_roles` (`role`) VALUES ('HR Manager');
INSERT INTO `HRM`.`user_account_roles` (`role`) VALUES ('Employee');

----------- employees------------ NEED TO CHNAGE PRIMARY KEY RANGE 


INSERT INTO `employees` (`first_name`, `last_name`, `gender`, `birthdate`,`marital_status`, `supervisor_id`, `department_id`, `pay_grade_id`, `employee_status_id`, `job_title_id`)
VALUES
('Chamari', 'Fernando', 'female', '1989-05-07', 1, 4, 2, 3, 4, 2),
('Dinuka', 'Perera', 'male', '1990-11-15', 0, NULL, 3, 1, 5, 1),
('Isuri', 'Silva', 'female', '1986-04-20', 1, 6, 1, 2, 2, 1),
('Janith', 'Karunaratne', 'male', '1992-03-03', 0, 7, 3, 4, 5, 2),
('Nethmi', 'Ratnayake', 'female', '1993-08-18', 1, 2, 1, 2, 1, 3),
('Madhushan', 'Jayawardena', 'male', '1987-12-29', 0, NULL, 2, 1, 5, 3),
('Tharushi', 'Wijeratne', 'female', '1988-07-09', 1, 9, 3, 3, 2, 2),
('Sahan', 'Bandara', 'male', '1985-01-26', 0, 10, 1, 4, 4, 3),
('Sanduni', 'Perera', 'female', '1989-10-03', 1, 1, 2, 1, 3, 4),
('Lahiru', 'Dissanayake', 'male', '1986-06-17', 0, 3, 3, 2, 6, 1),
('Chathuri', 'Gunasekara', 'female', '1990-03-22', 1, 4, 1, 3, 1, 2),
('Nisal', 'Samarasekera', 'male', '1991-09-11', 0, 5, 2, 4, 2, 3),
('Shanika', 'Mendis', 'female', '1992-04-07', 1, 6, 3, 1, 5, 4),
('Ravindu', 'Wickramasinghe', 'male', '1988-08-16', 0, 7, 1, 2, 6, 1),
('Thisari', 'Jayasundara', 'female', '1987-11-24', 1, 2, 2, 3, 3, 2),
('Ashen', 'Senanayake', 'male', '1993-02-12', 0, 8, 3, 4, 4, 3),
('Kavindya', 'Alwis', 'female', '1986-10-28', 1, 9, 1, 1, 2, 4),
('Milinda', 'Rajapaksa', 'male', '1985-05-05', 0, 1, 2, 2, 1, 1),
('Ruvini', 'Peris', 'female', '1989-09-09', 1, 3, 3, 3, 5, 2),
('Buddhika', 'Kodikara', 'male', '1990-07-15', 0, 2, 1, 4, 6, 3),
('Dinuka', 'Perera', 'male', '1980-11-15', 0, 14, 3, 1, 4, 1);

-- user accounts
INSERT INTO `HRM`.`user_accounts` (`username`, `password`, `user_email`, `employee_id`, `role_id`)
VALUES 
('ChamariFernando', 'password123', 'chamari.fernando@gmail.com', 1, 1),
('DinukaPerera', 'password123', 'dinuka.perera@gmail.com', 2, 2),
('IsuriSilva', 'password123', 'isuri.silva@gmail.com', 3, 3),
('JanithKarunaratne', 'password123', 'janith.karunaratne@gmail.com', 4, 1),
('NethmiRatnayake', 'password123', 'nethmi.ratnayake@gmail.com', 5, 2),
('MadhushanJayawardena', 'password123', 'madhushan.jayawardena@gmail.com', 6, 3),
('TharushiWijeratne', 'password123', 'tharushi.wijeratne@gmail.com', 7, 1),
('SahanBandara', 'password123', 'sahan.bandara@gmail.com', 8, 2),
('SanduniPerera', 'password123', 'sanduni.perera@gmail.com', 9, 3),
('LahiruDissanayake', 'password123', 'lahiru.dissanayake@gmail.com', 10, 1);

-- emergency contact details
INSERT INTO `HRM`.`emergency_contact_details` (`contact_name`, `relationship`, `contact_number`, `employee_id`)
VALUES 
('Ranil Fernando', 'Father', '+94 701234561', 1),
('Dilani Perera', 'Sister', '+94 701234562', 2),
('Lakmal Silva', 'Brother', '+94 701234563', 3),
('Manjula Karunaratne', 'Uncle', '+94 701234564', 4),
('Priyani Ratnayake', 'Mother', '+94 701234565', 5),
('Saman Jayawardena', 'Father', '+94 701234566', 6),
('Kusum Wijeratne', 'Aunty', '+94 701234567', 7),
('Dulani Bandara', 'Sister', '+94 701234568', 8),
('Lasith Perera', 'Cousin', '+94 701234569', 9),
('Nalaka Dissanayake', 'Brother', '+94 701234570', 10),
('Rukmal Gunasekara', 'Husband', '+94 701234571', 11),
('Kaveen Samarasekera', 'Son', '+94 701234572', 12),
('Niroshi Mendis', 'Wife', '+94 701234573', 13),
('Chinthaka Wickramasinghe', 'Father-in-law', '+94 701234574', 14),
('Anusha Jayasundara', 'Mother', '+94 701234575', 15),
('Dhananjaya Senanayake', 'Brother', '+94 701234576', 16),
('Chamila Alwis', 'Sister', '+94 701234577', 17),
('Dilum Rajapaksa', 'Cousin', '+94 701234578', 18),
('Kumudini Peris', 'Aunty', '+94 701234579', 19),
('Charith Kodikara', 'Uncle', '+94 701234580', 20);

-- num_of_leaving_days
INSERT INTO `HRM`.`num_of_leaving_days` (`pay_grade_id`, `leave_type_id`, `total_days`)
VALUES 
(1, 1, 20),
(1, 2, 20),
(1, 3, 20),
(1, 4, 50),
(2, 1, 20),
(2, 2, 20),
(2, 3, 20),
(2, 4, 50),
(3, 1, 20),
(3, 2, 20),
(3, 3, 20),
(3, 4, 50),
(4, 1, 20),
(4, 2, 20),
(4, 3, 20),
(4, 4, 50);

-- remaining_leaving_days
INSERT INTO `HRM`.`remaining_leaving_days` (`employee_id`, `leave_type_id`, `remaining_days`)
VALUES 
(1, 1, 20),
(1, 2, 20),
(1,3,20),
(1, 4, 50),

(2, 1, 20),
(2, 2, 20),
(2, 4, 50),

(3, 1, 20),
(3, 2, 20),
(3, 3, 20),
(3, 4, 50),

(4, 1, 20),
(4, 2, 20),
(4, 4, 50),

(5, 1, 20),
(5, 2, 20),
(5, 3, 20),
(5, 4, 50),

(6, 1, 20),
(6, 2, 20),
(6, 4, 50),

(7, 1, 20),
(7, 2, 20),
(7, 3, 20),
(7, 4, 50),

(8, 1, 20),
(8, 2, 20),
(8, 4, 50),

(9, 1, 20),
(9, 2, 20),
(9, 3, 20),
(9, 4, 50),

(10, 1, 20),
(10, 2, 20),
(10, 4, 50),

(11, 1, 20),
(11, 2, 20),
(11, 3, 20),
(11, 4, 50),

(12, 1, 20),
(12, 2, 20),
(12, 4, 50),

(13, 1, 20),
(13, 2, 20),
(13, 3, 20),
(13, 4, 50),

(14, 1, 20),
(14, 2, 20),
(14, 4, 50),

(15, 1, 20),
(15, 2, 20),
(15, 3, 20),
(15, 4, 50),

(16, 1, 20),
(16, 2, 20),
(16, 4, 50),

(17, 1, 20),
(17, 2, 20),
(17, 3, 20),
(17, 4, 50),

(18, 1, 20),
(18, 2, 20),
(18, 4, 50),

(19, 1, 20),
(19, 2, 20),
(19, 3, 20),
(19, 4, 50),

(20, 1, 20),
(20, 2, 20),
(20, 4, 50);

-- leave requests
INSERT INTO `HRM`.`leave_requests` 
(`request_id`, `reason`, `leave_day_count`, `request_date`, `approved`, `employee_id`, `leave_type_id`) 
VALUES 
(1, 'Family event', 3, '2023-01-01 09:00:00', 1, 1, 1),
(2, 'Medical leave', 2, '2023-01-05 10:30:00', 0, 2, 2),
(3, 'Vacation', 5, '2023-01-10 14:15:00', 1, 3, 3),
(4, 'Maternity leave', 60, '2023-01-20 16:20:00', 1, 19, 3),
(5, 'Family event', 1, '2023-01-25 11:05:00', 0, 5, 1),
(6, 'Medical leave', 4, '2023-01-30 12:10:00', 1, 6, 2),
(7, 'Vacation', 7, '2023-02-05 13:30:00', 0, 7, 3),
(8, 'Medical leave', 3, '2023-02-10 10:00:00', 1, 8, 2),
(9, 'Family event', 2, '2023-02-15 15:40:00', 0, 9, 1),
(10, 'Vacation', 10, '2023-02-20 11:50:00', 1, 10, 3);

