-- Drop the database if it exists
DROP DATABASE IF EXISTS tribodb;

-- Create the database
CREATE DATABASE tribodb;

-- Connect to the triboDB database
\c tribodb;

-- Create the UserApiLimit table
CREATE TABLE userapilimit (
    id SERIAL PRIMARY KEY,
    userId VARCHAR(255) UNIQUE,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    count INT DEFAULT 0,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the UserSubscription table
CREATE TABLE usersubscription (
    id SERIAL PRIMARY KEY,
    userId VARCHAR(255) UNIQUE,
    name VARCHAR(255) DEFAULT '',
    email VARCHAR(255) DEFAULT '',
    stripeCustomerId VARCHAR(255) UNIQUE,
    stripeSubscriptionId VARCHAR(255) UNIQUE,
    stripePriceId VARCHAR(255) UNIQUE,
    stripeCurrentPeriodEnd TIMESTAMP
);




