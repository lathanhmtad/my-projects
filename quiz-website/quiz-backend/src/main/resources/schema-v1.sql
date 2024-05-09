create database quiz;

use quiz;

drop table if exists
	participant,
    refresh_token,
    category,
    quiz,
    question,
    answer,
    history,
    participant_quiz,
    participant_quiz_answer,
    comment;
	
create table participant
(
	id 						bigint auto_increment 	not null,
	email 					varchar(255) 			not null,
    username				varchar(255)			not null,
	full_name 				varchar(255) 			not null,
	password 				varchar(255) 			not null,
	role	 				varchar(255)		 	not null,
	avatar 					varchar(255) 			null,
    enabled 				bit(1)					not null,
	created_date           	datetime              	not null,
	created_by           	bigint                	not null,
    updated_date           	datetime              	null,
    updated_by           	bigint                	null,
    constraint pk_participant primary key (id)
);
alter table participant
	add constraint uc_participant_email unique(email);
alter table participant
	add constraint uc_participant_username unique(username);

create table refresh_token
(
	id 						bigint auto_increment 	not null,
    participant_id			bigint 					not null,
    token 					varchar(255)			not null,
    expiry_date				datetime				not null,
    created_date           	datetime              	not null,
	created_by           	bigint                	not null,
    updated_date           	datetime              	null,
    updated_by           	bigint                	null,
	constraint pk_refresh_token primary key (id)
);
alter table refresh_token
	add constraint uc_participant_token unique(token);
alter table refresh_token
	add constraint uc_participant_id unique(participant_id);
alter table refresh_token
	add constraint fk_refresh_token_on_participant_id foreign key (participant_id) references participant(id);

create table category
(
	id 						bigint auto_increment	not null,
    name					varchar(255)			not null,
    image					varchar(255)			null,
    enabled					bit(1)					not null,
    parent_id				bigint 					null,
	created_date           	datetime             	not null,
	created_by           	bigint                	not null,
    updated_date           	datetime              	null,
    updated_by           	bigint                	null,
    constraint pk_category primary key (id)
);
alter table category
	add constraint uc_category_name unique(name);
alter table category
    add constraint fk_category_on_parent_id foreign key (parent_id) references category (id);

create table quiz
(
	id 						bigint auto_increment 	not null,
    name 					varchar(255) 			not null,
    description 			varchar(255) 			not null,
    image 					varchar(255) 			null,
    difficulty 				varchar(255) 			not null,
    category_id				bigint					not null,
	created_date           	datetime             	not null,
	created_by           	bigint                	not null,
    updated_date           	datetime              	null,
    updated_by           	bigint                	null,
    constraint pk_quiz primary key (id)
);
alter table quiz
	add constraint uc_quiz_name unique(name);
alter table quiz
    add constraint fk_quiz_on_category_id foreign key (category_id) references category (id);
    
create table question
(
	id 						bigint auto_increment 	not null,
    description				varchar(255)			not null,
    image					varchar(255)			null,
    quiz_id					bigint					not null,
    type					varchar(255)			not null,
    created_date           	datetime             	not null,
	created_by           	bigint                	not null,
    updated_date           	datetime              	null,
    updated_by           	bigint                	null,
    constraint pk_question primary key (id)
);
alter table question
    add constraint fk_question_on_quiz_id foreign key (quiz_id) references quiz (id);
    
create table answer
(
	id 						bigint auto_increment 	not null,
    description				varchar(255)			null,
    correct_answer			bit(1)					not null,
    question_id				BIGINT					not null,
	created_date           	datetime             	not null,
	created_by           	bigint                	not null,
    updated_date           	datetime              	null,
    updated_by           	bigint                	null,
	constraint pk_answer primary key (id)
);
alter table answer
     add constraint fk_answer_on_question_id foreign key (question_id) references question (id);

create table history
(
	id 						bigint auto_increment 	not null,
    participant_id 			bigint 					NOT NULL,
    quiz_id 				bigint 					not null,
    total_questions 		tinyint 				not null,
    total_correct 			tinyint 				not null,
	created_date           	datetime             	not null,
	created_by           	bigint                	not null,
    updated_date           	datetime              	null,
    updated_by           	bigint                	null,
    constraint pk_history primary key (id)
);
alter table history
     add constraint fk_history_on_participant_id foreign key (participant_id) references participant (id);
alter table history
     add constraint fk_history_on_quiz_id foreign key (quiz_id) references quiz (id);

create table participant_quiz
(
	id 						bigint auto_increment 	not null,
	participant_id 			bigint					not null,
    quiz_id					bigint					not null,
    is_finished				bit(1)					not null,
    time_start				datetime				not null,
    time_end 				datetime				null,
    created_date           	datetime             	not null,
	created_by           	bigint                	not null,
    updated_date           	datetime              	null,
    updated_by           	bigint                	null,
	constraint pk_participant_quiz primary key (id)
);
alter table participant_quiz
	add constraint fk_participant_quiz_on_participant_id foreign key (participant_id) references participant(id);
alter table participant_quiz
	add constraint fk_participant_quiz_on_quiz_id foreign key (quiz_id) references quiz(id);

create table participant_quiz_answer
(
	id 						bigint auto_increment 	not null,
	participant_id 			bigint					not null,
	quiz_id					bigint					not null,
    question_id 			bigint					not null,
    user_answer				varchar(255)			null,
    created_date           	datetime             	not null,
	created_by           	bigint                	not null,
    updated_date           	datetime              	null,
    updated_by           	bigint                	null,
	constraint pk_participant_quiz_answer primary key (id)
);
alter table participant_quiz_answer
	add constraint fk_participant_quiz_answer_on_participant_id foreign key (participant_id) references participant(id);
alter table participant_quiz_answer
	add constraint fk_participant_quiz_answer_on_quiz_id foreign key (quiz_id) references quiz(id);
alter table participant_quiz_answer
	add constraint fk_participant_quiz_answer_on_question_id foreign key (question_id) references question(id);
    
create table comment
(
	id 						bigint auto_increment 	not null,
    participant_id			bigint					not null,
    quiz_id					bigint					not null,
    reply					varchar(255)			not null,
    parent_comment_id		bigint					null,
    created_date           	datetime             	not null,
	created_by           	bigint                	not null,
    updated_date           	datetime              	null,
    updated_by           	bigint                	null,
	constraint pk_comment primary key (id)
);
alter table comment
	add constraint fk_comment_on_participant_id foreign key (participant_id) references participant(id);
alter table comment
	add constraint fk_comment_on_quiz_id foreign key (quiz_id) references quiz(id);
alter table comment
	add constraint fk_comment_on_parent_commnet_id foreign key(parent_comment_id) references comment(id);