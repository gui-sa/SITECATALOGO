DROP DATABASE SITECATALOGO;
CREATE DATABASE SITECATALOGO;
USE SITECATALOGO;

CREATE TABLE USERS(
    users_id  int NOT NULL AUTO_INCREMENT,
    first_name varchar(45),  
    last_name varchar(45),
    email varchar(45),
    phone varchar(45),
    comments varchar(100),
    status varchar(10),
    PRIMARY KEY (users_id)
);