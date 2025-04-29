CREATE TABLE `results` (
	`id` int AUTO_INCREMENT NOT NULL,
	`username` varchar(50) NOT NULL,
	`score` int NOT NULL,
	`topic` varchar(255) NOT NULL,
	`created_at` datetime NOT NULL DEFAULT '2025-04-28 16:44:10.013',
	CONSTRAINT `results_id` PRIMARY KEY(`id`),
	CONSTRAINT `results_username_unique` UNIQUE(`username`)
);
--> statement-breakpoint
ALTER TABLE `quizzes` MODIFY COLUMN `created_at` datetime NOT NULL DEFAULT '2025-04-28 16:44:10.013';--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `created_at` datetime DEFAULT '2025-04-28 16:44:10.012';--> statement-breakpoint
ALTER TABLE `quizzes` ADD `correctAnswer` varchar(255) NOT NULL;
