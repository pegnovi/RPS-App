CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS users;
/*
	Store password in plaintext for now
	Hash it and store salt later
*/
CREATE TABLE users(
	id character varying,
	username character varying,
	password character varying,
	PRIMARY KEY (id)
);
