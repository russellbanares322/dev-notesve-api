CREATE DATABASE db_devnotes;

CREATE TABLE tbl_devnotes (
    devnote_id SERIAL PRIMARY KEY,
    user_id VARCHAR(250) NOT NULL REFERENCES tbl_users(user_id) ON DELETE CASCADE,
    title VARCHAR(100),
    category VARCHAR(100),
    content TEXT,
    date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tbl_users(
    user_id VARCHAR(250) PRIMARY KEY,
    first_name VARCHAR(200),
    last_name VARCHAR(200),
    date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);