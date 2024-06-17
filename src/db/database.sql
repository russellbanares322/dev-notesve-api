CREATE DATABASE db_devnotes;

CREATE TABLE tbl_devnotes(
    dev_note_id SERIAL PRIMARY KEY,
    category VARCHAR(100),
    content VARCHAR(1000),
    author_id VARCHAR(250),
    date_created TIMESTAMP NOT NULL
);