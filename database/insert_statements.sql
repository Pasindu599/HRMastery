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


INSERT INTO `employees` (`employee_id`,`first_name`, `last_name`, `gender`, `birthdate`,`marital_status`, `supervisor_id`, `department_id`, `pay_grade_id`, `employee_status_id`, `job_title_id`)
VALUES
('0001W','Chamari', 'Fernando', 'female', '1989-05-07', 1, 4, 2, 3, 4, 2),
('0002K','Dinuka', 'Perera', 'male', '1990-11-15', 0, NULL, 3, 1, 5, 1),
('0003M','Isuri', 'Silva', 'female', '1986-04-20', 1, 6, 1, 2, 2, 1),
('0004K','Janith', 'Karunaratne', 'male', '1992-03-03', 0, 7, 3, 4, 5, 2),
('0005M','Nethmi', 'Ratnayake', 'female', '1993-08-18', 1, 2, 1, 2, 1, 3),
('0006W','Pasan', 'Jayawardena', 'male', '1987-12-29', 0, NULL, 2, 1, 5, 3),
('0007K','Dimalsha', 'Wijeratne', 'female', '1988-07-09', 1, 9, 3, 3, 2, 2),
('0008M','Sahan', 'Bandara', 'male', '1985-01-26', 0, 10, 1, 4, 4, 3),
('0009W','Sanduni', 'Perera', 'female', '1989-10-03', 1, 1, 2, 1, 3, 4),
('0010K','Lahiru', 'Dissanayake', 'male', '1986-06-17', 0, 3, 3, 2, 6, 1),
('0011M','Chathuri', 'Gunasekara', 'female', '1990-03-22', 1, 4, 1, 3, 1, 2),
('0012W','Nisal', 'Samarasekera', 'male', '1991-09-11', 0, 5, 2, 4, 2, 3),
('0013K','Shanika', 'Mendis', 'female', '1992-04-07', 1, 6, 3, 1, 5, 4),
('0014M','Sankalpa', 'Wickramasinghe', 'male', '1988-08-16', 0, 7, 1, 2, 6, 1),
('0015W','Thisari', 'Jayasundara', 'female', '1987-11-24', 1, 2, 2, 3, 3, 2),
('0016K','Ashen', 'Senanayake', 'male', '1993-02-12', 0, 8, 3, 4, 4, 3),
('0017M','Kavindya', 'Alwis', 'female', '1986-10-28', 1, 9, 1, 1, 2, 4),
('0018W','Milinda', 'Rajapaksa', 'male', '1985-05-05', 0, 1, 2, 2, 1, 1),
('0019K','Ruvini', 'Peris', 'female', '1989-09-09', 1, 3, 3, 3, 5, 2),
('0020M','Buddhika', 'Kodikara', 'male', '1990-07-15', 0, 2, 1, 4, 6, 3),
('0021K','Dinuka', 'Perera', 'male', '1980-11-15', 0, 14, 3, 1, 4, 1);


-- user accounts
INSERT INTO `HRM`.`user_accounts` (`username`, `password`, `user_email`, `employee_id`, `role_id`)
VALUES 
('ChamariFernando', 'password123', 'chamari.fernando@gmail.com', '0001W', 1),
('DinukaPerera', 'password123', 'dinuka.perera@gmail.com', '0002K', 2),
('IsuriSilva', 'password123', 'isuri.silva@gmail.com', '0003M', 3),
('JanithKarunaratne', 'password123', 'janith.karunaratne@gmail.com', '0004K', 1),
('NethmiRatnayake', 'password123', 'nethmi.ratnayake@gmail.com', '0005M', 2),
('PasanJayawardena', 'password123', 'pasan.jayawardena@gmail.com', '0006W', 3),
('DimalshaWijeratne', 'password123', 'dimalsha.wijeratne@gmail.com', '0007K', 1),
('SahanBandara', 'password123', 'sahan.bandara@gmail.com', '0008M', 2),
('SanduniPerera', 'password123', 'sanduni.perera@gmail.com', '0009W', 3),
('LahiruDissanayake', 'password123', 'lahiru.dissanayake@gmail.com', '0010K', 1);

