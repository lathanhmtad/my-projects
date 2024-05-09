use quiz;

-- password: id=1=admin, id=2=baole26072003, id=3->10=password3...->password10
INSERT INTO participant(id, email, username, full_name, password, role, avatar, enabled, created_date, created_by)
VALUES
    (1,'admin@gmail.com', 'admin', 'Administrator', 
		'$2y$10$VVQ9TABhq7/Z8OdydrQnXOhySW.p6r8cLgt3pYjhk/z5s45SRQ4G6', 
        'ADMIN', 
        'https://res.cloudinary.com/dixswfj8d/image/upload/v1710918890/quiz-website-images/participants/admin.png', 
        1, NOW(), 1),
    (2,'baole26072003@gmail.com', 'baole26072003', 'Lê Quốc Bảo', 
		'$2y$10$CMsEj8tqZTc/BKl3W/C2vOhw.0Je89jVDP4gnj7k.ZbgoWajDVdLi', 'ADMIN', 
        'https://res.cloudinary.com/dixswfj8d/image/upload/v1710918896/quiz-website-images/participants/lequocbao.jpg', 
        1, NOW(), 1),
    (3,'truc98depgai@gmail.com', 'phamthanhtruc', 'Phạm Thanh Trúc', 
		'$2y$10$nCpDEV5jLw5uhXHi.x0rTesRUUkvN5DUA1yxKau0vnrKWBHsKzEzW', 'USER', 
        'https://res.cloudinary.com/dixswfj8d/image/upload/v1710918904/quiz-website-images/participants/phamthanhtruc.jpg', 
        0, NOW(), 1),
    (4,'minhduc@gmail.com', 'minhduc', 'Minh Đức', '$2y$10$FSlzrFV2noXRoDsdbqNkuOIy.ehLoQBRBGsR6UwfONaFPKI4chH.S', 'USER', 'https://res.cloudinary.com/dixswfj8d/image/upload/v1710918899/quiz-website-images/participants/minhduc.jpg', 1, NOW(), 1),
    (5,'thuylinh@gmail.com', 'thuylinh', 'Mỹ Hòa Thúy Linh', '$2y$10$JLXm4XAQ84tshvoezSHah.jvwtrfXum230irWm5GWGgW4MPJNv.zK', 'USER', 'https://res.cloudinary.com/dixswfj8d/image/upload/v1710918900/quiz-website-images/participants/myhoathuylinh.jpg', 1, NOW(), 1),
    (6,'vandat@gmail.com', 'vandat', 'Văn Đạt Đỗ', '$2y$10$grM2iS94i3JJEmdVzhtzm.tY/UR4lDXCKu2RZpWy9OxG9serXXr1O', 'USER', 'https://res.cloudinary.com/dixswfj8d/image/upload/v1710918905/quiz-website-images/participants/vandatdo.jpg', 0, NOW(), 1),
    (7,'linhchi@gmail.com', 'linhchi', 'Linh Chi', '$2y$10$AKYyz5kKCMTnofPp/yDNmekAVnoUCy07AXrUGbSJpWritET4QXFf.', 'USER', 'https://res.cloudinary.com/dixswfj8d/image/upload/v1710918897/quiz-website-images/participants/linhchi.webp', 1, NOW(), 1),
    (8,'quanghuy@gmail.com', 'ngoquanghuy', 'Ngô Quang Huy', '$2y$10$kYKMNfLfXWZL6VMFue3QO.1E3Te09IA8uiTlKudHt/byxmyHJ0JMm', 'USER', 'https://res.cloudinary.com/dixswfj8d/image/upload/v1710918903/quiz-website-images/participants/ngoquanghuy.jpg', 1, NOW(), 1),
    (9,'honganh@gmail.com', 'honganh', 'Hồng Anh', '$2y$10$VqbfKioN1fdcvpA9LweMTOoDydAk46Mzrq1ui3f1ynJttdYBPqfsm', 'USER', 'https://res.cloudinary.com/dixswfj8d/image/upload/v1710918892/quiz-website-images/participants/honganh.jpg', 0, NOW(), 1),
    (10,'khanhhoa@gmail.com', 'khanhhoa', 'Khánh Hoa', '$2y$10$J9b8LYvfP8pdzrh4ssyuAeVboj.wypn4MV2RdSN0kguJKAYtcC2XO', 'USER', 'https://res.cloudinary.com/dixswfj8d/image/upload/v1710918894/quiz-website-images/participants/khanhhoa.webp', 1, NOW(), 1)
;

INSERT INTO category(id, name, enabled, parent_id, created_date, created_by)
VALUES
	(1, 'Toán học', 1, null, now(), 1),
	(2, 'Lập trình', 1, NULL, now(), 1),
	(3, 'Toán học cơ bản', 1, 1, now(), 1),
	(4, 'Java', 1, 2, NOW(), 1),
	(5, 'Thể thao', 1, null, now(), 1),
    (6, 'Chính trị', 1, null, now(), 1),
    (7, 'Spring Boot', 1, 4, now(), 1),
	(8, 'Java core', 1, 4, now(), 1),
    (9, 'Bóng đá', 1, 5, now(), 1),
    (10, 'Giải trí', 1, null, now(), 1)
