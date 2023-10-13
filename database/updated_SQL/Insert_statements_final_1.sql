use hrm;
-- departments
INSERT INTO `departments` (`name`) VALUES ('Men\'s Wear');
INSERT INTO `departments` (`name`) VALUES ('Women\'s Wear');
INSERT INTO `departments` (`name`) VALUES ('Kid\'s Wear');

-- job titles
INSERT INTO `job_titles` (`job_title`) VALUES ('HR Manager');
INSERT INTO `job_titles` (`job_title`) VALUES ('Accountant');
INSERT INTO `job_titles` (`job_title`) VALUES ('Software Engineer');
INSERT INTO `job_titles` (`job_title`) VALUES ('QA Engineer');

-- employement statuses
INSERT INTO `employment_statuses` (`employee_status_id`, `status`) VALUES (1, 'Intern - full time');
INSERT INTO `employment_statuses` (`employee_status_id`, `status`) VALUES (2, 'Intern - part time');
INSERT INTO `employment_statuses` (`employee_status_id`, `status`) VALUES (3, 'Contract - full time');
INSERT INTO `employment_statuses` (`employee_status_id`, `status`) VALUES (4, 'Contract - part time');
INSERT INTO `employment_statuses` (`employee_status_id`, `status`) VALUES (5, 'Permanent');
INSERT INTO `employment_statuses` (`employee_status_id`, `status`) VALUES (6, 'Freelance');

-- leave types
INSERT INTO `HRM`.`leave_types` (`leave_type`) VALUES ('Annual');
INSERT INTO `HRM`.`leave_types` (`leave_type`) VALUES ('Casual');
INSERT INTO `HRM`.`leave_types` (`leave_type`) VALUES ('Maternity');
INSERT INTO `HRM`.`leave_types` (`leave_type`) VALUES ('No-pay');

-- pay grades
INSERT INTO `HRM`.`pay_grades` (`pay_grade`) VALUES ('Level 1');
INSERT INTO `HRM`.`pay_grades` (`pay_grade`) VALUES ('Level 2');
INSERT INTO `HRM`.`pay_grades` (`pay_grade`) VALUES ('Level 3');
INSERT INTO `HRM`.`pay_grades` (`pay_grade`) VALUES ('Level 4');

-- user account roles
INSERT INTO `HRM`.`user_account_roles` (`role`) VALUES ('Admin');
INSERT INTO `HRM`.`user_account_roles` (`role`) VALUES ('HR');
INSERT INTO `HRM`.`user_account_roles` (`role`) VALUES ('Employee');

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


-- employees
INSERT INTO `employees` (`first_name`, `last_name`, `gender`, `birthdate`,`marital_status`, `supervisor_id`, `department_id`, `pay_grade_id`, `employee_status_id`, `job_title_id`)
VALUES
('Chamari', 'Fernando', 'female', '1989-05-07', 1, 'A0002', 2, 3, 4, 2),
('Dinuka', 'Perera', 'male', '1990-11-15', 0, 'A0001', 3, 1, 5, 1),
('Isuri', 'Silva', 'female', '1986-04-20', 1, 'A0002', 1, 2, 2, 1),
('Janith', 'Karunaratne', 'male', '1992-03-03', 0, 'A0002', 3, 4, 5, 2),
('Nethmi', 'Ratnayake', 'female', '1993-08-18', 1, 'A0003', 1, 2, 1, 3),
('Pasan', 'Jayawardena', 'male', '1987-12-29', 0, 'A0003', 2, 1, 5, 3),
('Dimalsha', 'Wijeratne', 'female', '1988-07-09', 1, 'A0003', 3, 3, 2, 2),
('Sahan', 'Bandara', 'male', '1985-01-26', 0, 'A0002', 1, 4, 4, 3),
('Sanduni', 'Perera', 'female', '1989-10-03', 1, 'A0004', 2, 1, 3, 4),
('Lahiru', 'Dissanayake', 'male', '1986-06-17', 0, 'A0003', 3, 2, 6, 1),
('Chathuri', 'Gunasekara', 'female', '1990-03-22', 1, 'A0002', 1, 3, 1, 2),
('Nisal', 'Samarasekera', 'male', '1991-09-11', 0, 'A0003', 2, 4, 2, 3),
('Shanika', 'Mendis', 'female', '1992-04-07', 1, 'A0004', 3, 1, 5, 4),
('Sankalpa', 'Wickramasinghe', 'male', '1988-08-16', 0, 'A0004', 1, 2, 6, 1),
('Thisari', 'Jayasundara', 'female', '1987-11-24', 1, 'A0003', 2, 3, 3, 2),
('Ashen', 'Senanayake', 'male', '1993-02-12', 0, 'A0004', 3, 4, 4, 3),
('Kavindya', 'Alwis', 'female', '1986-10-28', 1, 'A0003', 1, 1, 2, 4),
('Milinda', 'Rajapaksa', 'male', '1985-05-05', 0, 'A0003', 2, 2, 1, 1),
('Ruvini', 'Peris', 'female', '1989-09-09', 1, 'A0004', 3, 3, 5, 2),
('Buddhika', 'Kodikara', 'male', '1990-07-15', 0, 'A0003', 1, 4, 6, 3),
('Dinuka', 'Perera', 'male', '1980-11-15', 0, 'A0003', 3, 1, 4, 1);

