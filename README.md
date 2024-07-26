# TopTalk News Aggregator App

TopTalk is a news aggregator application that allows users to browse news articles, bookmark their favorite articles, and customize their news feed based on selected categories. Admin users have the ability to add, update, and delete news articles.

## Features

- User registration and login
- Personalized news feed based on selected categories
- Bookmark articles for later reading
- Search for news articles
- Admin functionality to add, update, and delete news articles

## Tech Stack

- Frontend: React, Tailwind CSS
- Backend: Node.js, Express
- Database: MongoDB
- Authentication: JWT (JSON Web Token)
- Docker for containerization

## Prerequisites

- Docker installed on your machine

## .env files
 
 Create 2 .env files
 
 1. .env in ui folder content
 
 VITE_NEWS_API_KEY=92db3f7a2897475b95986c3d9f9ea8fe
 
 2. .env in server folder content- 

NEWS_API_KEY=92db3f7a2897475b95986c3d9f9ea8fe
JWT_SECRET=top_talk12345

## How to run:

Clone the repository
 git clone https://github.com/nandhuraju/TopTalk_News_Aggregator_App.git

Open directory open terminal

docker compose up --build

Open [http://localhost:3000/]