;

insert into quiz(id, name, description, image, difficulty, category_id, created_date, created_by)
values
	(1, 'Đố vui toán học', 'Làm toán giải trí nào các bạn', null, 'EASY', 3, now(), 1),
    (2, 'Chính trị Mỹ', 'Nước mỹ vỹ bạn hiểu được bao nhiêu', null, 'MEDIUM', 6, now(), 1),
	(3, 'GOAT Messi', 'Fan messi không thể không làm', null, 'HARD', 9, now(), 1),
    (4, 'FIFA World Cup', 'Bạn biết bao nhiêu điều về giải đấu bóng đá lớn nhất hành tinh này? Hãy thử xem', null, 'MEDIUM', 
		9, now(), 1
    ),
    (5, 'Test về java spring boot', 'Làm thử xem bạn trả lời được bao câu hỏi về java spring boot', null, 'MEDIUM', 
		7, now(), 1
	),
    (6, 'Test Jav', 'Kiểm tra tí kiến thức Jav nha', null, 'EASY', 
		10, now(), 1
	)
;

insert into question(id, description, image, type, quiz_id, created_date, created_by)
values
	# chèn câu hỏi cho bài quiz có id là 1
	(1, '3 + 7 bằng bao nhiêu?', null, 'SINGLE_CHOICE', 1, now(), 1),
    (2, 'Ai là cha của số học?', null, 'SINGLE_CHOICE', 1, now(), 1),
    (3, 'Trong phép tính 8 x 4, số nào là tích của hai số này?', null, 'SINGLE_CHOICE', 1, now(), 1),
	(4, 'Một tam giác có bao nhiêu cạnh?', null, 'SINGLE_CHOICE', 1, now(), 1),
    (5, 'Ông già hình này đẻ ra cái gì?', 
		'https://res.cloudinary.com/dixswfj8d/image/upload/v1710919865/quiz-website-images/questions/Charles%20Babbage%2C%20FRS.webp',
        'SINGLE_CHOICE', 1, now(), 1),
	(6, '7 + 8 bằng bao nhiêu?', null, 'SINGLE_CHOICE', 1, now(), 1),
    (7, 'Hình học phẳng có mấy hình cơ bản?', null, 'SINGLE_CHOICE', 1, now(), 1),
    (8, 'Nếu bạn có 5 quả táo và lấy 3 quả, bạn còn bao nhiêu quả?', null, 'SINGLE_CHOICE', 1, now(), 1),
    (9, 'Trong phép tính 4 x 9, số nào là tích của hai số này?', null, 'SINGLE_CHOICE', 1, now(), 1),
    (10, 'Bình phương của 9 là bao nhiêu?', null, 'SINGLE_CHOICE', 1, now(), 1),
	
    # chèn câu hỏi cho bài quiz có id là 2
    (11, 'Ai là Tổng thống đầu tiên của Hoa Kỳ?', NULL, 'SINGLE_CHOICE', 2, NOW(), 1),
	(12, 'Ai là Tổng thống nổi tiếng với việc phát minh ra chính sách chống đỏ?', NULL, 'SINGLE_CHOICE', 2, NOW(), 1),
	(13, 'Ông tổng thống trong hình này thắng cử năm bao nhiêu?', 
		'https://res.cloudinary.com/dixswfj8d/image/upload/v1710920737/quiz-website-images/questions/Joe%20Biden.jpg', 
		'SINGLE_CHOICE', 2, NOW(), 1
	),
	(14, 'Ai là tổng thống Mỹ thứ 16?', NULL, 'SINGLE_CHOICE', 2, NOW(), 1),
    (15, 'Ai là người đặt nền móng cho hiệp định hạt nhân Iran năm 2015?', NULL, 'SINGLE_CHOICE', 2, NOW(), 1),
    (16, 'Ông tổng thống nào đã được tổ chức Nobel trao giải hòa bình năm 2009?', NULL, 'SINGLE_CHOICE', 2, NOW(), 1),
	(17, 'Ai là tổng thống Mỹ đầu tiên đắc cử hai nhiệm kỳ liên tiếp?', NULL, 'SINGLE_CHOICE', 2, NOW(), 1),
    (18, 'Tổng thống Mỹ thứ mấy có biệt danh "Số 1"?', NULL, 'SINGLE_CHOICE', 2, NOW(), 1),
    (19, 'Ai là tổng thống Mỹ duy nhất từng làm giáo sư đại học?', NULL, 'SINGLE_CHOICE', 2, NOW(), 1),
	(20, 'Quốc hội Hoa Kỳ bao gồm hai phần, đó là?', NULL, 'MULTIPLE_CHOICE', 2, NOW(), 1),

	# chèn câu hỏi cho bài quiz có id là 3
    (21, 'Cu cậu trong hình này là con Messi. Tên cu cậu này là gì?',
		'https://res.cloudinary.com/dixswfj8d/image/upload/v1710923685/quiz-website-images/questions/thiago%20messi.webp', 
        'SINGLE_CHOICE', 3, NOW(), 1
	),
    (22, 'Messi là học trò cưng của ông trong hình này, ông này là ai?', 
		'https://res.cloudinary.com/dixswfj8d/image/upload/v1710923268/quiz-website-images/questions/pep%20guardiola.jpg', 
		'SINGLE_CHOICE', 3, NOW(), 1
	),
    (23, 'Trong năm 2021, Lionel Messi đã chuyển đến câu lạc bộ bóng đá nào sau khi rời Barcelona?', NULL, 
		'SINGLE_CHOICE', 3, NOW(), 1
	),
	(24, 'Lionel Messi sinh vào ngày nào và ở đâu?', NULL, 'SINGLE_CHOICE', 3, NOW(), 1),
    (25, 'Trận đấu đầu tiên của Messi cho đội một là vào năm nào?', NULL,'SINGLE_CHOICE' ,3, NOW(), 1),
	(26, 'Messi đã giành Quả bóng vàng FIFA lần đầu tiên vào năm nào?', NULL, 'SINGLE_CHOICE' ,3, NOW(), 1),
    (27, 'Messi đã giành bao nhiêu Quả bóng Vàng FIFA cho sự nghiệp của mình cho đến thời điểm hiện tại (2024)?', 
		NULL, 'SINGLE_CHOICE' ,3, NOW(), 1),
	(28, 'Messi đã cùng Barcelona giành bao nhiêu lần La Liga (giải vô địch Tây Ban Nha)?', 
		NULL, 'SINGLE_CHOICE' ,3, NOW(), 1),
	(29, 'Tên đầy đủ của Messi là gì?', 
		NULL, 'SINGLE_CHOICE' ,3, NOW(), 1),
	(30, 'Messi được biết đến với biệt danh nào?', 
		NULL, 'SINGLE_CHOICE' ,3, NOW(), 1),
	
	# chèn câu hỏi cho bài quiz có id là 4
    (31, 'Ai là người đã ghi bàn thắng duy nhất trong trận chung kết World Cup 2010 giữa Tây Ban Nha và Hà Lan?', 
		NULL, 'SINGLE_CHOICE', 4, NOW(), 1
	),
    (32, 'Đội bóng nào đã thắng World Cup nhiều nhất?', NULL, 'SINGLE_CHOICE', 4, NOW(), 1),
    (33, 'World Cup đầu tiên được tổ chức ở đâu?', NULL, 'SINGLE_CHOICE', 4, NOW(), 1),
    (34, 'Ai là cầu thủ ghi bàn nhiều nhất trong một mùa giải World Cup?', NULL, 'SINGLE_CHOICE', 4, NOW(), 1),
	(35, 'Trong lịch sử World Cup, có bao nhiêu lần giải đấu đã diễn ra ngoài châu Âu hoặc Nam Mỹ?',
		NULL, 'SINGLE_CHOICE', 4, NOW(), 1
	),
	(36, 'Trận chung kết World Cup 1966 diễn ra ở đâu?', NULL, 'SINGLE_CHOICE', 4, NOW(), 1),
	(37, 'Ai là cầu thủ đầu tiên ghi bàn trong một trận chung kết World Cup?', NULL, 'SINGLE_CHOICE', 4, NOW(), 1),
	(38, 'Ai là HLV đã dẫn dắt đội tuyển Brazil đến chiến thắng World Cup năm 1994?', NULL, 'SINGLE_CHOICE', 4, NOW(), 1),
    (39, 'Đội tuyển nào đã thắng World Cup lần đầu tiên khi giải đấu được tổ chức ở châu Âu?', NULL, 'SINGLE_CHOICE', 4, NOW(), 1),
	(40, 'Ai là cầu thủ ghi bàn nhiều nhất trong một giải đấu World Cup mà không giành được danh hiệu vô địch?',
		NULL, 'SINGLE_CHOICE', 4, NOW(), 1
	),

	# chèn câu hỏi cho bài quiz có id là 5
    (41, 'Spring Boot là gì?', 
		NULL, 'SINGLE_CHOICE', 5, NOW(), 1
	),
    (42, 'Dependency Injection (DI) là gì trong Spring Boot?', NULL, 'SINGLE_CHOICE', 5, NOW(), 1),
    (43, 'Bean trong Spring Boot là gì?', NULL, 'SINGLE_CHOICE', 5, NOW(), 1),
    (44, '@RestController annotation trong Spring Boot được sử dụng để làm gì?', NULL, 'SINGLE_CHOICE', 5, NOW(), 1),
	(45, '@Autowired annotation trong Spring Boot được sử dụng để làm gì?',
		NULL, 'SINGLE_CHOICE', 5, NOW(), 1
	),
	(46, '@ComponentScan annotation trong Spring Boot được sử dụng để làm gì?', NULL, 'SINGLE_CHOICE', 5, NOW(), 1),
	(47, 'Thư viện nào được Spring Boot tích hợp sẵn để làm việc với cơ sở dữ liệu?', NULL, 'SINGLE_CHOICE', 5, NOW(), 1),
	(48, 'Cách để cấu hình một DataSource trong Spring Boot là gì?', NULL, 'SINGLE_CHOICE', 5, NOW(), 1),
    (49, 'Spring Boot Actuator là gì?', NULL, 'SINGLE_CHOICE', 5, NOW(), 1),
	(50, 'Spring Boot Starter là gì?',
		NULL, 'SINGLE_CHOICE', 5, NOW(), 1
	),
	
    # chèn câu hỏi cho bài quiz có id là 6
    (51, 'Ngành công nghiệp người lớn (AV) ở Nhật Bản thường được biết đến dưới cái tên gì?', 
		NULL, 'SINGLE_CHOICE', 6, NOW(), 1
	),
    (52, 'Trong ngành công nghiệp AV ở Nhật Bản, thuật ngữ "idol" thường ám chỉ đối tượng nào?',
		NULL, 'SINGLE_CHOICE', 6, NOW(), 1
	),
    (53, 'Tổ chức nào thường xuyên tổ chức các sự kiện để gặp gỡ và chụp hình với các diễn viên phim người lớn ở Nhật Bản?',
		NULL, 'SINGLE_CHOICE', 6, NOW(), 1
	),
    (54, 'Tháng nào được chọn làm Tháng Phim người lớn tại Nhật Bản?', NULL, 'SINGLE_CHOICE', 6, NOW(), 1),
	(55, '"Gravure" là thuật ngữ được sử dụng trong ngành công nghiệp người lớn ở Nhật Bản để ám chỉ điều gì?',
		NULL, 'SINGLE_CHOICE', 6, NOW(), 1
	),
	(56, 'Điều gì đã làm cho ngành công nghiệp người lớn ở Nhật Bản trở nên nổi tiếng trên toàn thế giới?', 
		NULL, 'SINGLE_CHOICE', 6, NOW(), 1
	),
	(57, 'Cô gái đang gạ chàng trai trong hình này tên là gì?', 
		'https://res.cloudinary.com/dixswfj8d/image/upload/v1711030403/quiz-website-images/questions/sakura%20momo.jpg',
        'SINGLE_CHOICE', 6, NOW(), 1
	),
	(58, 'Ông cụ này là ai?', 'https://res.cloudinary.com/dixswfj8d/image/upload/v1711030670/quiz-website-images/questions/tokuda.jpg', 
		'SINGLE_CHOICE', 6, NOW(), 1
	),
    (59, 'Không biết cô gái này xứng đang là thiên thần :)', 'https://res.cloudinary.com/dixswfj8d/image/upload/v1711030804/quiz-website-images/questions/maria%20ozawa.webp',
		'SINGLE_CHOICE', 6, NOW(), 1
	),
	(60, '"Soapland" là một loại hình dịch vụ trong ngành công nghiệp người lớn ở Nhật Bản. Nơi này chủ yếu cung cấp:',
		NULL, 'MULTIPLE_CHOICE', 6, NOW(), 1
	)
