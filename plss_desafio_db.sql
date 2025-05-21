-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           8.0.30 - MySQL Community Server - GPL
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Copiando estrutura para tabela plss_db_2.audits
CREATE TABLE IF NOT EXISTS `audits` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `event` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `auditable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `auditable_id` bigint unsigned NOT NULL,
  `old_values` text COLLATE utf8mb4_unicode_ci,
  `new_values` text COLLATE utf8mb4_unicode_ci,
  `url` text COLLATE utf8mb4_unicode_ci,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` varchar(1023) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tags` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `audits_auditable_type_auditable_id_index` (`auditable_type`,`auditable_id`),
  KEY `audits_user_id_user_type_index` (`user_id`,`user_type`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Copiando dados para a tabela plss_db_2.audits: ~0 rows (aproximadamente)
INSERT INTO `audits` (`id`, `user_type`, `user_id`, `event`, `auditable_type`, `auditable_id`, `old_values`, `new_values`, `url`, `ip_address`, `user_agent`, `tags`, `created_at`, `updated_at`) VALUES
	(1, 'App\\Models\\User', 1, 'created', 'App\\Models\\Construction', 1, '[]', '{"name":"Unidade 3 - Condom\\u00ednio Terra Nova","description":"Casa n\\u00famero 3 do condom\\u00ednio. 2 Andares, 5 banheiros.","address":"Rua Canarinho, 45"}', 'http://localhost:8000/api/constructions', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36', NULL, '2025-05-21 05:29:53', '2025-05-21 05:29:53'),
	(2, 'App\\Models\\User', 1, 'created', 'App\\Models\\Measurement', 1, '[]', '{"amount":"12","unit_id":"1","construction_id":"1","observation":"Altura total do ch\\u00e3o ao telhado.","measured_at":"2025-05-20 02:30:00","id":1}', 'http://localhost:8000/api/measurements', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36', NULL, '2025-05-21 05:30:29', '2025-05-21 05:30:29');

-- Copiando estrutura para tabela plss_db_2.cache
CREATE TABLE IF NOT EXISTS `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Copiando dados para a tabela plss_db_2.cache: ~0 rows (aproximadamente)
INSERT INTO `cache` (`key`, `value`, `expiration`) VALUES
	('laravel_cache_1kOObkZp6JnaBjbe', 'a:1:{s:11:"valid_until";i:1747802083;}', 1749000523),
	('laravel_cache_7LO7NzYdjhA8eELA', 's:7:"forever";', 2063162525),
	('laravel_cache_Bayr3ZcQof4fgZIY', 'a:1:{s:11:"valid_until";i:1747805047;}', 1749012487),
	('laravel_cache_cmoSVhA2k19iBMYn', 'a:1:{s:11:"valid_until";i:1747805106;}', 1749012486),
	('laravel_cache_isJ0galNOkJPVisJ', 'a:1:{s:11:"valid_until";i:1747805004;}', 1749012504),
	('laravel_cache_LDCoI8zrFv8xhTE7', 'a:1:{s:11:"valid_until";i:1747804959;}', 1749012519),
	('laravel_cache_MhUXsXvo6KOjOsOp', 's:7:"forever";', 2063162808),
	('laravel_cache_MWaagsUZy4tcizvG', 'a:1:{s:11:"valid_until";i:1747805100;}', 1749012480),
	('laravel_cache_nR5pA35it2F5vGXl', 's:7:"forever";', 2063162294),
	('laravel_cache_Pun1Jgo9MdXHK0bQ', 'a:1:{s:11:"valid_until";i:1747794817;}', 1749000517),
	('laravel_cache_rfxJrayaB8teDZFJ', 'a:1:{s:11:"valid_until";i:1747798461;}', 1749000501);

-- Copiando estrutura para tabela plss_db_2.cache_locks
CREATE TABLE IF NOT EXISTS `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Copiando dados para a tabela plss_db_2.cache_locks: ~0 rows (aproximadamente)

-- Copiando estrutura para tabela plss_db_2.constructions
CREATE TABLE IF NOT EXISTS `constructions` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `description` text COLLATE utf8mb4_general_ci,
  `address` text COLLATE utf8mb4_general_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Copiando dados para a tabela plss_db_2.constructions: ~3 rows (aproximadamente)
INSERT INTO `constructions` (`id`, `name`, `description`, `address`, `created_at`, `updated_at`, `deleted_at`) VALUES
	(1, 'Unidade 3 - Condomínio Terra Nova', 'Casa número 3 do condomínio. 2 Andares, 5 banheiros.', 'Rua Canarinho, 45', '2025-05-21 05:29:53', '2025-05-21 05:29:53', NULL);

-- Copiando estrutura para tabela plss_db_2.failed_jobs
CREATE TABLE IF NOT EXISTS `failed_jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Copiando dados para a tabela plss_db_2.failed_jobs: ~0 rows (aproximadamente)

