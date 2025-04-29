CREATE TABLE `quizzes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text NOT NULL,
	`question` varchar(255) NOT NULL,
	`answer1` varchar(255) NOT NULL,
	`answer2` varchar(255) NOT NULL,
	`answer3` varchar(255) NOT NULL,
	`answer4` varchar(255) NOT NULL,
	`correctAnswer` varchar(255) NOT NULL,
	`created_at` datetime NOT NULL DEFAULT '2025-04-27 19:45:14.207',
	CONSTRAINT `quizzes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `created_at` datetime DEFAULT '2025-04-27 19:45:14.206';--> statement-breakpoint
ALTER TABLE `users` ADD `role` varchar(20) DEFAULT 'user' NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `status` boolean DEFAULT false NOT NULL;