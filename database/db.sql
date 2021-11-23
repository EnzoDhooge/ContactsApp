-- CREATE DATABASE database_contactapp;

-- USE database_contactapp;

CREATE TABLE users(
    id INT(100) NOT NULL UNIQUE PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(20) NOT NULL,
    password VARCHAR(100) NOT NULL,
    fullname VARCHAR(100) NOT NULL
);


CREATE TABLE numberphone(
    id INT(100) NOT NULL UNIQUE PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(20) NOT NULL,
    number VARCHAR(30) NOT NULL,
    user_id INT(100) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
);