;

insert into answer(description, question_id, correct_answer, created_date, created_by)
values
	('10', 1, 1, now(), 1),
    ('11', 1, 0, now(), 1),
    ('12', 1, 0, now(), 1),
    ('13', 1, 0, now(), 1),
    
    ('Pythagoras', 2, 0, now(), 1),
    ('Euclid', 2, 1, now(), 1),
    ('Newton', 2, 0, now(), 1),
    ('Einstein', 2, 0, now(), 1),
    
	('32', 3, 1, now(), 1),
	('4', 3, 0, now(), 1),
	('16', 3, 0, now(), 1),
	('2', 3, 0, now(), 1),
    
	('6', 4, 0, now(), 1),
	('5', 4, 0, now(), 1),
	('4', 4, 0, now(), 1),
	('3', 4, 1, now(), 1),
    
    ('Cái điện thoại', 5, 0, now(), 1),
	('Cái máy bay', 5, 0, now(), 1),
    ('Cái tivi', 5, 0, now(), 1),
	('Cái máy tính', 5, 1, now(), 1),
    
	('15', 6, 1, now(), 1),
    ('16', 6, 0, now(), 1),
    ('17', 6, 0, now(), 1),
    ('18', 6, 0, now(), 1),
    
    ('4', 7, 0, now(), 1),
    ('3', 7, 1, now(), 1),
    ('2', 7, 0, now(), 1),
    ('5', 7, 0, now(), 1),
    
    ('4', 8, 0, now(), 1),
    ('3', 8, 0, now(), 1),
    ('2', 8, 1, now(), 1),
    ('5', 8, 0, now(), 1),
    
    ('36', 9, 1, now(), 1),
    ('37', 9, 0, now(), 1),
    ('38', 9, 0, now(), 1),
    ('39', 9, 0, now(), 1),
    
    ('18', 10, 0, now(), 1),
    ('19', 10, 0, now(), 1),
    ('82', 10, 0, now(), 1),
    ('81', 10, 1, now(), 1),

	('George Washington', 11, 1, NOW(), 1),
	('Abraham Lincoln', 11, 0, NOW(), 1),
	('Thomas Jefferson', 11, 0, NOW(), 1),
	('Theodore Roosevelt', 11, 0, NOW(), 1),
    
	('Theodore Roosevelt', 12, 0, NOW(), 1),
	('John F. Kennedy', 12, 0, NOW(), 1),
	('Franklin D. Roosevelt', 12, 1, NOW(), 1),
	('Woodrow Wilson', 12, 0, NOW(), 1),
    
	('2019', 13, 0, NOW(), 1),
	('2020', 13, 1, NOW(), 1),
	('2021', 13, 0, NOW(), 1),
	('2022', 13, 0, NOW(), 1),
    
    ('Abraham Lincoln', 14, 0, NOW(), 1),
    ('Theodore Roosevelt', 14, 0, NOW(), 1),
    ('Woodrow Wilson', 14, 1, NOW(), 1),
    ('Barack Obama', 14, 0, NOW(), 1),
    
    ('Donald Trump', 15, 0, NOW(), 1),
    ('Joe Biden', 15, 0, NOW(), 1),
    ('George W. Bush', 15, 0, NOW(), 1),
    ('Barack Obama', 15, 1, NOW(), 1),
    
    ('George W. Bush', 16, 0, NOW(), 1),
    ('Donald Trump', 16, 0, NOW(), 1),
    ('Barack Obama', 16, 1, NOW(), 1),
    ('Joe Biden', 16, 0, NOW(), 1),
    
    ('Thomas Jefferson', 17, 0, NOW(), 1),
    ('Andrew Jackson', 17, 0, NOW(), 1),
    ('George Washington', 17, 1, NOW(), 1),
    ('Abraham Lincoln', 17, 0, NOW(), 1),
    
    ('George Washington', 18, 0, NOW(), 1),
    ('Abraham Lincoln', 18, 1, NOW(), 1),
    ('George H.W. Bush', 18, 0, NOW(), 1),
    ('Donald Trump', 18, 0, NOW(), 1),
    
    ('Dwight D. Eisenhower', 19, 0, NOW(), 1),
    ('John F. Kennedy', 19, 0, NOW(), 1),
    ('Barack Obama', 19, 1, NOW(), 1),
    ('Ronald Reagan', 19, 0, NOW(), 1),
    
	('Quốc hội Liên bang', 20, 1, NOW(), 1),
	('Hạ viện', 20, 0, NOW(), 1),
	('Thượng viện', 20, 1, NOW(), 1),
	('Quốc hội cộng hòa', 20, 0, NOW(), 1),
    ('Quốc hội dân chủ', 20, 0, NOW(), 1),

	('Ciro', 21, 0, NOW(), 1),
    ('Mateo', 21, 0, NOW(), 1),
    ('Thiago', 21, 1, NOW(), 1),
    ('Angel dos Santos Aveiro', 21, 0, NOW(), 1),
    
    ('Thomas Tuchel', 22, 0, NOW(), 1),
    ('Sir Alex', 22, 0, NOW(), 1),
    ('Xavi Alonso', 22, 0, NOW(), 1),
    ('Pep Guardiola', 22, 1, NOW(), 1),
    
    ('Paris Saint-Germain (PSG)', 23, 1, NOW(), 1),
    ('Manchester City', 23, 0, NOW(), 1),
    ('Benfica', 23, 0, NOW(), 1),
    ('Juventus', 23, 0, NOW(), 1),
    
	('24 tháng 6 năm 1985, ở Buenos Aires, Argentina', 24, 0, NOW(), 1),
    ('10 tháng 7 năm 1987, ở Rosario, Argentina', 24, 1, NOW(), 1),
    ('18 tháng 6 năm 1986, ở Barcelona, Tây Ban Nha', 24, 0, NOW(), 1),
    ('12 tháng 8 năm 1988, ở Madrid, Tây Ban Nha', 24, 0, NOW(), 1),
    
    ('2003', 25, 1, NOW(), 1),
    ('2004', 25, 0, NOW(), 1),
    ('2005', 25, 0, NOW(), 1),
    ('2006', 25, 0, NOW(), 1),
    
    ('2010', 26, 1, NOW(), 1),
    ('2009', 26, 0, NOW(), 1),
    ('2008', 26, 0, NOW(), 1),
    ('2007', 26, 0, NOW(), 1),
    
    ('5', 27, 0, NOW(), 1),
    ('6', 27, 0, NOW(), 1),
    ('7', 27, 0, NOW(), 1),
    ('8', 27, 1, NOW(), 1),
    
	('9 lần', 28, 0, NOW(), 1),
    ('10 lần', 28, 0, NOW(), 1),
    ('11 lần', 28, 1, NOW(), 1),
    ('12 lần', 28, 0, NOW(), 1),
    
    ('Lionel Andrés Messi', 29, 1, NOW(), 1),
    ('Lionel Diego Messi', 29, 0, NOW(), 1),
    ('Lionel Javier Messi', 29, 0, NOW(), 1),
    ('Lionel Carlos Messi', 29, 0, NOW(), 1),
    
	('El Matador', 30, 0, NOW(), 1),
    ('La Pulga', 30, 1, NOW(), 1),
    ('El Pistolero', 30, 0, NOW(), 1),
    ('El Apache', 30, 0, NOW(), 1),

	('Andrés Iniesta', 31, 1, NOW(), 1),
    ('Xavi Hernandez', 31, 0, NOW(), 1),
    ('Wesley Sneijder', 31, 0, NOW(), 1),
    ('David Villa', 31, 0, NOW(), 1),
    
    ('Brazil', 32, 1, NOW(), 1),
    ('Argentina', 32, 0, NOW(), 1),
    ('Germany', 32, 0, NOW(), 1),
    ('Italy', 32, 0, NOW(), 1),
    
    ('Brazil', 33, 0, NOW(), 1),
    ('Germany', 33, 0, NOW(), 1),
    ('Italy', 33, 0, NOW(), 1),
    ('Uruguay', 33, 1, NOW(), 1),
    
    ('Pelé', 34, 0, NOW(), 1),
    ('Ronaldo Nazário', 34, 0, NOW(), 1),
    ('Miroslav Klose', 34, 1, NOW(), 1),
    ('Lionel Messi', 34, 0, NOW(), 1),
    
	('1 lần', 35, 1, NOW(), 1),
    ('2 lần', 35, 0, NOW(), 1),
    ('3 lần', 35, 0, NOW(), 1),
    ('4 lần', 35, 0, NOW(), 1),
    
    ('Maracanã Stadium, Rio de Janeiro', 36, 0, NOW(), 1),
    ('Estadio Azteca, Mexico City', 36, 0, NOW(), 1),
	('Wembley Stadium, London', 36, 1, NOW(), 1),
    ('San Siro, Milan', 36, 0, NOW(), 1),
   
    ('Vavá', 37, 0, NOW(), 1),
    ('Helmut Rahn', 37, 1, NOW(), 1),
	('Pele', 37, 0, NOW(), 1),
    ('Ferenc Puskás', 37, 0, NOW(), 1),
    
	('Carlos Alberto Parreira', 38, 1, NOW(), 1),
    ('Luiz Felipe Scolari', 38, 0, NOW(), 1),
	('Mario Zagallo', 38, 0, NOW(), 1),
    ('Carlos Bilardo', 38, 0, NOW(), 1),
    
    ('Italy', 39, 0, NOW(), 1),
    ('Uruguay', 39, 0, NOW(), 1),
	('England', 39, 1, NOW(), 1),
    ('West Germany', 39, 0, NOW(), 1),
    
    ('Lionel Messi', 40, 0, NOW(), 1),
    ('Just Fontaine', 40, 0, NOW(), 1),
	('Gerd Müller', 40, 0, NOW(), 1),
    ('Eusébio', 40, 1, NOW(), 1),

	('Một framework lập trình web', 41, 0, NOW(), 1),
    ('Một framework lập trình ứng dụng di động', 41, 0, NOW(), 1),
    ('Một framework lập trình Java được xây dựng trên nền tảng Spring', 41, 1, NOW(), 1),
    ('Một thư viện lập trình giao diện người dùng', 41, 0, NOW(), 1),
    
    ('Quy trình sử dụng các phụ thuộc', 42, 0, NOW(), 1),
    ('Quy trình cung cấp các phụ thuộc cho các lớp khác nhau', 42, 1, NOW(), 1),
    ('Quy trình tự động quản lý các phụ thuộc cho ứng dụng', 42, 0, NOW(), 1),
    ('Quy trình tạo ra các phụ thuộc', 42, 0, NOW(), 1),
    
    ('Một đối tượng mà Spring quản lý', 43, 0, NOW(), 1),
    ('Một lớp Java được chú thích bằng @Bean', 43, 0, NOW(), 1),
    ('Một thành phần của ứng dụng Spring', 43, 0, NOW(), 1),
    ('Tất cả các phương án đều đúng', 43, 1, NOW(), 1),
    
    ('Định nghĩa một lớp là một RESTful controller', 44, 1, NOW(), 1),
    ('Định nghĩa một lớp là một Bean', 44, 0, NOW(), 1),
    ('Định nghĩa một lớp là một component', 44, 0, NOW(), 1),
    ('Định nghĩa một lớp là một service', 44, 0, NOW(), 1),
    
	('Đánh dấu một lớp là một RESTful controller', 45, 0, NOW(), 1),
    ('Chỉ định rằng một trường sẽ được tự động chèn vào bằng cách sử dụng DI', 45, 1, NOW(), 1),
    ('Đánh dấu một lớp là một Bean', 45, 0, NOW(), 1),
    ('Đánh dấu một lớp là một service', 45, 0, NOW(), 1),
    
    ('Quét và tìm các lớp được chú thích bởi @Component để tạo Bean', 46, 1, NOW(), 1),
    ('Quét và tìm các lớp được chú thích bởi @Autowired để tạo Bean', 46, 0, NOW(), 1),
	('Quét và tìm các lớp được chú thích bởi @Service để tạo Bean', 46, 0, NOW(), 1),
    ('Quét và tìm các lớp được chú thích bởi @Repository để tạo Bean', 46, 0, NOW(), 1),
   
    ('Hibernate', 47, 0, NOW(), 1),
    ('JDBC', 47, 0, NOW(), 1),
	('JPA', 47, 0, NOW(), 1),
    ('Tất cả các phương án đều đúng', 47, 1, NOW(), 1),
    
	('Sử dụng tệp application.properties hoặc application.yml', 48, 1, NOW(), 1),
    ('Sử dụng @Bean annotation', 48, 0, NOW(), 1),
	('Sử dụng @Component annotation', 48, 0, NOW(), 1),
    ('Sử dụng @Autowired annotation', 48, 0, NOW(), 1),
    
    ('Một framework lập trình ứng dụng di động', 49, 0, NOW(), 1),
	('Một công cụ giúp tạo ra các endpoint RESTful', 49, 0, NOW(), 1),
    ('Một thư viện hỗ trợ việc xây dựng giao diện người dùng', 49, 0, NOW(), 1),
	('Một công cụ giúp quản lý và giám sát ứng dụng Spring Boot', 49, 1, NOW(), 1),
    
    ('Một cách để khởi động ứng dụng Spring Boot', 50, 0, NOW(), 1),
    ('Một loại phụ thuộc được sử dụng để tự động cấu hình các module cho ứng dụng', 50, 1, NOW(), 1),
	('Một annotation để chỉ định một lớp là một RESTful controller', 50, 0, NOW(), 1),
    ('Một annotation để chỉ định một lớp là một Bean', 50, 0, NOW(), 1),

	('Anime', 51, 0, NOW(), 1),
    ('Manga', 51, 0, NOW(), 1),
    ('JAV', 51, 1, NOW(), 1),
    ('J-Pop', 51, 0, NOW(), 1),
    
    ('Ca sĩ', 52, 0, NOW(), 1),
    ('Diễn viên phim người lớn', 52, 1, NOW(), 1),
    ('Người mẫu', 52, 0, NOW(), 1),
    ('Diễn viên truyền hình', 52, 0, NOW(), 1),
    
    ('AV Open', 53, 0, NOW(), 1),
    ('Tokyo Game Show', 53, 0, NOW(), 1),
    ('AVN Expo', 53, 0, NOW(), 1),
    ('Fanza Expo', 53, 1, NOW(), 1),
    
    ('Tháng 1', 54, 0, NOW(), 1),
    ('Tháng 2', 54, 0, NOW(), 1),
    ('Tháng 3', 54, 0, NOW(), 1),
    ('Tháng 4', 54, 1, NOW(), 1),
    
	('Phim người lớn có nội dung nhẹ nhàng', 55, 0, NOW(), 1),
    ('Hình ảnh sexy của các người mẫu', 55, 1, NOW(), 1),
    ('Phim ngắn người lớn', 55, 0, NOW(), 1),
    ('Phim người lớn dành cho phụ nữ', 55, 0, NOW(), 1),
    
    ('Sự phát triển của internet', 56, 1, NOW(), 1),
    ('Sự hỗ trợ của chính phủ Nhật Bản', 56, 0, NOW(), 1),
	('Sự đa dạng và sáng tạo trong sản xuất', 56, 0, NOW(), 1),
    ('Sự phổ biến của các diễn viên nổi tiếng', 56, 0, NOW(), 1),
   
    ('Yui Nagase', 57, 0, NOW(), 1),
    ('Momo Sakura', 57, 1, NOW(), 1),
	('Maria Ozawa', 57, 0, NOW(), 1),
    ('Eimi Fukada', 57, 0, NOW(), 1),
    
    ('Tokude', 58, 0, NOW(), 1),
	('Takudo', 58, 0, NOW(), 1),
    ('Tokuda', 58, 1, NOW(), 1),
    ('Tadoku', 58, 0, NOW(), 1),
    
    ('Maria Ozawa', 59, 1, NOW(), 1),
	('Moria Azawa', 59, 0, NOW(), 1),
    ('Eimi Fukada', 59, 0, NOW(), 1),
	('Eima Fakadu', 59, 0, NOW(), 1),
    
    ('Dịch vụ tắm gội', 60, 1, NOW(), 1),
    ('Dịch vụ ẩm thực', 60, 0, NOW(), 1),
	('Mát xa', 60, 1, NOW(), 1),
    ('Dịch vụ giải trí sống động', 60, 0, NOW(), 1),
	('Dịch vụ học tập', 60, 0, NOW(), 1)
