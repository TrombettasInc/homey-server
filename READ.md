# Homey App (Backend)

The Homey backend is part of a **Home Improvement Project Tracker** application. This app allows users to organize and track their home improvement projects, ranging from everyday tasks like laundry to small fixes and major renovations.

## Description

The backend of the Homey app helps users manage and track home improvement projects. It handles user authentication, manages project and task data, and communicates with the frontend to provide seamless tracking and organization of home improvement projects.

### Live Application

The backend is deployed on **Render.com** and can be accessed at:

[Homey Backend](https://homey-server.onrender.com)

### Key Features

- **User Management**: Users can create accounts, authenticate, log in, and log out.
- **Project Management**: Create and manage home improvement projects with detailed task lists.
- **Task Tracking**: Track individual tasks within a project, including deadlines, progress, and status.
- **Timeline Management**: Keep track of project timelines and task deadlines.
- **JWT-based Authentication**: Secure authentication using JSON Web Tokens (JWT).

## Getting Started

### Dependencies

Before running this project, ensure you have the following installed:

- **Node.js** (version 14 or higher)
- **npm** 
- Compatible with **Windows, macOS, or Linux**

The project also has the following core dependencies:

#### Production Dependencies
- `bcrypt`: ^5.1.1 - For password hashing and encryption.
- `cookie-parser`: ^1.4.6 - For parsing cookies attached to client requests.
- `cors`: ^2.8.5 - Middleware to enable Cross-Origin Resource Sharing.
- `dotenv`: ^16.4.5 - For loading environment variables from `.env` files.
- `express`: ^4.19.2 - The server framework used to build the backend.
- `express-jwt`: ^8.4.1 - Middleware to validate JWT tokens in Express.
- `jsonwebtoken`: ^9.0.2 - For creating and verifying JWT tokens.
- `mongoose`: ^8.6.0 - MongoDB object modeling for Node.js.
- `morgan`: ^1.10.0 - HTTP request logger middleware.

#### Development Dependencies
- `nodemon`: ^3.1.4 - Utility to automatically restart the server on changes.

### Installing and Running the Project

* Clone the repository:
    ```bash
    git clone https://github.com/TrombettasInc/homey-server.git
    cd homey-server
    ```

* Install the dependencies:
    ```bash
    npm install
    ```

* Set up the environment variables:
    * Create a `.env` file in the root directory.
    * Add the following variables to the `.env` file:
      ```bash
      MONGODB_URI=your-mongodb-uri
      TOKEN_SECRET=your-jwt-secret
      ```

* Start the development server:
    ```bash
    npm run dev
    ```

* To run the project in production:
    ```bash
    npm start
    ```

## Help

If you run into issues, try the following:

- Ensure your backend API is running and properly configured.
- Double-check your `.env` file for correct API URL and keys.
- Make sure you are using the right version of Node.js.

## Authors

Contributors names and contact info

- **Antonia Trombetta** - [GitHub Profile](https://github.com/antoniatrombetta)
- **Roberta Trombetta** - [GitHub Profile](https://github.com/betafalc2)
- **Trombettas Inc.** - [GitHub Profile](https://github.com/TrombettasInc)

## Version History

- **0.2.0** (Sep 13, 2024)
    - Added health check endpoint.
    - Fixed `PUT` method on project routes.
    - Cleaned up `isOwned` as it was not implemented correctly.
    - Removed `createdBy` field in the project model.
    - Added functionality to `createdBy`.
    - Implemented `isProjectOwner` functionality.
    - Completed the implementation of `isOwnedBy`.
    - Added `ownedBy` field to the project model.

- **0.1.0** (Sep 6–9, 2024)
    - Initial release.
    - Fixed `isDone` on project route.
    - Fixed `startDate` bug on projects.
    - Implemented deadlines in the project creation API.
    - Fixed deadline handling in project and task models.
    - Added deadline field to the `ProjectSchema`.
    - General model fixes.

## Acknowledgments

Inspiration, code snippets, etc.

* [Luis Junco](https://gist.github.com/luisjunco)
* [contra UI kit](https://contrauikit.com/)
* [Matheus Battisti](https://github.com/matheusbattisti)
* [pixlr](https://pixlr.com/)
* [awesome-readme](https://github.com/matiassingers/awesome-readme)