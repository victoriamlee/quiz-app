-- Widgets table seeds here (Example)

-- Insert data into 'quizzes' Table
INSERT INTO quizzes (owner_id, name, genre, description, photo_url, active, date) VALUES
(1, 'GK Quiz', 'General Knowledge', 'A brain challenger!', 'https://images.pexels.com/photos/2099019/pexels-photo-2099019.jpeg', true, '2020-08-23');
INSERT INTO quizzes (owner_id, name, genre, description, photo_url, active, date) VALUES
(1, 'Star Wars Trivia', 'Films', 'Test your knowledge of a galaxy far far away', 'https://images.pexels.com/photos/2099019/pexels-photo-2099019.jpeg', true, '2020-08-28');
INSERT INTO quizzes (owner_id, name, genre, description, photo_url, active, date) VALUES
(1, 'Harry Potter Trivia', 'Films', 'Test you knowledge of the school of wizardry', 'https://images.pexels.com/photos/2099019/pexels-photo-2099019.jpeg', true, '2020-08-28');
INSERT INTO quizzes (owner_id, name, genre, description, photo_url, active, date) VALUES
(1, 'Hockey Quiz', 'Sports', 'A quiz on world hockey!','url', TRUE, now());
INSERT INTO quizzes (owner_id, name, genre, description, photo_url, active, date) VALUES
(2, 'Javascript Quiz', 'Programming', 'How good are you @ js?','url', TRUE, now());
INSERT INTO quizzes (owner_id, name, genre, description, photo_url, active, date) VALUES
(1, 'Canadian Politics Quiz', 'Politics', 'How much do you know about Canadian politics?','url', TRUE, now());
INSERT INTO quizzes (owner_id, name, genre, description, photo_url, active, date) VALUES
(2, 'Hollywod Quiz', 'Art', 'Check your knowledge on hollywood films.','url', TRUE, now());
INSERT INTO quizzes (owner_id, name, genre, description, photo_url, active, date) VALUES
(1, 'Space Quiz', 'Science', 'A quiz for space enthusiasts.','url', TRUE, now());


-- Insert data into 'questions' Table
INSERT INTO questions (quiz_id, question) VALUES (1, 'What is the official name for coronavirus disease?');
INSERT INTO questions (quiz_id, question) VALUES (1, 'What is the capital of Canada?');
INSERT INTO questions (quiz_id, question) VALUES (1, 'Which is the longest river in the world?');

INSERT INTO questions (quiz_id, question) VALUES (2, 'Who is Luke Skywalkers father?');
INSERT INTO questions (quiz_id, question) VALUES (2, 'What is the name of Han Solos ship?');
INSERT INTO questions (quiz_id, question) VALUES (2, 'Name the title of Star Wars Episode 4');

INSERT INTO questions (quiz_id, question) VALUES (3, 'Who is the half-blood prince?');
INSERT INTO questions (quiz_id, question) VALUES (3, 'What is the name of the school Harry Potter attended?');
INSERT INTO questions (quiz_id, question) VALUES (3, 'What sport did Harry Potter play?');


-- Insert data into 'answers' Table
INSERT INTO answers (question_id, answer, correct) VALUES (1, 'COVID-19', FALSE);
INSERT INTO answers (question_id, answer, correct) VALUES (1, 'EBOLA-CoV-1', FALSE);
INSERT INTO answers (question_id, answer, correct) VALUES (1, 'SARS-CoV-2', TRUE);
INSERT INTO answers (question_id, answer, correct) VALUES (1, 'CORONA-CoV-G', FALSE);
INSERT INTO answers (question_id, answer, correct) VALUES (2, 'Vancouver', FALSE);
INSERT INTO answers (question_id, answer, correct) VALUES (2, 'Toronto', FALSE);
INSERT INTO answers (question_id, answer, correct) VALUES (2, 'Ottawa', TRUE);
INSERT INTO answers (question_id, answer, correct) VALUES (2, 'Montreal', FALSE);
INSERT INTO answers (question_id, answer, correct) VALUES (3, 'Nile', TRUE);
INSERT INTO answers (question_id, answer, correct) VALUES (3, 'Amazon', FALSE);
INSERT INTO answers (question_id, answer, correct) VALUES (3, 'Yangtze', FALSE);
INSERT INTO answers (question_id, answer, correct) VALUES (3, 'Yellow River', FALSE);

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
INSERT INTO answers (question_id, answer, correct) VALUES (6, 'Force Awakens', TRUE);
INSERT INTO answers (question_id, answer, correct) VALUES (6, 'A New Hope', FALSE);

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


-- Insert data into 'quiz_attempts' Table
INSERT INTO quiz_attempts (user_id, quiz_id, results, date, start_time, end_time) VALUES (1, 1, '60', '2020-08-26', '2020-08-26T08:05:00.000Z', '2018-08-26T08:21:20.000Z');
INSERT INTO quiz_attempts (user_id, quiz_id, results, date, start_time, end_time) VALUES (1, 1, '70', '2020-08-24', '2020-08-24T08:05:00.000Z', '2018-08-24T08:21:20.000Z');
INSERT INTO quiz_attempts (user_id, quiz_id, results, date, start_time, end_time) VALUES (2, 1, '65', '2020-08-24', '2020-08-24T08:05:00.000Z', '2018-08-24T08:21:20.000Z');
INSERT INTO quiz_attempts (user_id, quiz_id, results, date, start_time, end_time) VALUES (2, 1, '80', '2020-08-23', '2020-08-23T08:05:00.000Z', '2018-08-23T08:21:20.000Z');
INSERT INTO quiz_attempts (user_id, quiz_id, results, date, start_time, end_time) VALUES (1, 1, '45', '2020-08-23', '2020-08-23T08:05:00.000Z', '2018-08-23T08:21:20.000Z');


-- Insert data into 'ratings' Table
INSERT INTO ratings (quiz_id, quiz_attempts_id, rating) VALUES (1, 1, 3);
INSERT INTO ratings (quiz_id, quiz_attempts_id, rating) VALUES (1, 2, 4);
INSERT INTO ratings (quiz_id, quiz_attempts_id, rating) VALUES (1, 3, 5);
INSERT INTO ratings (quiz_id, quiz_attempts_id, rating) VALUES (1, 4, 3);
INSERT INTO ratings (quiz_id, quiz_attempts_id, rating) VALUES (1, 5, 2);


-- Insert data into 'widgets' Table
-- INSERT INTO widgets (name, user_id) VALUES ('Sprockets', 1);
-- INSERT INTO widgets (name, user_id) VALUES ('Chains', 2);
-- INSERT INTO widgets (name, user_id) VALUES ('Bearings', 2);


INSERT INTO quiz_attempts (user_id, quiz_id, results, date, start_time, end_time) VALUES (1, 1, '1/1', '2020-08-24', '2020-08-24T08:05:00.000Z', '2018-08-24T08:21:20.000Z');

INSERT INTO ratings (quiz_id, quiz_attempts_id, rating) VALUES (1, 1, 3);

