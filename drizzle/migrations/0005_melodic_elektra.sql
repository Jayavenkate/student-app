ALTER TABLE `quizzes` MODIFY COLUMN `created_at` datetime NOT NULL DEFAULT '2025-04-29 06:39:29.531';--> statement-breakpoint
ALTER TABLE `results` MODIFY COLUMN `created_at` datetime NOT NULL DEFAULT '2025-04-29 06:39:29.531';--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `created_at` datetime DEFAULT '2025-04-29 06:39:29.530';--> statement-breakpoint
ALTER TABLE `results` ADD `userId` int NOT NULL;--> statement-breakpoint
ALTER TABLE `results` ADD CONSTRAINT `results_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `results` ADD CONSTRAINT `fk_results_user` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE cascade;