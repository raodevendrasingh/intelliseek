CREATE TABLE `files` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`url` text NOT NULL,
	`vectorIndex` text NOT NULL,
	`timestamp` text DEFAULT (CURRENT_TIMESTAMP)
);
