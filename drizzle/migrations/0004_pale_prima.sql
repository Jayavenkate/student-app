ALTER TABLE `quizzes` MODIFY COLUMN `created_at` datetime NOT NULL DEFAULT '2025-04-29 06:04:44.631';--> statement-breakpoint
ALTER TABLE `results` MODIFY COLUMN `score` json NOT NULL;--> statement-breakpoint
ALTER TABLE `results` MODIFY COLUMN `created_at` datetime NOT NULL DEFAULT '2025-04-29 06:04:44.631';--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `created_at` datetime DEFAULT '2025-04-29 06:04:44.630';