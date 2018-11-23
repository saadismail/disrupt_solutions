DROP TABLE IF EXISTS `question_tag`;
DROP TABLE IF EXISTS `vote`;
DROP TABLE IF EXISTS `answer`;
DROP TABLE IF EXISTS `question`;
DROP TABLE IF EXISTS `tag`;
DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `f_name` varchar(20),
  `l_name` varchar(20),
  `email` varchar(30),
  `password` varchar(30),
  `access_level` tinyint, -- 0 = unverified user, 1 = normal verified user, 2 = admin
  `register_date` timestamp,
  PRIMARY KEY (`id`)
);

CREATE TABLE `tag` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20),
  `author_id` int,
  FOREIGN KEY (author_id)
    REFERENCES user(id),
  PRIMARY KEY (`id`)
);

CREATE TABLE `question` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(20),
  `body` varchar(300),
  `status` tinyint, -- 0 = deleted, 1 = unsolved, 2 = solved
  `author_id` int,
  FOREIGN KEY (author_id)
    REFERENCES user(id),
  PRIMARY KEY (`id`)
);

CREATE TABLE `answer` (
  `id` int NOT NULL AUTO_INCREMENT,
  `body` varchar(300),
  `author_id` int,
  `question_id` int,
  FOREIGN KEY (author_id)
    REFERENCES user(id),
  FOREIGN KEY (question_id)
    REFERENCES question(id),
  PRIMARY KEY (`id`)
);

CREATE TABLE `question_tag` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tag_id` int,
  `question_id` int,
  FOREIGN KEY (tag_id)
    REFERENCES tag(id),
  FOREIGN KEY (question_id)
    REFERENCES question(id),
  PRIMARY KEY (`id`)
);

CREATE TABLE `vote` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int,
  `question_id` int,
  `flag` tinyint, -- -1 = downvote, 1 = upvote
  FOREIGN KEY (user_id)
    REFERENCES user(id),
  FOREIGN KEY (question_id)
    REFERENCES question(id),
  PRIMARY KEY (`id`)
);
