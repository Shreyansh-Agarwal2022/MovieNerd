# MovieNerd: Movie Rating Application

**MovieNerd** is a feature-rich ReactJS-based web application designed for movie enthusiasts. It offers functionalities such as movie rating, search, and category-based discovery. The app supports user authentication, enabling users to save movies to their favorites list, add comments to specific movies, and explore detailed information about movies stored in the server database or retrieved from the OMDB API.

This WebApp was developed in collaboration with my friend **Sanidhya Gupta**, who implemented the backend using Java Spring Boot and managed the MySQL database.

## Key Features
- **Responsive Design:** A fully responsive UI that adapts seamlessly to various screen sizes.
- **Dynamic Content:** Built as a Single Page Application (SPA) using ReactJS, with dynamically updating content for a smooth user experience.
- **Search with Auto-Complete:** An intelligent search feature that auto-completes movie names based on the server database.
- **Movie Details:** Access detailed movie pages with information from both the server database and the external OMDB API.
- **User Login & Favorites:** Secure user login functionality to save and manage favorite movies.
- **Comments:** Users can share their thoughts by adding comments to individual movies.
- **React Routing:** Implemented for efficient navigation and to enhance the SPA experience.

![Screenshot 2024-12-23 225733](https://github.com/user-attachments/assets/9a821f75-5997-4a0a-8a43-8d451d0dfc24)
![Screenshot 2024-12-23 225757](https://github.com/user-attachments/assets/e5de41ba-eba6-45cc-b10b-80180271668a)
![Screenshot 2024-12-23 225829](https://github.com/user-attachments/assets/37a58b68-7ae5-4735-b198-e3b08cd30af9)
![Screenshot 2024-12-23 225939](https://github.com/user-attachments/assets/fd103579-12df-46da-9172-6923cbe7020f)
![Screenshot 2024-12-23 230443](https://github.com/user-attachments/assets/e53e5936-947f-4702-800a-8ebcdcf162e6)
![Screenshot 2024-12-23 230503](https://github.com/user-attachments/assets/91cf48d1-3197-4a3d-8814-65aed31060d9)

## Dependencies

### ReactJS
- The project uses **Vite** for setting up the ReactJS environment.  
  To create the project:  
  ```bash
  npm create vite@latest
  npm install
  ```
- NPM Packages Used : `axios`, `react-router-dom`
- TailwindCSS : https://tailwindcss.com/docs/installation

## Architecture Overview

This WebApp follows a request-response API architecture to facilitate communication with the server through APIs. The server is backed by a database that stores information about movies, reviews, and user details. It also handles fetching movie details from the external OMDB API, providing the data in JSON format.
![image](https://github.com/user-attachments/assets/394fd1cf-3ccf-46a1-96ab-e6cb22500d80)
Credit for Diagram : Sanidhya Gupta

## Database Overview

This WebApp utilizes an RDBMS SQL database. The movies table is sourced from the [IMDB Indian Movies Dataset](https://www.kaggle.com/datasets/arshadali12/imdb-indian-movies-dataset). The database is structured with three primary tables:

1. **User**: Stores user details, including hashed passwords for security.  
   *(Primary Key: `id`)*
   
2. **Movie**: Contains detailed information about movies, such as title, release dates, average rating, rating count, genre, and `movie_id`.  
   *(Primary Key: `movie_id`)*
   
3. **Reviews**: Stores user comments for specific movies.  
   *(Primary Key: (`id`, `movie_id`))*

The database schema was designed in collaboration with Sanidhya Gupta, who also implemented it in MySQL.

### ER Diagram 
![er-diagram-movienerd](https://github.com/user-attachments/assets/4e3f4f14-00f1-40db-bbb6-da8ed268c983)

## SRS Document (IEEE format)

This is written in collaboration with Kanishk Garg, Laukik Tiwari and Sanidhya Gupta.

[Link](https://docs.google.com/document/d/e/2PACX-1vREgC6sN5qAuPQDFaIH-A4EJCj6QKqVDfrhxSK6tzKMfUUzipRve1sSV4DuNAIjwg/pub)
