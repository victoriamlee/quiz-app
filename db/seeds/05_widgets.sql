-- Widgets table seeds here (Example)
INSERT INTO quizzes (user_id, name, genre, description, photo_url, active, date) VALUES (1, 'new quiz', 'fun', 'a new quiz', 'https://images.pexels.com/photos/2099019/pexels-photo-2099019.jpeg', true, '2020-08-23');

INSERT INTO questions (quiz_id, question, answer) VALUES (1, 'How old am I?', '25 years old');

INSERT INTO quiz_attempts (user_id, quiz_id, results, date, start_time, end_time) VALUES (1, 1, '60', '2020-08-26', '2020-08-26T08:05:00.000Z', '2018-08-26T08:21:20.000Z');
INSERT INTO quiz_attempts (user_id, quiz_id, results, date, start_time, end_time) VALUES (1, 1, '70', '2020-08-24', '2020-08-24T08:05:00.000Z', '2018-08-24T08:21:20.000Z');
INSERT INTO quiz_attempts (user_id, quiz_id, results, date, start_time, end_time) VALUES (2, 1, '65', '2020-08-24', '2020-08-24T08:05:00.000Z', '2018-08-24T08:21:20.000Z');
INSERT INTO quiz_attempts (user_id, quiz_id, results, date, start_time, end_time) VALUES (2, 1, '80', '2020-08-23', '2020-08-23T08:05:00.000Z', '2018-08-23T08:21:20.000Z');
INSERT INTO quiz_attempts (user_id, quiz_id, results, date, start_time, end_time) VALUES (1, 1, '45', '2020-08-23', '2020-08-23T08:05:00.000Z', '2018-08-23T08:21:20.000Z');


INSERT INTO ratings (quiz_id, quiz_attempts_id, rating) VALUES (1, 1, 3);
INSERT INTO widgets (name, user_id) VALUES ('Sprockets', 1);
INSERT INTO widgets (name, user_id) VALUES ('Chains', 2);
INSERT INTO widgets (name, user_id) VALUES ('Bearings', 2);

INSERT INTO quizzes (user_id, name, genre, description, photo_url, active, date) VALUES
(1, 'Quiz - 1', 'Sports', 'Quiz about Sports','url', TRUE, now());

INSERT INTO quizzes (user_id, name, genre, description, photo_url, active, date) VALUES
(2, 'Quiz - 2', 'javascript', 'Quiz about javascript','url', TRUE, now());

INSERT INTO quizzes (user_id, name, genre, description, photo_url, active, date) VALUES
(1, 'Quiz - 3', 'Politics', 'Quiz about Politics','url', TRUE, now());

INSERT INTO quizzes (user_id, name, genre, description, photo_url, active, date) VALUES
(2, 'Quiz - 4', 'Films', 'Quiz about Films','url', TRUE, now());

INSERT INTO quizzes (user_id, name, genre, description, photo_url, active, date) VALUES
(1, 'Quiz - 5', 'Birds', 'Quiz about Birds','url', TRUE, now());


