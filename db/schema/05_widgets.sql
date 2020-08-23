-- Drop and recreate Widgets table (Example)

DROP TABLE IF EXISTS quizzes CASCADE;
DROP TABLE IF EXISTS questions CASCADE;
DROP TABLE IF EXISTS quiz_attempts CASCADE;
DROP TABLE IF EXISTS ratings CASCADE;

CREATE TABLE quizzes (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id),
  name VARCHAR(255) NOT NULL,
  genre VARCHAR(255) NOT NULL,
  description TEXT,
  photo_url VARCHAR(255) NOT NULL,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  date DATE NOT NULL
);

CREATE TABLE questions (
  id SERIAL PRIMARY KEY NOT NULL,
  quiz_id INTEGER REFERENCES quizzes(id),
  question TEXT,
  answer TEXT
)

CREATE TABLE quiz_attempts (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id),
  quiz_id INTEGER REFERENCES quizzes(id),
  results TEXT,
  date DATE NOT NULL,
  start_time TIMESTAMP,
  end_time TIMESTAMP
)

CREATE TABLE ratings (
  id SERIAL PRIMARY KEY NOT NULL,
  quiz_id INTEGER REFERENCES quizzes(id),
  quiz_attempts_id INTEGER REFERENCES quiz_attempts(id),
  rating INTEGER
)
