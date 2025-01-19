# Personal Notes App

This is a simple and intuitive web application designed to help you organize your thoughts, tasks, and ideas effectively and securely.

---

## Features

- **Create Notes**: Create notes with ease to organize your thoughts , ideas etc.
- **Maintain**: Edit the note when needed and delete them.
- **Organize**: Organize notes by proper categories and tags.
- **Secure**: Secure signup and login and your personal notes.
- **Responsive design**: The web-application is responsive for seamless use across devices and all kind of screen sizes.

---

## Tech Stack

- **Frontend**: React.js , CSS
- **Backend**: Node.js, Express.js
- **State Management**: Context API and Redux
- **Database**: MongoDB and Local Storage
- **Authentication**: JWT Web-Token for authentication

---

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm
- Git
- A code editor like
- A modern web browser

---

## Getting Started

Follow the steps below to set up and run the project locally.

### 1. Clone the repository:

   ```bash
   git clone https://github.com/ankit-j23/PersonalNotesApp.git
   cd PersonalNotesApp
   ```

#### 2. Install dependencies:

#### Backend

Navigate to the `server` directory and install the dependencies:

```bash
cd backend
npm install
```

#### Frontend
Navigate to the `client` directory and install the dependencies:

```bash
cd ../mynotebook
npm install
```

### 3. Start the Application

#### Backend
Start the server:

```bash
cd backend
npm start
```

#### Frontend
Start the client:

```bash
cd ../mynotebook
npm start
```

### Both Concurrently
```bash
npm both
```

### 4. Open your browser and navigate to:

 ```
 http://localhost:3000
```

---

## Usage

1. Open your browser and navigate to `http://localhost:3000`.
2. Register a new account or log in with an existing one.
3. Add the notes using the given form on the web-page.
4. Edit or delete and do different functions using the buttons provided.

---

## Folder Structure

/client       - React frontend
/server       - Node.js backend
README.md     - Project documentation

---

## Troubleshooting

- **User not authenticated**: Ensure the JWT token is being stored in `localStorage` and included in API requests.
- **Database connection error**: Verify your MongoDB instance is running and the `MONGO_URI` is correct.

---

## License

This project is licensed under the MIT License.

---

## Contributing

- Ankit Kumar

---