;

insert into comment(id, participant_id, quiz_id, reply, parent_comment_id, created_date, created_by)
values
	(1, 4, 2, 'bài quiz về chính trị mỹ cũng hay đó làm biết thêm nước mỹ nhưng tui có một thắc mắc :))', null, now(), 4),
    (2, 5, 3, 'Tôi fan messi nhưng chỉ trả lời được có vài câu :(', null, now(), 5),
    (3, 8, 6, 'Bài quiz về jav khá hài nhỉ làm phát quay tay thôi kk', null, now(), 8),
    (4, 2, 2, 'Thắc mắc gì z ba ?', 1, now(), 2),
    (5, 4, 2, 'Đù được admin reply luôn nè kk', 4, now(), 4),
    (6, 10, 6, 'Bớt bớt để lại cho vợ đi :)', 3, now(), 10)
;
    
insert into participant_quiz(id, participant_id, quiz_id, is_finished, time_start, time_end, created_date, created_by)
values
	(1, 4, 2, 1, date_add(now(), interval 1 hour), date_add(now(), interval 2 hour), now(), 4),
    (2, 5, 3, 1, date_add(now(), interval 4 hour), date_add(now(), interval 5 hour), now(), 5),
	(3, 8, 6, 1, date_add(now(), interval 3 hour), date_add(now(), interval 4 hour), now(), 8)