-- emergency contact details
INSERT INTO `HRM`.`emergency_contact_details` (`contact_name`, `relationship`, `contact_number`, `employee_id`)
VALUES 
('Ranil Fernando', 'Father', '+94 701234561', '0001W'),
('Dilani Perera', 'Sister', '+94 701234562', '0002K'),
('Lakmal Silva', 'Brother', '+94 701234563', '0003M'),
('Manjula Karunaratne', 'Uncle', '+94 701234564', '0004K'),
('Priyani Ratnayake', 'Mother', '+94 701234565', '0005M'),
('Saman Jayawardena', 'Father', '+94 701234566', '0006W'),
('Kusum Wijeratne', 'Aunty', '+94 701234567', '0007K'),
('Dulani Bandara', 'Sister', '+94 701234568', '0008M'),
('Lasith Perera', 'Cousin', '+94 701234569', '0009W'),
('Nalaka Dissanayake', 'Brother', '+94 701234570', '0010K'),
('Rukmal Gunasekara', 'Husband', '+94 701234571', '0011M'),
('Kaveen Samarasekera', 'Son', '+94 701234572', '0012W'),
('Niroshi Mendis', 'Wife', '+94 701234573', '0013K'),
('Chinthaka Wickramasinghe', 'Father-in-law', '+94 701234574', '0014M'),
('Anusha Jayasundara', 'Mother', '+94 701234575', '0015W'),
('Dhananjaya Senanayake', 'Brother', '+94 701234576', '0016K'),
('Chamila Alwis', 'Sister', '+94 701234577', '0017M'),
('Dilum Rajapaksa', 'Cousin', '+94 701234578', '0018W'),
('Kumudini Peris', 'Aunty', '+94 701234579', '0019K'),
('Charith Kodikara', 'Uncle', '+94 701234580', '0020M');

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
('0001W', 1, 20), ('0001W', 2, 20), ('0001W', 3, 20), ('0001W', 4, 50),
('0002K', 1, 20), ('0002K', 2, 20), ('0002K', 4, 50),
('0003M', 1, 20), ('0003M', 2, 20), ('0003M', 3, 20), ('0003M', 4, 50),
('0004K', 1, 20), ('0004K', 2, 20), ('0004K', 4, 50),
('0005M', 1, 20), ('0005M', 2, 20), ('0005M', 3, 20), ('0005M', 4, 50),
('0006W', 1, 20), ('0006W', 2, 20), ('0006W', 4, 50),
('0007K', 1, 20), ('0007K', 2, 20), ('0007K', 3, 20), ('0007K', 4, 50),
('0008M', 1, 20), ('0008M', 2, 20), ('0008M', 4, 50),
('0009W', 1, 20), ('0009W', 2, 20), ('0009W', 3, 20), ('0009W', 4, 50),
('0010K', 1, 20), ('0010K', 2, 20), ('0010K', 4, 50),
('0011M', 1, 20), ('0011M', 2, 20), ('0011M', 3, 20), ('0011M', 4, 50),
('0012W', 1, 20), ('0012W', 2, 20), ('0012W', 4, 50),
('0013K', 1, 20), ('0013K', 2, 20), ('0013K', 3, 20), ('0013K', 4, 50),
('0014M', 1, 20), ('0014M', 2, 20), ('0014M', 4, 50),
('0015W', 1, 20), ('0015W', 2, 20), ('0015W', 3, 20), ('0015W', 4, 50),
('0016K', 1, 20), ('0016K', 2, 20), ('0016K', 4, 50),
('0017M', 1, 20), ('0017M', 2, 20), ('0017M', 3, 20), ('0017M', 4, 50),
('0018W', 1, 20), ('0018W', 2, 20), ('0018W', 4, 50),
('0019K', 1, 20), ('0019K', 2, 20), ('0019K', 3, 20), ('0019K', 4, 50),
('0020M', 1, 20), ('0020M', 2, 20), ('0020M', 4, 50);


