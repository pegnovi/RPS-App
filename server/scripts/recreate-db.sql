CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS users;
/*
	Store password in plaintext for now
	Hash it and store salt later
*/
CREATE TABLE users(
	id uuid DEFAULT uuid_generate_v4 (),
	username character varying,
	password_hash character varying,
	PRIMARY KEY (id)
);
