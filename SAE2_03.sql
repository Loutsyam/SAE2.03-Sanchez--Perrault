-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:8889
-- Généré le : ven. 28 mars 2025 à 18:01
-- Version du serveur :  5.7.34
-- Version de PHP : 8.0.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `SAE2.03`
--

-- --------------------------------------------------------

--
-- Structure de la table `UserProfile`
--

CREATE TABLE `UserProfile` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `min_age` int(11) DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `UserProfile`
--

-- --------------------------------------------------------

--
-- Structure de la table `Category`
--

CREATE TABLE `Category` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `Category`
--

INSERT INTO `Category` (`id`, `name`) VALUES
(1, 'Action'),
(2, 'Comédie'),
(3, 'Drame'),
(4, 'Science-fiction'),
(5, 'Animation'),
(6, 'Thriller'),
(7, 'Horreur'),
(8, 'Aventure'),
(9, 'Fantaisie'),
(10, 'Documentaire');

-- --------------------------------------------------------

--
-- Structure de la table `Movie`
--

CREATE TABLE `Movie` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `year` int(11) DEFAULT NULL,
  `length` int(11) DEFAULT NULL,
  `description` text,
  `director` varchar(255) DEFAULT NULL,
  `id_category` int(11) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `trailer` varchar(255) DEFAULT NULL,
  `min_age` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
-- --------------------------------------------------------

--
-- Structure de la table `Favoris`
--

CREATE TABLE Favorite (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_profile INT NOT NULL,
    id_movie INT NOT NULL,
    FOREIGN KEY (id_profile) REFERENCES Profile(id),
    FOREIGN KEY (id_movie) REFERENCES Movie(id),
    UNIQUE KEY unique_favorite (id_profile, id_movie)
); 

--
-- Déchargement des données de la table `Movie`
--