-- leave requests
INSERT INTO `HRM`.`leave_requests` 
(`request_id`, `reason`, `leave_day_count`, `request_date`, `approved`, `employee_id`, `leave_type_id`) 
VALUES 
(1, 'Family event', 3, '2023-01-01 09:00:00', 1, '0001W', 1),
(2, 'Medical leave', 2, '2023-01-05 10:30:00', 0, '0002K', 2),
(3, 'Vacation', 5, '2023-01-10 14:15:00', 1, '0003M', 3),
(4, 'Maternity leave', 60, '2023-01-20 16:20:00', 1, '0019K', 3),
(5, 'Family event', 1, '2023-01-25 11:05:00', 0, '0005M', 1),
(6, 'Medical leave', 4, '2023-01-30 12:10:00', 1, '0006W', 2),
(7, 'Vacation', 7, '2023-02-05 13:30:00', 0, '0007K', 3),
(8, 'Medical leave', 3, '2023-02-10 10:00:00', 1, '0008M', 2),
(9, 'Family event', 2, '2023-02-15 15:40:00', 0, '0009W', 1),
(10, 'Vacation', 10, '2023-02-20 11:50:00', 1, '0010K', 3);


-- dependents
INSERT INTO `HRM`.`dependent` (`employee_id`, `dependent_name`, `relationship`, `age`) VALUES
('0001W', 'Roshan', 'Husband', 34),
('0001W', 'Vihan', 'Son', 5),
('0002K', 'Tharushi', 'Wife', 32),
('0002K', 'Layla', 'Daughter', 4),
('0003M', 'Charith', 'Husband', 37),
('0003M', 'Viraj', 'Son', 6),
('0004K', 'Anushi', 'Wife', 30),
('0004K', 'Nethara', 'Daughter', 2),
('0005M', 'Nimal', 'Husband', 33),
('0005M', 'Vihanga', 'Son', 7),
('0006W', 'Thamara', 'Wife', 35),
('0006W', 'Nihara', 'Daughter', 7),
('0007K', 'Ravi', 'Husband', 36),
('0007K', 'Yohan', 'Son', 9),
('0008M', 'Kasuni', 'Wife', 37),
('0008M', 'Dinith', 'Son', 8),
('0009W', 'Janaka', 'Husband', 34),
('0009W', 'Sithum', 'Son', 6),
('0010K', 'Dilini', 'Wife', 35),
('0010K', 'Vinura', 'Daughter', 5),
('0011M', 'Anura', 'Husband', 35),
('0011M', 'Venuki', 'Daughter', 10),
('0012W', 'Chamila', 'Wife', 32),
('0012W', 'Rihan', 'Son', 3),
('0013K', 'Dushyantha', 'Husband', 33),
('0013K', 'Nishani', 'Daughter', 7),
('0014M', 'Nelum', 'Wife', 33),
('0014M', 'Samith', 'Son', 8),
('0015W', 'Priyantha', 'Husband', 35),
('0015W', 'Oshan', 'Son', 9),
('0016K', 'Dulani', 'Wife', 31),
('0016K', 'Dulan', 'Son', 2),
('0017M', 'Thilina', 'Husband', 38),
('0017M', 'Anuki', 'Daughter', 8),
('0018W', 'Nilmini', 'Wife', 36),
('0018W', 'Nihinsa', 'Son', 5),
('0019K', 'Lahiru', 'Husband', 34),
('0019K', 'Savini', 'Daughter', 7),
('0020M', 'Heshani', 'Wife', 33),
('0020M', 'Amaya', 'Daughter', 4),
('0021K', 'Rukshani', 'Wife', 41),
('0021K', 'Yumal', 'Son', 12);

