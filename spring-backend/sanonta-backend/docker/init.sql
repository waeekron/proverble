CREATE DATABASE proverble;
CREATE DATABASE IF NOT EXISTS `proverble` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE proverble;

CREATE TABLE proverb (
    id int NOT NULL AUTO_INCREMENT,
    content varchar(255) NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO proverb (content)
VALUES 
('Aatelles ei aikaa hukkaa'),
('Ahkeruus kovankin onnen voittaa.'),
('Ajat muuttuvat ja me muutumme niiden mukana.'),
('Auta miestä mäessä, älä mäen alla."),
("Ei helmiä sioille."),
("Ei kannettu vesi kaivossa pysy."),
("Ei kukaan ole kuurompi kuin se, joka ei tahdo kuulla."),
("Ei kukaan ole seppä syntyessänsä."),
("Ei Luojakaan laiskoja elätä."),
("Ei makeaa mahan täydeltä."),
("Ei niin pahaa, ettei jotain hyvääkin."),
("Ei nimi miestä pahenna, jos ei mies nimeä."),
("Ei nähdä metsää puilta."),
("Ei ole koiraa karvoihin katsominen."),
("Ei omena kauas puusta putoa"),
("Ei oppi ojaan kaada, eikä tieto tieltä työnnä.");