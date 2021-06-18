CREATE TABLE shifts.users (
  id INT auto_increment NOT NULL,
  name varchar(100) NOT NULL,
  email varchar(100) NULL,
  PRIMARY KEY (id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8
COLLATE=utf8_general_ci;

INSERT INTO shifts.users (id, name, email) VALUES (1, 'John Doe', 'john.doe@example.com');
INSERT INTO shifts.users (id, name, email) VALUES (2, 'Markus Tornberg', 'markus.tornberg@example.com');
INSERT INTO shifts.users (id, name, email) VALUES (3, 'Peter Johnson', 'peter.johnson@example.com');
INSERT INTO shifts.users (id, name, email) VALUES (4, 'Sofia Bjorn', 'sofia.bjorn@example.com');
INSERT INTO shifts.users (id, name, email) VALUES (5, 'Anna Karina', 'anna.karina@example.com');

CREATE TABLE `users_shifts` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `user_id` int(11) NOT NULL,
    `shift` int(11) DEFAULT NULL,
    `shift_date` date DEFAULT NULL,
    `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    KEY `users_shifts__fk` (`user_id`),
    CONSTRAINT `users_shifts__fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB
DEFAULT CHARSET=utf8
COLLATE=utf8_general_ci;

