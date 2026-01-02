-- Enable the pgcrypto or uuid-ossp extension to generate UUIDs
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. Users Table
-- Designed for high-speed lookups and strict regional isolation
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL, -- Never store raw "pass", always hash
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

-- Performance optimization: index for login lookups
CONSTRAINT username_length CHECK (char_length(username) >= 3) );

-- 2. Posts Table
-- Linked to the regional user via UUID
CREATE TABLE posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL, -- The "simple text" requirement
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

-- Constraint to prevent empty posts
CONSTRAINT content_not_empty CHECK (trim(content) <> '') );

-- Indexing for performance
-- High-concurrency systems need an index on the foreign key to speed up feed retrieval
CREATE INDEX idx_posts_user_id ON posts (user_id);
-- Index by timestamp to show latest posts first (Speed Use Case)
CREATE INDEX idx_posts_created_at ON posts (created_at DESC);