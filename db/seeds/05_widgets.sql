-- Widgets table seeds here (Example)
INSERT INTO quizzes (name, user_id, name, genre, description, photo_url, active, date) VALUES (1, 'new quiz', 'fun', 'a new quiz', 'https://images.pexels.com/photos/2099019/pexels-photo-2099019.jpeg', true, '2020-08-23');

INSERT INTO questions (quiz_id, question, answer) VALUES (1, "How old am I?", "25 years old");

INSERT INTO quiz_attempts (user_id, quiz_id, results, date, start_time, end_time) VALUES (1, 1, "1/1", '2020-08-24', '2020-08-24T08:05:00.000Z', '2018-08-24T08:21:20.000Z',);

INSERT INTO ratings (quiz_id, quiz_attempts_id, rating) VALUES (1, 1, 3);

