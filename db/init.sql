CREATE TABLE IF NOT EXISTS "hello_world" (
    id SERIAL PRIMARY KEY,
    message TEXT NOT NULL
);

INSERT INTO "hello_world" (message) VALUES ('Hello, World!');
