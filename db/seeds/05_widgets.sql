-- Widgets table seeds here (Example)
INSERT INTO quizzes (owner_id, name, description, photo_url, active, date) VALUES (1, 'New Quiz', 'testing new quiz', 'https://images.pexels.com/photos/2099019/pexels-photo-2099019.jpeg', true, '2020-08-25');

INSERT INTO questions (quiz_id, question) VALUES (1, 'This is a Question');

INSERT INTO answers (question_id, answer, correct) VALUES (1, 'This is the answer', true);
INSERT INTO answers (question_id, answer, correct) VALUES (1, 'This is NOT the answer', false);
INSERT INTO answers (question_id, answer, correct) VALUES (1, 'This is NOT the answer', false);
INSERT INTO answers (question_id, answer, correct) VALUES (1, 'This is NOT the answer', false);

-- INSERT INTO quiz_attempts (user_id, quiz_id, results, date, start_time, end_time) VALUES (1, 1, '1/1', '2020-08-24', '2020-08-24T08:05:00.000Z', '2018-08-24T08:21:20.000Z');

-- INSERT INTO ratings (quiz_id, quiz_attempts_id, rating) VALUES (1, 1, 3);

