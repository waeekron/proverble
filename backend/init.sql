DROP TABLE IF EXISTS proverbs;

CREATE TABLE proverbs (
    id SERIAL PRIMARY KEY,
    content VARCHAR(255) NOT NULL
);

COPY proverbs(content)
FROM '/proverbs.csv' DELIMITER ',' CSV HEADER;


