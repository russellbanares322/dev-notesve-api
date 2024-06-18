CREATE DATABASE db_devnotes;

CREATE TABLE tbl_devnotes(
    devNoteId SERIAL PRIMARY KEY,
    category VARCHAR(100),
    content VARCHAR(1000),
    authorId VARCHAR(250),
    dateCreated TIMESTAMP NOT NULL
);