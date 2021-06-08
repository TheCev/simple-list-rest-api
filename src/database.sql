CREATE DATABASE simple_list;

USE simple_list;

CREATE TABLE users (user_id INT(10) AUTO_INCREMENT PRIMARY KEY,
 					username varchar(30) NOT NULL,
 					password varchar(60) NOT NULL,
 					email varchar(60) NOT NULL);


CREATE TABLE lists (list_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
					user_id INT, 
					list_title TEXT,
					FOREIGN KEY(user_id) REFERENCES users(user_id));


CREATE TABLE items (item_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
					user_id INT NOT NULL, 
					list_id INT not NULL, 
					item_title varchar(60),
					item_state char(1) default 'N',
					FOREIGN KEY(user_id) REFERENCES users(user_id),
					FOREIGN KEY(list_id) REFERENCES lists(list_id));