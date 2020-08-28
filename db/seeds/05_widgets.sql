-- Widgets table seeds here (Example)
INSERT INTO quizzes (owner_id, name, description, photo_url, active, date) VALUES (1, 'New Quiz', 'testing new quiz', 'https://images.pexels.com/photos/2099019/pexels-photo-2099019.jpeg', true, '2020-08-25');

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

--Sample Quiz (Star Wars Trivia)
INSERT INTO quizzes (owner_id, name, description, photo_url, active, date) VALUES (1, 'Star Wars Trivia', 'test your knowledge of a galaxy far far away', 'https://images.pexels.com/photos/2099019/pexels-photo-2099019.jpeg', true, '2020-08-28');

INSERT INTO questions (quiz_id, question) VALUES (2, 'Who is Luke Skywalkers father?');
INSERT INTO questions (quiz_id, question) VALUES (2, 'What is the name of Han Solos ship?');
INSERT INTO questions (quiz_id, question) VALUES (2, 'Name the title of Star Wars Episode 4');

INSERT INTO answers (question_id, answer, correct) VALUES (4, 'Yoda', FALSE);
INSERT INTO answers (question_id, answer, correct) VALUES (4, 'Ben Kenobi', FALSE);
INSERT INTO answers (question_id, answer, correct) VALUES (4, 'Chewbacca', FALSE);
INSERT INTO answers (question_id, answer, correct) VALUES (4, 'Darth Vader', TRUE);

INSERT INTO answers (question_id, answer, correct) VALUES (5, 'R2D2', FALSE);
INSERT INTO answers (question_id, answer, correct) VALUES (5, 'Millenium Falcon', TRUE);
INSERT INTO answers (question_id, answer, correct) VALUES (5, 'Corellian Corvette', FALSE);
INSERT INTO answers (question_id, answer, correct) VALUES (5, 'Jabba the Hutt', FALSE);

INSERT INTO answers (question_id, answer, correct) VALUES (6, 'Phantom Menace', FALSE);
INSERT INTO answers (question_id, answer, correct) VALUES (6, 'Mandalorian', FALSE);
INSERT INTO answers (question_id, answer, correct) VALUES (6, 'Force Awakens', FALSE);
INSERT INTO answers (question_id, answer, correct) VALUES (6, 'A New Hope', TRUE);

--Sample Quiz (Harry Potter Trivia)
INSERT INTO quizzes (owner_id, name, description, photo_url, active, date) VALUES (1, 'Harry Potter Trivia', 'Test you knowledge of the school of wizardry', 'https://images.pexels.com/photos/2099019/pexels-photo-2099019.jpeg', true, '2020-08-28');

INSERT INTO questions (quiz_id, question) VALUES (3, 'Who is the half-blood prince?');
INSERT INTO questions (quiz_id, question) VALUES (3, 'What is the name of the school Harry Potter attended?');
INSERT INTO questions (quiz_id, question) VALUES (3, 'What sport did Harry Potter play?');

INSERT INTO answers (question_id, answer, correct) VALUES (7, 'Harry Potter', FALSE);
INSERT INTO answers (question_id, answer, correct) VALUES (7, 'Sirius Black', FALSE);
INSERT INTO answers (question_id, answer, correct) VALUES (7, 'Dumbledore', FALSE);
INSERT INTO answers (question_id, answer, correct) VALUES (7, 'Severus Snape', TRUE);

INSERT INTO answers (question_id, answer, correct) VALUES (8, 'Harvard', FALSE);
INSERT INTO answers (question_id, answer, correct) VALUES (8, 'Beauxbatons Academy of Magic', FALSE);
INSERT INTO answers (question_id, answer, correct) VALUES (8, 'Hogwarts', TRUE);
INSERT INTO answers (question_id, answer, correct) VALUES (8, 'Castelobruxo', FALSE);

INSERT INTO answers (question_id, answer, correct) VALUES (9, 'Table Tennis', FALSE);
INSERT INTO answers (question_id, answer, correct) VALUES (9, 'Wizards chess', FALSE);
INSERT INTO answers (question_id, answer, correct) VALUES (9, 'Quidditch', TRUE);
INSERT INTO answers (question_id, answer, correct) VALUES (9, 'Wrestling', FALSE);

-- INSERT INTO ratings (quiz_id, quiz_attempts_id, rating) VALUES (1, 1, 3);
-- INSERT INTO widgets (name, user_id) VALUES ('Sprockets', 1);
-- INSERT INTO widgets (name, user_id) VALUES ('Chains', 2);
-- INSERT INTO widgets (name, user_id) VALUES ('Bearings', 2);

-- INSERT INTO quizzes (user_id, name, genre, description, photo_url, active, date) VALUES
-- (1, 'Quiz - 1', 'Sports', 'Quiz about Sports','url', TRUE, now());

-- INSERT INTO quizzes (user_id, name, genre, description, photo_url, active, date) VALUES
-- (2, 'Quiz - 2', 'javascript', 'Quiz about javascript','url', TRUE, now());

-- INSERT INTO quizzes (user_id, name, genre, description, photo_url, active, date) VALUES
-- (1, 'Quiz - 3', 'Politics', 'Quiz about Politics','url', TRUE, now());

-- INSERT INTO quizzes (user_id, name, genre, description, photo_url, active, date) VALUES
-- (2, 'Quiz - 4', 'Films', 'Quiz about Films','url', TRUE, now());

-- INSERT INTO quizzes (user_id, name, genre, description, photo_url, active, date) VALUES
-- (1, 'Quiz - 5', 'Birds', 'Quiz about Birds','url', TRUE, now());

-- INSERT INTO quiz_attempts (user_id, quiz_id, results, date, start_time, end_time) VALUES (1, 1, '1/1', '2020-08-24', '2020-08-24T08:05:00.000Z', '2018-08-24T08:21:20.000Z');

-- INSERT INTO ratings (quiz_id, quiz_attempts_id, rating) VALUES (1, 1, 3);