;

insert into participant_question_answer(id, participant_id, question_id, user_answer, created_date, created_by)
values
	# người dùng có id 4 trả lời bài quiz có id 2
	(1, 4, 11, 'George Washington', now(), 4), 
    (2, 4, 12, 'John F. Kennedy', now(), 4),
    (3, 4, 13, '2020', now(), 4),
    (4, 4, 14, 'Woodrow Wilson', now(), 4),
    (5, 4, 15, 'George W. Bush', now(), 4),
    (6, 4, 16, 'Donald Trump', now(), 4),
    (7, 4, 17, 'Andrew Jackson', now(), 4),
    (8, 4, 18, 'Abraham Lincoln', now(), 4),
    (9, 4, 19, 'Barack Obama', now(), 4),
    (10, 4, 20, 'Quốc hội Liên bang', now(), 4),
    (11, 4, 20, 'Hạ viện', now(), 4),
	(12, 4, 20, 'Quốc hội dân chủ', now(), 4),
    
	# người dùng có id 5 trả lời bài quiz có id 3  
    (13, 5, 21, 'Thiago', now(), 5),
    (14, 5, 22, 'Xavi Alonso', now(), 5),
    (15, 5, 23, 'Paris Saint-Germain (PSG)', now(), 5),
    (16, 5, 24, '12 tháng 8 năm 1988, ở Madrid, Tây Ban Nha', now(), 5),
    (17, 5, 25, '2003', now(), 5),
    (18, 5, 26, '2009', now(), 5),
    (19, 5, 27, '8', now(), 5),
    (20, 5, 28, '11 lần', now(), 5),
    (21, 5, 29, 'Lionel Andrés Messi', now(), 5),
	(22, 5, 30, 'El Matador', now(), 5),
    
	# người dùng có id 8 trả lời bài quiz có id là 6
    (23, 8, 51, 'JAV', now(), 8),
    (24, 8, 52, 'Diễn viên phim người lớn', now(), 8),
    (25, 8, 53, 'AV Open', now(), 8),
    (26, 8, 54, 'Tháng 4', now(), 8),
    (27, 8, 55, 'Phim người lớn có nội dung nhẹ nhàng', now(), 8),
    (28, 8, 56, 'Sự phát triển của internet', now(), 8),
    (29, 8, 57, 'Eimi Fukada', now(), 8),
    (30, 8, 58, 'Tokuda', now(), 8),
    (31, 8, 59, 'Maria Ozawa', now(), 8),
    (32, 8, 60, 'Dịch vụ tắm gội', now(), 8),
    (33, 8, 60, 'Mát xa', now(), 8)
;

insert into history(id, participant_id, quiz_id, total_questions, total_correct, created_date, created_by)
values
	(1, 4, 2, 10, 5, date_add(now(), interval 2 hour), 4),
	(2, 5, 3, 10, 6, date_add(now(), interval 5 hour), 5),
	(3, 8, 6, 10, 7, date_add(now(), interval 4 hour), 8)