ALTER TABLE `quizzes` MODIFY COLUMN `created_at` datetime NOT NULL DEFAULT '2025-04-29 06:00:32.626';--> statement-breakpoint
ALTER TABLE `results` MODIFY COLUMN `created_at` datetime NOT NULL DEFAULT '2025-04-29 06:00:32.627';--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `created_at` datetime DEFAULT '2025-04-29 06:00:32.625';--> statement-breakpoint
ALTER TABLE `results` ADD `topic` json NOT NULL;--> statement-breakpoint
ALTER TABLE `results` ADD `completed` text DEFAULT ('[]') NOT NULL;