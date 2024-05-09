insert into user(email, enabled, full_name, password, avatar, created_by, created_date, modified_by, modified_date)
value(
"admin@gmail.com", 
	1, 
	"Administrator",
 "$2a$10$ntWqpfLp8oOO4KYM7.TK6edVeoE07hgeWaHJ.LMqACdZ8QWWN0hGe", 
 "https://res.cloudinary.com/dixswfj8d/image/upload/v1708569189/fake-store-api-images/users/Anonymous%20User.png",
	1,
    now(),
    1,
    now()
 )
