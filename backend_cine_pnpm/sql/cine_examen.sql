-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: db
-- Tiempo de generación: 10-12-2025 a las 13:59:32
-- Versión del servidor: 8.0.39
-- Versión de PHP: 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `cine_examen`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `director`
--

CREATE TABLE `director` (
  `id_director` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `birth_date` date DEFAULT NULL,
  `biography` text,
  `photo_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `director`
--

INSERT INTO `director` (`id_director`, `name`, `birth_date`, `biography`, `photo_url`) VALUES
(1, 'Steven Spielberg', '1946-12-18', 'Uno de los directores más influyentes de la historia del cine.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Steven_Spielberg_2025.jpg/500px-Steven_Spielberg_2025.jpg'),
(2, 'Quentin Tarantino', '1963-03-27', 'Conocido por sus diálogos estilizados y narrativas no lineales.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Quentin_Tarantino_by_Gage_Skidmore.jpg/500px-Quentin_Tarantino_by_Gage_Skidmore.jpg'),
(3, 'Greta Gerwig', '1983-08-04', 'Actriz, guionista y directora aclamada por su trabajo en el cine indie.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/MJK_08458_Greta_Gerwig_%28Berlinale_2018%29.jpg/640px-MJK_08458_Greta_Gerwig_%28Berlinale_2018%29.jpg'),
(4, 'Christopher Nolan', '1970-07-30', 'Famoso por sus películas complejas y su uso innovador del tiempo y la narrativa.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Christopher_Nolan_Cannes_2018.jpg/640px-Christopher_Nolan_Cannes_2018.jpg'),
(5, 'Martin Scorsese', '1942-11-17', 'Maestro del cine de gánsteres y la crítica social.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Martin_Scorsese_MFF_2023.jpg/640px-Martin_Scorsese_MFF_2023.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `movie`
--

CREATE TABLE `movie` (
  `id_movie` int NOT NULL,
  `title` varchar(150) NOT NULL,
  `synopsis` text,
  `release_date` date DEFAULT NULL,
  `id_director` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `movie`
--

INSERT INTO `movie` (`id_movie`, `title`, `synopsis`, `release_date`, `id_director`) VALUES
(1, 'Tiburón', 'Un gran tiburón blanco amenaza a bañistas en un pueblo costero.', '1975-06-20', 1),
(2, 'Encuentros en la tercera fase', 'Un electricista es testigo de OVNIs y se obsesiona con una montaña.', '1977-11-16', 1),
(3, 'E.T. el Extraterrestre', 'Un niño ayuda a un alienígena varado a volver a casa.', '1982-06-11', 1),
(4, 'Parque Jurásico', 'Científicos crean un parque temático de dinosaurios clonados que se sale de control.', '1993-06-11', 1),
(5, 'La lista de Schindler', 'La historia de Oskar Schindler, que salvó a miles de judíos durante el Holocausto.', '1993-12-15', 1),
(6, 'Salvar al soldado Ryan', 'Un grupo de soldados se adentra tras las líneas enemigas para encontrar a un paracaidista.', '1998-07-24', 1),
(7, 'Minority Report', 'Un policía predice crímenes antes de que ocurran.', '2002-06-21', 1),
(8, 'Atrápame si puedes', 'Un joven estafador se hace pasar por piloto, médico y abogado.', '2002-12-25', 1),
(9, 'La guerra de los mundos', 'Una invasión alienígena que amenaza la existencia humana.', '2005-06-29', 1),
(10, 'Lincoln', 'Los últimos meses de la vida de Abraham Lincoln y su lucha por la Enmienda 13.', '2012-11-09', 1),
(11, 'Reservoir Dogs', 'Un atraco de diamantes sale mal, y los supervivientes buscan al culpable.', '1992-10-23', 2),
(12, 'Pulp Fiction', 'Historias cruzadas de gánsteres, boxeadores y un par de ladrones.', '1994-10-14', 2),
(13, 'Jackie Brown', 'Una azafata de vuelo queda atrapada entre la policía y un traficante de armas.', '1997-12-25', 2),
(14, 'Kill Bill: Vol. 1', 'Una asesina busca venganza contra su antiguo jefe y su equipo.', '2003-10-10', 2),
(15, 'Kill Bill: Vol. 2', 'La segunda parte de la épica búsqueda de venganza de Beatrix Kiddo.', '2004-04-16', 2),
(16, 'Malditos bastardos', 'Un grupo de soldados judíos-estadounidenses planea asesinar líderes nazis.', '2009-08-21', 2),
(17, 'Django desencadenado', 'Un esclavo liberado viaja por América para rescatar a su esposa.', '2012-12-25', 2),
(18, 'Los ocho odiosos', 'Ocho extraños se refugian de una tormenta de nieve en un salón de diligencias.', '2015-12-25', 2),
(19, 'Érase una vez en Hollywood', 'Un actor y su doble navegan por el cambiante Hollywood de 1969.', '2019-07-26', 2),
(20, 'Death Proof', 'Un especialista de cine asesino utiliza su coche a prueba de muerte como arma.', '2007-06-01', 2),
(21, 'Nights and Weekends', 'Una relación a larga distancia entre una pareja en Nueva York y Chicago.', '2008-03-08', 3),
(22, 'Lady Bird', 'Una joven navega por la amistad, la familia y su futuro en Sacramento.', '2017-11-03', 3),
(23, 'Mujercitas', 'Adaptación del clásico sobre las cuatro hermanas March.', '2019-12-25', 3),
(24, 'Barbie', 'Barbie experimenta la vida real después de un cambio existencial.', '2023-07-21', 3),
(25, 'Hannah Takes the Stairs', 'Una veinteañera en Brooklyn se debate entre tres hombres.', '2007-08-22', 3),
(26, 'Frances Ha', 'Una aspirante a bailarina se enfrenta a la adultez en Nueva York.', '2012-05-17', 3),
(27, 'Mistress America', 'Una joven universitaria se muda a Nueva York y se hace amiga de su futura hermanastra.', '2015-08-14', 3),
(28, 'The Humbling', 'Un actor anciano se obsesiona con una mujer joven.', '2014-01-01', 3),
(29, 'Lola Versus', 'Una joven intenta reajustar su vida después de que su prometido cancela su boda.', '2012-01-01', 3),
(30, 'Northern Comfort', 'Un grupo de personas se queda varado en Islandia.', '2010-01-01', 3),
(31, 'Following', 'Un escritor sigue a extraños en Londres, pero se involucra en un robo.', '1998-09-11', 4),
(32, 'Memento', 'Un hombre con amnesia anterógrada intenta cazar al asesino de su esposa.', '2000-10-11', 4),
(33, 'Insomnia', 'Dos detectives de Los Ángeles investigan un asesinato en Alaska, donde el sol nunca se pone.', '2002-05-24', 4),
(34, 'Batman Begins', 'La historia del origen de Batman y su lucha contra el miedo en Gotham.', '2005-06-15', 4),
(35, 'El truco final (El prestigio)', 'Dos magos rivales se obsesionan con superarse mutuamente en Londres.', '2006-10-20', 4),
(36, 'El Caballero Oscuro', 'Batman se enfrenta a su mayor enemigo: el Joker.', '2008-07-18', 4),
(37, 'Origen', 'Ladrones que entran en los sueños de la gente para robar secretos corporativos.', '2010-07-16', 4),
(38, 'Interestelar', 'Un equipo de exploradores viaja a través de un agujero de gusano para salvar a la humanidad.', '2014-11-07', 4),
(39, 'Dunkerque', 'La evacuación de soldados aliados de Bélgica y Francia durante la Segunda Guerra Mundial.', '2017-07-21', 4),
(40, 'Tenet', 'Un agente secreto viaja a través del tiempo para evitar una Tercera Guerra Mundial.', '2020-09-03', 4),
(41, 'Malas calles', 'La vida de un gánster de poca monta en Little Italy, Nueva York.', '1973-10-14', 5),
(42, 'Taxi Driver', 'Un taxista solitario en Nueva York desciende a la locura.', '1976-02-08', 5),
(43, 'Toro salvaje', 'La vida turbulenta del boxeador Jake LaMotta.', '1980-12-19', 5),
(44, 'El rey de la comedia', 'Un cómico obsesionado secuestra a su ídolo.', '1982-12-18', 5),
(45, 'Uno de los nuestros', 'El ascenso y la caída de un mafioso italoamericano.', '1990-09-21', 5),
(46, 'Casino', 'La gestión de un casino de Las Vegas por parte de la Mafia.', '1995-11-22', 5),
(47, 'Infiltrados', 'Un topo de la policía y un topo de la mafia intentan descubrirse mutuamente.', '2006-10-06', 5),
(48, 'La isla siniestra', 'Dos US Marshals investigan la desaparición de un paciente en un hospital psiquiátrico.', '2010-02-19', 5),
(49, 'El lobo de Wall Street', 'El ascenso y caída del corredor de bolsa Jordan Belfort.', '2013-12-25', 5),
(50, 'El irlandés', 'Un sicario de la mafia reflexiona sobre su vida y sus crímenes.', '2019-11-27', 5);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `director`
--
ALTER TABLE `director`
  ADD PRIMARY KEY (`id_director`);

--
-- Indices de la tabla `movie`
--
ALTER TABLE `movie`
  ADD PRIMARY KEY (`id_movie`),
  ADD KEY `id_director` (`id_director`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `director`
--
ALTER TABLE `director`
  MODIFY `id_director` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `movie`
--
ALTER TABLE `movie`
  MODIFY `id_movie` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `movie`
--
ALTER TABLE `movie`
  ADD CONSTRAINT `movie_ibfk_1` FOREIGN KEY (`id_director`) REFERENCES `director` (`id_director`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