INSERT INTO `Movie` (`id`, `name`, `year`, `length`, `description`, `director`, `id_category`, `image`, `trailer`, `min_age`) VALUES
(7, 'Interstellar', 2014, 169, 'Un groupe d\'explorateurs voyage à travers un trou de ver pour sauver l\'humanité.', 'Christopher Nolan', 4, 'interstellar.jpg', 'https://www.youtube.com/embed/VaOijhK3CRU?si=76Ke4uw4LYjuLuQ6', 12),
(12, 'La Liste de Schindler', 1993, 195, 'Un industriel allemand sauve des milliers de Juifs pendant l\'Holocauste.', 'Steven Spielberg', 3, 'schindler.webp', 'https://www.youtube.com/embed/ONWtyxzl-GE?si=xC3ASGGPy5Ib-aPn', 16),
(17, 'Your Name', 2016, 107, 'Deux adolescents échangent leurs corps de manière mystérieuse.', 'Makoto Shinkai', 5, 'your_name.jpg', 'https://www.youtube.com/embed/AROOK45LXXg?si=aUQyGk2VMCb_ToUL', 10),
(27, 'Le Bon, la Brute et le Truand', 1966, 161, 'Trois hommes se lancent à la recherche d\'un trésor caché.', 'Sergio Leone', 8, 'bon_brute_truand.jpg', 'https://www.youtube.com/embed/WA1hCZFOPqs?si=TwNZAoM4oj4KpGja', 12),
(33, 'inception', 2010, 148, 'Un voleur qui vole des secrets à travers les rêves est chargé d\\\'une mission inverse : implanter une idée dans l\\\'esprit d\\\'une cible.', 'Christopher Nolan', 4, 'inception.jpg', 'https://www.youtube.com/embed/HcoZbHBDHQA?si=qPpRFdZhf436M2Hv', 12),
(36, 'Arthur et les Minimoys', 2006, 94, 'Un garçon découvre un monde miniature et part à l’aventure pour sauver sa maison.', 'Luc Besson', 5, 'arthur.jpg', 'https://www.youtube.com/embed/nwYpQF4ESks?si=ruIgWBecVF5NqFvK', 0),
(37, 'Astérix et Obélix : Mission Cléopâtre', 2002, 107, 'Cléopâtre, piquée au vif par Jules César qui dénigre la grandeur de son peuple, lui lance un défi : construire en trois mois un palais somptueux qui prouvera la supériorité de la civilisation égyptienne. Elle confie cette mission impossible à l’architecte Numérobis, menacé d’être jeté aux crocodiles en cas d’échec.\r\nConscient de l’ampleur du chantier, Numérobis part chercher de l’aide en Gaule auprès du druide Panoramix, accompagné d’Astérix et Obélix. Ensemble, ils se rendent en Égypte pour accélérer la construction grâce à la potion magique. Mais Amonbofis, architecte rival jaloux, multiplie les sabotages, parfois avec l’appui des Romains.\r\nEntre complots, grèves, poursuites, pièges et affrontements, les Gaulois doivent déjouer tous les obstacles pour permettre à Numérobis de terminer le palais dans les temps. Leur réussite forcera César à reconnaître publiquement la grandeur du peuple égyptien.', 'Alain Chabat', 2, 'Asterix et Obelix.webp', 'https://www.youtube.com/embed/7Nd1ZCwB5PI?si=XK61t9W5yB8mV3b4', 0),
(38, 'I Robot ', 2004, 115, 'Un policier enquête sur un robot impliqué dans un meurtre malgré les lois de la robotique.', 'Alex Proyas', 4, 'i-robot.jpg', 'https://www.youtube.com/watch?v=s0f3JeDVeEo', 12),
(39, 'John Wick : Chapitre 3', 2019, 130, 'John Wick est en fuite après avoir enfreint la règle suprême du Continental : tuer un homme dans l’enceinte de l’hôtel. Déclaré excommunicado, il perd tous ses droits, son accès aux services du monde criminel et voit sa tête mise à prix pour 14 millions de dollars.\r\n\r\nTraqué par des assassins du monde entier, il tente de survivre tout en cherchant un moyen d’effacer sa condamnation. Son parcours le mène de New York au Maroc, où il affronte de nouveaux ennemis et sollicite d’anciens alliés.', 'Chad Stahelski', 1, 'john-wick.webp', 'https://youtu.be/pU8-7BX9uxs?si=L17Ff2mAjwqDPxEw', 12),
(40, 'Oppenheimer', 2023, 180, 'Le film retrace la vie de J. Robert Oppenheimer, physicien brillant mais tourmenté, depuis ses années de formation en Europe jusqu’à la direction du Projet Manhattan durant la Seconde Guerre mondiale. Chargé de concevoir la première bombe atomique, il rassemble une équipe de scientifiques à Los Alamos et mène l’essai Trinity, qui marque un tournant historique.\r\nAprès les bombardements d’Hiroshima et de Nagasaki, Oppenheimer est rongé par la culpabilité et s’oppose au développement de l’arme thermonucléaire, ce qui le met en conflit avec certains de ses anciens collègues. Dans le climat tendu de la guerre froide, ses liens passés avec des communistes sont exploités contre lui, menant à la révocation de son habilitation de sécurité en 1954.\r\nLe récit alterne entre son ascension scientifique, ses dilemmes moraux et les conséquences politiques qui finiront par briser sa carrière, tout en posant la question du prix humain et éthique du progrès scientifique.', 'Christopher Nolan', 6, 'oppenheimer.webp', 'https://youtu.be/gOMntAPrcAU?si=afHF0q_T-wQ05P5F', 16),
(41, 'Pirates des Caraïbes', 2003, 143, 'Un pirate excentrique s’allie à un forgeron pour sauver une jeune femme.', 'Gore Verbinski', 8, 'pirate.jpg', 'https://www.youtube.com/watch?v=naQr0uTrH_s', 12),
(42, 'Ring', 1998, 96, 'Tokyo, fin des années 2000, une ru­meur se répand parmi les adoles­cents : visionner une mystérieuse cassette vidéo provoquerait une mort cer­taine au bout d’une semaine. Après le dé­cès inexplicable de sa nièce, la journaliste Reiko Asakawa décide de mener l’enquête mais se retrouve elle-même sous le coup de la malédiction. Pendant les sept jours qui lui restent à vivre, elle devra remonter à l’origine de la vidéo fatale et affronter le spectre qui hante les télévisions : Sadako.', 'Hiroshi Takahashi', 7, 'ring.jpg', 'https://youtu.be/vUxpjYx2itY?si=XVtPzW-fyAruep3d', 12),
(43, 'James Bond Skyfall', 2012, 143, 'Lorsqu’une mission tourne mal à Istanbul, James Bond est porté disparu et présumé mort. Peu après, le MI6 subit une attaque informatique qui vise directement M, révélant qu’un ennemi intime connaît ses secrets et cherche à la détruire. Bond réapparaît et reprend du service malgré une condition physique affaiblie, déterminé à identifier l’auteur de ces attaques.\r\n\r\nSon enquête le mène jusqu’à Raoul Silva, ancien agent du MI6 devenu cyber‑terroriste, animé par une vengeance personnelle contre M. Pour protéger son service et affronter ce passé qui ressurgit, Bond doit repousser ses limites et revenir sur les traces de son enfance, jusqu’au manoir familial de Skyfall, où se joue l’affrontement final.', 'Sam Mendes', 1, 'skyfall.webp', 'https://youtu.be/6kw1UVovByw?si=oyVLorEagsUerLP_', 12),
(44, 'Avatar : De feu et de cendres ou Avatar : Feu et Cendre', 2025, 197, 'Aux prises avec le chagrin après la mort de Neteyam, la famille de Jake et Neytiri rencontre une nouvelle tribu agressive : les Na\'vi. Ce peuple des cendres est dirigé par le fougueux Varang, alors que le conflit sur Pandora s\'intensifie.', 'James Cameron', 4, 'avatar_3.jpg', 'https://youtu.be/nb_fFj_0rq8?si=QJ-5yH9R0Use2uva', 12),
(45, 'Joker', 2019, 122, 'L’histoire sombre d’un homme marginal qui devient le célèbre criminel Joker.', 'Todd Phillips', 3, 'Joker.jpg', 'https://www.youtube.com/watch?v=zAGVQLHvwOY', 16),
(46, 'Le Seigneur des anneaux : La Communauté de l\'anneau', 2001, 178, 'Un jeune et timide hobbit, Frodon Sacquet, hérite d\'un anneau magique. Sous ses apparences de simple bijou, il s\'agit en réalité d\'un instrument de pouvoir absolu qui permettrait à Sauron, le Seigneur des ténèbres, de régner sur la Terre du Milieu et de réduire en esclavage ses peuples. Frodon doit parvenir, avec l\'aide de la Communauté de l\'Anneau, composée de huit compagnons venus de différents royaumes, jusqu\'à la Montagne du Destin pour le détruire..', 'Peter Jackson', 9, 'seigneur_des_anneaux.jpg', 'https://www.youtube.com/embed/V75dMMIW2B4', 12),
(47, ' Les Aventuriers de l\'arche perdue', 1981, 115, 'Professeur d\'archéologie, Indiana Jones parcourt le monde à la recherche de trésors. Son rival, le Français René Belloq, travaille pour les nazis qui rêvent de retrouver l\'Arche d\'alliance contenant les Tables de la Loi. Or, feu le professeur Ravenwood, père de Marion, l\'ex-petite amie d\'Indiana Jones, détenait une médaille permettant de localiser l\'arche. Jones part sur les traces de Marion au Népal.', 'Steven Spielberg', 8, 'aventurier.jpg', 'https://youtu.be/liIQREC0X2A?si=HyRBtd9taxbg9WO9', 12),
(48, 'Bohemian Rhapsody', 2018, 134, 'Le chanteur Freddie Mercury, le guitariste Brian May, le batteur Roger Taylor et le bassiste John Deacon prennent d\'assaut le monde de la musique lorsqu\'ils forment le groupe de rock Queen en 1970. Entouré d\'influences sombres, Mercury décide de quitter Queen pour poursuivre une carrière solo. Après avoir reçu un diagnostic de SIDA dans les années 1980, le leader du groupe rejoint le groupe pour le concert-bénéfice Live Aid — menant le groupe à l\'une des performances les plus inoubliables.', 'Bryan Singer', 10, 'bohemian_rhapsody.jpg', 'https://youtu.be/mP0VHJYFOAU?si=uJr4lxNCPZTtfeRo', 6),
(49, 'Mazinger Z Infinity', 2017, 130, 'Dix ans sont passés depuis que Kôji Kabuto (Alcor en français), aux commandes du super robot Mazinger Z, créé par son grand-père, a ramené la paix en combattant l’Empire des Ténèbres et le maléfique Dr Hell. Aujourd’hui, Kôji Kabuto n’est plus pilote, il a pris le chemin de son père et grand-père en devenant scientifique. Sayaka Yumi, quant à elle, est la directrice du l\'Institut Photonique, tandis que Tetsuya Tsurugi est resté pilote au sein de l\'armée, tout comme Shiro, le petit frère de Koji.', 'Junji Shimizu', 5, 'Mazinger.jpg', 'https://www.youtube.com/embed/aU_Zjz8A0sk?si=t3KEMeVVkjI548EQ', 6),
(94, 'Bee Movie', 2007, 91, 'Une abeille intente un procès contre les humains qui exploitent le miel.', 'Simon J. Smith, Steve Hickner', 5, 'Bee.jpg', 'https://www.youtube.com/embed/VONRQMx78YI?si=vxY7Vq9rK8Yp1rYJ', 0),
(95, 'Blade Runner 2049', 2017, 163, 'En 2049, la société est fragilisée par les nombreux secrets enfouis du passé.', 'Denis Villeneuve', 4, 'Blade2049.jpg', 'https://www.youtube.com/embed/O4C5cwSbXZ8?si=Y2H3dGv5xQ7nJm1P', 0),
(96, 'Dragons', 2010, 98, 'Un jeune Viking se lie d’amitié avec un dragon blessé.', 'Chris Sanders, Dean DeBlois', 5, 'Dragons.jpg', 'https://www.youtube.com/embed/8rR_zgI-cmk?si=5vK8bR1dYt6uJp0L', 0),
(97, 'Dune', 2021, 155, 'Paul Atréides rejoint les Fremen pour accomplir sa destinée sur Arrakis.', 'Denis Villeneuve', 4, 'Dune.jpg', 'https://www.youtube.com/embed/n9xhJrPXop4', 0),
(98, 'Forrest Gump', 1994, 142, 'La vie extraordinaire d’un homme simple au cœur de l’histoire américaine.', 'Robert Zemeckis', 3, 'Forrest.jpg', 'https://www.youtube.com/embed/bLvqoHBptjg', 0),
(99, 'Gladiator', 2000, 155, 'Un général romain trahi cherche vengeance.', 'Ridley Scott', 1, 'Gladiator.jpg', 'https://www.youtube.com/embed/owK1qxDselE', 12),
(100, 'Gran Torino', 2008, 116, 'Un vétéran grincheux se lie avec ses voisins Hmong.', 'Clint Eastwood', 3, 'Torino.jpg', 'https://www.youtube.com/embed/RMhbr2XQblk', 0),
(101, 'Harry Potter à l\'école des sorciers', 2001, 152, 'Un jeune garçon découvre qu’il est sorcier.', 'Chris Columbus', 9, 'Potter.jpg', 'https://www.youtube.com/embed/VyHV0BRtdxo', 0),
(104, 'Intouchables', 2011, 112, 'L’amitié improbable entre un aristocrate handicapé et son aide à domicile.', 'Olivier Nakache, Éric Toledano', 2, 'Intouchables.jpg', 'https://www.youtube.com/embed/0RqDiYnFxTk', 0),
(105, 'Jurassic Park', 1993, 127, 'Un parc peuplé de dinosaures clonés tourne au cauchemar.', 'Steven Spielberg', 8, 'Jurassic.jpg', 'https://www.youtube.com/embed/QWBKEmWWL38', 0),
(106, 'Kung Fu Panda', 2008, 92, 'Un panda maladroit devient maître de kung-fu.', 'Mark Osborne, John Stevenson', 5, 'kung_fu_panda.jpg', 'https://www.youtube.com/embed/PXi3Mv6KMzY', 0),
(107, 'La Ligne verte', 1999, 189, 'Un gardien découvre les pouvoirs surnaturels d’un condamné à mort.', 'Frank Darabont', 3, 'GreenLine.jpg', 'https://www.youtube.com/embed/Ki4haFrqSrw', 12),
(108, 'Le Chant du loup', 2019, 115, 'Un analyste sonar détecte une menace nucléaire sous-marine.', 'Antonin Baudry', 6, 'Loup.jpg', 'https://www.youtube.com/embed/7j7L0Jr2D5s', 0),
(109, 'Le Roi Lion', 1994, 89, 'Un lionceau doit reprendre sa place de roi.', 'Roger Allers, Rob Minkoff', 5, 'Lion.jpg', 'https://www.youtube.com/embed/4sj1MT05lAA', 0),
(111, 'Le Voyage de Chihiro', 2001, 125, 'Une fillette pénètre dans un monde d’esprits.', 'Hayao Miyazaki', 5, 'Chihiro.jpg', 'https://www.youtube.com/embed/ByXuk9QqQkk', 0),
(112, 'Les Évadés', 1994, 142, 'Un banquier injustement condamné prépare son évasion.', 'Frank Darabont', 3, 'Evadés.jpg', 'https://www.youtube.com/embed/6hB3S9bIaco', 10),
(113, 'Lucy', 2014, 89, 'Une femme développe des capacités cérébrales illimitées.', 'Luc Besson', 4, 'Lucy.jpg', 'https://www.youtube.com/embed/MVt32qoyhi0', 12),
(114, 'Madagascar', 2005, 86, 'Des animaux du zoo se retrouvent sur une île sauvage.', 'Eric Darnell, Tom McGrath', 5, 'Madagascar.jpg', 'https://www.youtube.com/embed/hs6L_7qYj1g', 0),
(116, 'Moi, moche et méchant', 2010, 95, 'Un super-vilain adopte trois orphelines.', 'Pierre Coffin, Chris Renaud', 5, 'Gru.jpg', 'https://www.youtube.com/embed/sUkZFetWYY0', 0),
(117, 'Monstres & Cie', 2001, 92, 'Deux monstres gèrent les cris des enfants pour produire de l’énergie.', 'Pete Docter, David Silverman', 5, 'Monstre.jpg', 'https://www.youtube.com/embed/CGbgaHoapFM', 0),
(118, 'Nikita', 1990, 117, 'Une délinquante devient tueuse à gages pour l’État.', 'Luc Besson', 1, 'Nikita.jpg', 'https://www.youtube.com/embed/6hM4sR5VfL8', 12),
(119, 'Parasite', 2019, 132, 'Une famille pauvre infiltre une riche demeure.', 'Bong Joon-ho', 6, 'Parasite.jpg', 'https://www.youtube.com/embed/SEUXfv87Wpk', 12),
(120, 'Pirates des Caraïbes', 2003, 143, 'Le capitaine Jack Sparrow affronte des pirates maudits.', 'Gore Verbinski', 8, 'Pirates.jpg', 'https://www.youtube.com/embed/naQr0uTrH_s', 0),
(121, 'Pulp Fiction', 1994, 154, 'Destins croisés dans le milieu criminel de Los Angeles.', 'Quentin Tarantino', 1, 'PulpFiction.jpg', 'https://www.youtube.com/embed/s7EdQ4FqbhY', 12),
(122, 'Ratatouille', 2007, 111, 'Un rat rêve de devenir chef à Paris.', 'Brad Bird', 5, 'Ratatouille.jpg', 'https://www.youtube.com/embed/NgsQ8mVkN8w', 0),
(123, 'Ready Player One', 2018, 140, 'Une chasse au trésor géante dans un monde virtuel.', 'Steven Spielberg', 4, 'RPO.jpg', 'https://www.youtube.com/embed/cSp1dM2Vj48', 0),
(124, 'Retour vers le futur', 1985, 116, 'Un adolescent voyage dans le temps.', 'Robert Zemeckis', 4, 'Back.jpg', 'https://www.youtube.com/embed/qvsgGtivCgs', 0),
(125, 'Shrek', 2001, 90, 'Un ogre sauve une princesse.', 'Andrew Adamson, Vicky Jenson', 5, 'Shrek.jpg', 'https://www.youtube.com/embed/CwXOrWvPBPk', 0),
(128, 'Taxi', 1998, 86, 'Un chauffeur surdoué aide la police de Marseille.', 'Gérard Pirès', 1, 'Taxi.jpg', 'https://www.youtube.com/embed/1n3Y0kQkLls', 0),
(129, 'Terminator 2 ', 1991, 137, 'Un cyborg protège le futur chef de la résistance.', 'James Cameron', 4, 'Terminator.jpg', 'https://www.youtube.com/embed/CRRlbK5w8AE', 12),
(130, 'The Dark Knight', 2008, 152, 'Batman affronte le Joker.', 'Christopher Nolan', 1, 'dark_knight.jpg', 'https://www.youtube.com/embed/EXeTwQWrcwY', 0),
(131, 'The Truman Show', 1998, 103, 'Un homme découvre que sa vie est une émission télévisée.', 'Peter Weir', 2, 'Truman.jpg', 'https://www.youtube.com/embed/dlnmQbPGuls', 0),
(134, 'Vaiana', 2016, 107, 'Une navigatrice part sauver son peuple.', 'Ron Clements, John Musker', 5, 'Vaiana.jpg', 'https://www.youtube.com/embed/LKFuXETZUsI', 0),
(136, 'Wall-E', 2008, 98, 'Un robot solitaire nettoie la Terre abandonnée.', 'Andrew Stanton', 5, 'Walle.jpg', 'https://www.youtube.com/embed/CZ1CATNbXg0', 0),
(138, 'Zootopie', 2016, 108, 'Une lapine policière enquête dans une ville animale.', 'Byron Howard, Rich Moore', 5, 'Zoo.jpg', 'https://www.youtube.com/embed/jWM0ct-OLsM', 0),
(139, '1917', 2019, 119, 'Deux soldats britanniques traversent les lignes ennemies pendant la Première Guerre mondiale.', 'Sam Mendes', 10, '1917.jpg', 'https://www.youtube.com/embed/YqNYrYUiMfg', 0),
(140, 'Avatar', 2009, 162, 'Un marine paraplégique découvre Pandora.', 'James Cameron', 4, 'Avatar.jpg', 'https://www.youtube.com/embed/5PSNL1qE6VY', 0),
(141, 'Avengers: Endgame', 2019, 181, 'Les Avengers affrontent Thanos une dernière fois.', 'Anthony Russo, Joe Russo', 1, 'Endgame.jpg', 'https://www.youtube.com/embed/TcMBFSGVi1c', 0),
(142, 'Black Panther', 2018, 134, 'Le roi du Wakanda protège son royaume.', 'Ryan Coogler', 1, 'Panther.jpg', 'https://www.youtube.com/embed/xjDjIWPwcPU', 0);


--
-- Index pour les tables déchargées
--
--
-- Index pour la table `Category`
--
ALTER TABLE `Category`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `Movie`
--
ALTER TABLE `Movie`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_category` (`id_category`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `UserProfile`
--
ALTER TABLE `UserProfile`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `Category`
--
ALTER TABLE `Category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pour la table `Movie`
--
ALTER TABLE `Movie`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `Movie`
--
ALTER TABLE `Movie`
  ADD CONSTRAINT `movie_ibfk_1` FOREIGN KEY (`id_category`) REFERENCES `Category` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
