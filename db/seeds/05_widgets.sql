-- Widgets table seeds here (Example)
INSERT INTO quizzes (owner_id, name, genre, description, photo_url, active, date) VALUES (1, 'New Quiz', 'idk', 'testing new quiz', 'https://images.pexels.com/photos/2099019/pexels-photo-2099019.jpeg', true, '2020-08-25');

INSERT INTO questions (quiz_id, question) VALUES (1, 'This is a Question');
INSERT INTO questions (quiz_id, question) VALUES (1, 'How old am I?');
INSERT INTO questions (quiz_id, question) VALUES (1, 'Whats my favourite food?');

INSERT INTO answers (question_id, answer, correct) VALUES (2, '25 years old', TRUE);
INSERT INTO answers (question_id, answer, correct) VALUES (2, '24 years old', FALSE);
INSERT INTO answers (question_id, answer, correct) VALUES (3, 'Sushi', TRUE);
INSERT INTO answers (question_id, answer, correct) VALUES (3, 'Pasta', FALSE);

INSERT INTO answers (question_id, answer, correct) VALUES (1, 'This is the answer', true);
INSERT INTO answers (question_id, answer, correct) VALUES (1, 'This is NOT the answer', false);
INSERT INTO answers (question_id, answer, correct) VALUES (1, 'This is NOT the answer', false);
INSERT INTO answers (question_id, answer, correct) VALUES (1, 'This is NOT the answer', false);

-- INSERT INTO ratings (quiz_id, quiz_attempts_id, rating) VALUES (1, 1, 3);
INSERT INTO widgets (name, user_id) VALUES ('Sprockets', 1);
INSERT INTO widgets (name, user_id) VALUES ('Chains', 2);
INSERT INTO widgets (name, user_id) VALUES ('Bearings', 2);

INSERT INTO quizzes (owner_id, name, genre, description, photo_url, active, date) VALUES
(1, 'Quiz - 1', 'Sports', 'Quiz about Sports','url', TRUE, now());

INSERT INTO quizzes (owner_id, name, genre, description, photo_url, active, date) VALUES
(2, 'Quiz - 2', 'javascript', 'Quiz about javascript','url', TRUE, now());

INSERT INTO quizzes (owner_id, name, genre, description, photo_url, active, date) VALUES
(1, 'Quiz - 3', 'Politics', 'Quiz about Politics','url', TRUE, now());

INSERT INTO quizzes (owner_id, name, genre, description, photo_url, active, date) VALUES
(2, 'Quiz - 4', 'Films', 'Quiz about Films','url', TRUE, now());

INSERT INTO quizzes (owner_id, name, genre, description, photo_url, active, date) VALUES
(1, 'Quiz - 5', 'Birds', 'Quiz about Birds','url', TRUE, now());

INSERT INTO quiz_attempts (user_id, quiz_id, results, date, start_time, end_time) VALUES (1, 1, '1/1', '2020-08-24', '2020-08-24T08:05:00.000Z', '2018-08-24T08:21:20.000Z');

INSERT INTO ratings (quiz_id, quiz_attempts_id, rating) VALUES (1, 1, 3);

