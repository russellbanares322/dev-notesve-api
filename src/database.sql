CREATE DATABASE db_devnotes;

CREATE TABLE tbl_devnotes(
    devnote_id SERIAL PRIMARY KEY,
    title VARCHAR(100),
    category VARCHAR(100),
    content VARCHAR(1000),
    author_id VARCHAR(250),
    date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_author
        FOREIGN KEY (author_id)
        REFERENCES tbl_users (user_id)
        ON DELETE CASCADE
);

CREATE TABLE tbl_users(
    user_id VARCHAR(250) PRIMARY KEY,
    first_name VARCHAR(200),
    last_name VARCHAR(200),
    date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);