-- Copiando estrutura para tabela plss_db_2.jobs
CREATE TABLE IF NOT EXISTS `jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint unsigned NOT NULL,
  `reserved_at` int unsigned DEFAULT NULL,
  `available_at` int unsigned NOT NULL,
  `created_at` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Copiando dados para a tabela plss_db_2.jobs: ~0 rows (aproximadamente)

-- Copiando estrutura para tabela plss_db_2.job_batches
CREATE TABLE IF NOT EXISTS `job_batches` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Copiando dados para a tabela plss_db_2.job_batches: ~0 rows (aproximadamente)

-- Copiando estrutura para tabela plss_db_2.measurements
CREATE TABLE IF NOT EXISTS `measurements` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `amount` double NOT NULL,
  `unit_id` int unsigned NOT NULL,
  `construction_id` int unsigned NOT NULL,
  `observation` text COLLATE utf8mb4_general_ci,
  `measured_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `unit_id` (`unit_id`),
  KEY `construction_id` (`construction_id`),
  CONSTRAINT `measurement_construction_id_fk` FOREIGN KEY (`construction_id`) REFERENCES `constructions` (`id`),
  CONSTRAINT `measurement_unit_id_fk` FOREIGN KEY (`unit_id`) REFERENCES `units` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Copiando dados para a tabela plss_db_2.measurements: ~12 rows (aproximadamente)
INSERT INTO `measurements` (`id`, `amount`, `unit_id`, `construction_id`, `observation`, `measured_at`, `created_at`, `updated_at`, `deleted_at`) VALUES
	(1, 12, 1, 1, 'Altura total do chão ao telhado.', '2025-05-20 05:30:00', '2025-05-21 05:30:29', '2025-05-21 05:30:29', NULL);

-- Copiando estrutura para tabela plss_db_2.migrations
CREATE TABLE IF NOT EXISTS `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Copiando dados para a tabela plss_db_2.migrations: ~1 rows (aproximadamente)
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
	(1, '0001_01_01_000000_create_users_table', 1),
	(2, '0001_01_01_000001_create_cache_table', 1),
	(3, '0001_01_01_000002_create_jobs_table', 1),
	(4, '2025_05_16_021759_create_personal_access_tokens_table', 2),
	(5, '2025_05_20_224555_create_audits_table', 3);

-- Copiando estrutura para tabela plss_db_2.password_reset_tokens
CREATE TABLE IF NOT EXISTS `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Copiando dados para a tabela plss_db_2.password_reset_tokens: ~0 rows (aproximadamente)

-- Copiando estrutura para tabela plss_db_2.sessions
CREATE TABLE IF NOT EXISTS `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Copiando dados para a tabela plss_db_2.sessions: ~0 rows (aproximadamente)
INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
	('kAbCSKR5QuxDn5hii0rcKVIjtU6pukVNTQpipP8z', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiYjhFaHYyVTNORkRsV3Q3YkE2U3QxOFdzRDZKZlVGNEs0MENXZWV2USI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1747358936),
	('yvb0r91L2f1svBUCoeduZRdhGu5h2dbEQ1AyG5Qk', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiY0Q0NjUyczlzMHR4MjRlVXN3UGZXZG1XWDJHRVJ6WklLazJCRXNoViI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1747274708);

-- Copiando estrutura para tabela plss_db_2.units
CREATE TABLE IF NOT EXISTS `units` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `abbreviation` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `unit_category_id` int unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `unit_category_id` (`unit_category_id`),
  CONSTRAINT `unit_unit_category_id_fk` FOREIGN KEY (`unit_category_id`) REFERENCES `unit_categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Copiando dados para a tabela plss_db_2.units: ~6 rows (aproximadamente)
INSERT INTO `units` (`id`, `name`, `abbreviation`, `unit_category_id`, `created_at`, `updated_at`) VALUES
	(1, 'Metros', 'm', 1, NULL, NULL),
	(2, 'Centímetros', 'cm', 1, NULL, NULL),
	(3, 'Milímetros', 'mm', 1, NULL, NULL),
	(4, 'Quilômetros', 'km', 1, NULL, NULL),
	(5, 'Metros quadrados', 'm2', 2, NULL, NULL),
	(6, 'Metros cúbicos', 'm3', 3, NULL, NULL),
	(7, 'Litros', 'L', 3, NULL, NULL),
	(8, 'Graus', '°', 4, NULL, NULL);

-- Copiando estrutura para tabela plss_db_2.unit_categories
CREATE TABLE IF NOT EXISTS `unit_categories` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Copiando dados para a tabela plss_db_2.unit_categories: ~4 rows (aproximadamente)
INSERT INTO `unit_categories` (`id`, `name`, `created_at`, `updated_at`) VALUES
	(1, 'Comprimento', '2025-05-17 00:56:54', '2025-05-17 00:56:55'),
	(2, 'Área', '2025-05-17 00:57:02', '2025-05-17 00:57:02'),
	(3, 'Volume', '2025-05-17 00:57:09', '2025-05-17 00:57:09'),
	(4, 'Ângulo', '2025-05-17 00:57:22', '2025-05-17 00:57:22');

-- Copiando estrutura para tabela plss_db_2.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Copiando dados para a tabela plss_db_2.users: ~32 rows (aproximadamente)
INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
	(1, 'Admin', 'admin@admin.com', NULL, '$2y$12$IuQ5EidmazNBtgCTTn3xb.JVfI/klFHfFYvaHgMIK3KfyM.wnobiK', NULL, '2025-05-16 05:18:13', '2025-05-16 05:18:13');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
