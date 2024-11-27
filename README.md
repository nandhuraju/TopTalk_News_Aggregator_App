# TopTalk: Personalized News Aggregator App

TopTalk is a web application that provides a personalized news experience by fetching, filtering, and displaying news articles based on user preferences. Users can bookmark articles, search for news, and browse categories. Admin users can manage news articles.

---

## Features
- **User Authentication**: Login and token-based authorization using JWT.
- **Personalized News Feed**: Fetch articles tailored to user interests.
- **Bookmark Management**: Bookmark your favorite articles and access them anytime.
- **Search Functionality**: Find articles quickly with a keyword search.
- **Admin Functionality**: Admins can add and edit news articles.

---

## Prerequisites

Ensure you have the following installed on your system:
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

---

## Installation

Follow these steps to set up and run the app locally:

### Clone the Repository

git clone https://github.com/nandhuraju/TopTalk_News_Aggregator_App.git

cd TopTalk_News_Aggregator_App

docker compose up --build

App will start running here   http://localhost:3000/


## User Roles: Admin and Subscriber

TopTalk supports two types of users:
1. **Admin**: Can manage news articles (add, edit, delete).
2. **Subscriber**: Can view, search, and bookmark news articles.

---

### How User Roles Work

1. During registration, users are assigned the **subscriber** role by default.
2. The backend protects admin-only routes using role-based middleware.
3. The frontend dynamically adjusts features based on the user's role:
   - **Admin Features**:
     - Access to the "Add News" section.
     - Ability to edit or delete news articles.
   - **Subscriber Features**:
     - View, search, and bookmark articles.

---

### How to Test User Roles

1. **Register a Subscriber**:
   - Register without specifying the role, or explicitly set the role to "subscriber".
2. **Register an Admin**:
   - Use an admin role by modifying the backend request or directly adding it in the database.
3. **Admin Access**:
   - Log in as an admin and access the "Add News" section.
4. **Subscriber Restrictions**:
   - Log in as a subscriber and verify that admin-only routes are inaccessible.
