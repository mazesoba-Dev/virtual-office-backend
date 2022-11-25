DROP DATABASE IF EXISTS development;
CREATE DATABASE development;

USE development;

DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id int NOT NULL AUTO_INCREMENT primary key,
    name varchar(30)
);

INSERT INTO users (id, name) VALUES (1, 'Junya');
INSERT INTO users (id, name) VALUES (2, 'Kanta');
INSERT INTO users (id, name) VALUES (3, 'Motoki');
INSERT INTO users (id, name) VALUES (4, 'Taisei');
INSERT INTO users (id, name) VALUES (5, 'Yuto');
