-- Add missing columns to users table
ALTER TABLE users ADD COLUMN phone VARCHAR(15) AFTER email;

-- Add missing columns to fines table
ALTER TABLE fines ADD COLUMN user_id INT AFTER id;
