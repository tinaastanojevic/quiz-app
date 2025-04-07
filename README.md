# Quiz application
This is a frontend-only web application that allows users to participate in quizzes. Users can enter their username and choose a category to start the quiz. Once the quiz is completed, the application displays a scoreboard showing the user's results.

## Technologies Used

- Frontend: **React** v19.0.0
- Styling: **Tailwind CSS** v4.0.14
- Development Server: **Vite** v6.2.0
- Fake API: **JSON Server** v1.0.0-beta.3
- External API: **Open Trivia Database API**

## Startup commands
1. Install dependencies
   
   Before running the project, install all required dependencies. For this, you will need to have **Node.js** installed on your machine (recommended version: 18.x.x or later). This project was developed using **Node.js** v20.18.2.
    ```
    # Install dependencies
    npm install
    ```
2. Start Development Server

   To start the Vite development server for this application, use the following command:
   ```
   npm run dev
   ```
3. Run JSON Server
   
   Add the following script to the scripts section of your package.json file:
   ```
   "scripts": {
   "server": "npx json-server --watch data/data.json --port 8000"
   }
   ```
   Then, run the JSON server by executing:
   ```
   npm run server
   ```

 


    