-- user accounts
INSERT INTO `HRM`.`user_accounts` (`username`, `password`, `user_email`, `employee_id`, `role_id`)
VALUES 
('ChamariFernando', 'password123', 'chamari.fernando@gmail.com', 'A0001', 1),
('DinukaPerera', 'password123', 'dinuka.perera@gmail.com', 'A0002', 2),
('IsuriSilva', 'password123', 'isuri.silva@gmail.com', 'A0003', 3),
('JanithKarunaratne', 'password123', 'janith.karunaratne@gmail.com', 'A0004', 3),
('NethmiRatnayake', 'password123', 'nethmi.ratnayake@gmail.com', 'A0005', 3),
('PasanJayawardena', 'password123', 'pasan.jayawardena@gmail.com', 'A0006', 3),
('DimalshaWijeratne', 'password123', 'dimalsha.wijeratne@gmail.com', 'A0007', 3),
('SahanBandara', 'password123', 'sahan.bandara@gmail.com', 'A0008', 3),
('SanduniPerera', 'password123', 'sanduni.perera@gmail.com', 'A0009', 3),
('LahiruDissanayake', 'password123', 'lahiru.dissanayake@gmail.com', 'A0010', 3);

-- emergency contact details
INSERT INTO `HRM`.`emergency_contact_details` (`contact_name`, `relationship`, `contact_number`, `employee_id`)
VALUES 
('Ranil Fernando', 'Father', '+94 701234561', 'A0001'),
('Dilani Perera', 'Sister', '+94 701234562', 'A0002'),
('Lakmal Silva', 'Brother', '+94 701234563', 'A0003'),
('Manjula Karunaratne', 'Uncle', '+94 701234564', 'A0004'),
('Priyani Ratnayake', 'Mother', '+94 701234565', 'A0005'),
('Saman Jayawardena', 'Father', '+94 701234566', 'A0006'),
('Kusum Wijeratne', 'Aunty', '+94 701234567', 'A0007'),
('Dulani Bandara', 'Sister', '+94 701234568', 'A0008'),
('Lasith Perera', 'Cousin', '+94 701234569', 'A0009'),
('Nalaka Dissanayake', 'Brother', '+94 701234570', 'A0010'),
('Rukmal Gunasekara', 'Husband', '+94 701234571', 'A0011'),
('Kaveen Samarasekera', 'Son', '+94 701234572', 'A0012'),
('Niroshi Mendis', 'Wife', '+94 701234573', 'A0013'),
('Chinthaka Wickramasinghe', 'Father-in-law', '+94 701234574', 'A0014'),
('Anusha Jayasundara', 'Mother', '+94 701234575', 'A0015'),
('Dhananjaya Senanayake', 'Brother', '+94 701234576', 'A0016'),
('Chamila Alwis', 'Sister', '+94 701234577', 'A0017'),
('Dilum Rajapaksa', 'Cousin', '+94 701234578', 'A0018'),
('Kumudini Peris', 'Aunty', '+94 701234579', 'A0019'),
('Charith Kodikara', 'Uncle', '+94 701234580', 'A0020');

-- leave requests
INSERT INTO `HRM`.`leave_requests` 
(`reason`, `leave_day_count`, `request_date`, `approved`, `employee_id`, `leave_type_id`) 
VALUES 
('Family event', 3, '2023-01-01 09:00:00', 1, 'A0001', 1),
('Medical leave', 2, '2023-01-05 10:30:00', 0, 'A0002', 2),
('Vacation', 5, '2023-01-10 14:15:00', 1, 'A0003', 3),
('Maternity leave', 60, '2023-01-20 16:20:00', 1, 'A0019', 3),
('Family event', 1, '2023-01-25 11:05:00', 0, 'A0005', 1),
('Medical leave', 4, '2023-01-30 12:10:00', 1, 'A0006', 2),
('Vacation', 7, '2023-02-05 13:30:00', 0, 'A0007', 3),
('Medical leave', 3, '2023-02-10 10:00:00', 1, 'A0008', 2),
('Family event', 2, '2023-02-15 15:40:00', 0, 'A0009', 1),
('Vacation', 10, '2023-02-20 11:50:00', 1, 'A0010', 3);

-- dependents
INSERT INTO `HRM`.`dependents` (`employee_id`, `dependent_name`, `relationship`, `age`) VALUES
('A0001', 'Roshan', 'Husband', 34),
('A0001', 'Vihan', 'Son', 5),
('A0002', 'Tharushi', 'Wife', 32),
('A0002', 'Layla', 'Daughter', 4),
('A0003', 'Charith', 'Husband', 37),
('A0003', 'Viraj', 'Son', 6),
('A0004', 'Anushi', 'Wife', 30),
('A0004', 'Nethara', 'Daughter', 2),
('A0005', 'Nimal', 'Husband', 33),
('A0005', 'Vihanga', 'Son', 7),
('A0006', 'Thamara', 'Wife', 35),
('A0006', 'Nihara', 'Daughter', 7),
('A0007', 'Ravi', 'Husband', 36),
('A0007', 'Yohan', 'Son', 9),
('A0008', 'Kasuni', 'Wife', 37),
('A0008', 'Dinith', 'Son', 8),
('A0009', 'Janaka', 'Husband', 34),
('A0009', 'Sithum', 'Son', 6),
('A0010', 'Dilini', 'Wife', 35),
('A0010', 'Vinura', 'Daughter', 5),
('A0011', 'Anura', 'Husband', 35),
('A0011', 'Venuki', 'Daughter', 10),
('A0012', 'Chamila', 'Wife', 32),
('A0012', 'Rihan', 'Son', 3),
('A0013', 'Dushyantha', 'Husband', 33),
('A0013', 'Nishani', 'Daughter', 7),
('A0014', 'Nelum', 'Wife', 33),
('A0014', 'Samith', 'Son', 8),
('A0015', 'Priyantha', 'Husband', 35),
('A0015', 'Oshan', 'Son', 9),
('A0016', 'Dulani', 'Wife', 31),
('A0016', 'Dulan', 'Son', 2),
('A0017', 'Thilina', 'Husband', 38),
('A0017', 'Anuki', 'Daughter', 8),
('A0018', 'Nilmini', 'Wife', 36),
('A0018', 'Nihinsa', 'Son', 5),
('A0019', 'Lahiru', 'Husband', 34),
('A0019', 'Savini', 'Daughter', 7),
('A0020', 'Heshani', 'Wife', 33),
('A0020', 'Amaya', 'Daughter', 4),
('A0021', 'Rukshani', 'Wife', 41),
('A0021', 'Yumal', 'Son', 12);



