# 🌦️ Weather Dashboard
A full-stack weather dashboard that allows users to search for a city and view the current weather and a 5-day forecast. The project includes a frontend built with Vite and TypeScript and a backend built with Express and Node.js. The app integrates with the OpenWeather API to fetch weather data.

# 🚀 Table of Contents
Project Description
Features
Technologies Used
Folder Structure
Setup Instructions
Environment Variables
API Endpoints
Deployment
Screenshots
Future Improvements
License

# 📖 Project Description
The Weather Dashboard allows travelers to search for weather forecasts of multiple cities. The application displays current weather conditions and a 5-day forecast, helping users plan their trips accordingly. The backend uses Express to handle API requests and stores search history, while the frontend provides an intuitive user interface.

# 🌟 Features
City Search: Search for any city to get weather data.
Current Weather: View current weather conditions, including:
Temperature
Humidity
Wind Speed
Weather Icon and Description
5-Day Forecast: Displays weather for the next 5 days.
Search History: Stores and displays previously searched cities.
Delete History: Delete specific cities from search history.
Error Handling: Alerts for invalid API keys or city names.
🛠️ Technologies Used
Frontend (Client)
Vite (Build Tool)
TypeScript
HTML/CSS/JavaScript
Backend (Server)
Node.js
Express
TypeScript
Axios (for making HTTP requests)
dotenv (for managing environment variables)
APIs
OpenWeather API (for weather data)

# 📂 Folder Structure
bash
Copy code
weather-dashboard/
│
├── client/               # Frontend
│   ├── dist/             # Build output
│   ├── public/           # Static assets
│   ├── src/              # Source files
│   │   ├── main.ts       # Entry point for the frontend
│   │   └── styles/       # CSS files
│   ├── index.html        # Main HTML file
│   └── vite.config.js    # Vite configuration
│
├── server/               # Backend
│   ├── db/               # Database files (searchHistory.json)
│   ├── src/              # Source files
│   │   ├── routes/       # API routes
│   │   ├── service/      # Business logic
│   │   └── server.ts     # Entry point for the server
│   ├── .env              # Environment variables
│   └── tsconfig.json     # TypeScript configuration
│
├── package.json          # Project metadata and scripts
└── README.md             # Project documentation

# ⚙️ Setup Instructions
Follow these steps to get the project up and running on your local machine.

1. Clone the Repository
bash
Copy code
git clone https://github.com/your-username/weather-dashboard.git
cd weather-dashboard

2. Install Dependencies
Install dependencies for both the root, client, and server folders:

bash
Copy code
npm install
cd client && npm install
cd ../server && npm install

3. Set Up Environment Variables
Create a .env file in the server folder and add your OpenWeather API key:

server/.env

plaintext
Copy code
API_KEY=your_openweather_api_key
PORT=3001

4. Build the Project
Run the following command to build the client and server:

bash
Copy code
npm run build

5. Start the Server
Start the server in development mode:

bash
Copy code
npm run start:dev
The server will run on http://localhost:3001.

6. Start the Client
In a separate terminal, run the client in development mode:

bash
Copy code
cd client
npm run dev
The client will run on http://localhost:3000.

# 🔧 Available Scripts
Root Scripts:
Command	Description:
npm install	Install all dependencies in the root folder.
npm run build	Build the client and server.
npm run start	Build and start the server in production mode.
npm run start:dev	Start the server and client in development mode.

Client Scripts:
Command	Description:
npm run dev	Start the Vite development server.
npm run build	Build the client for production.
npm run preview	Preview the production build.

Server Scripts:
Command	Description:
npm run build	Compile TypeScript to JavaScript.
npm run dev	Start the server with nodemon.
npm start	Start the server in production mode.

# 🌐 API Endpoints
1. Get Weather Data
Endpoint: POST /api/weather
Description: Fetch weather data for a city and save it to the search history.

Request Body:

json
Copy code
{
  "cityName": "London"
}
Response:

json
Copy code
{
  "weather": { ... },
  "savedCity": { "id": "uuid", "cityName": "London" }
}

2. Get Search History
Endpoint: GET /api/weather/history
Description: Retrieve the search history.

Response:

json
Copy code
[
  { "id": "uuid", "cityName": "London" },
  { "id": "uuid", "cityName": "New York" }
]

3. Delete City from History
Endpoint: DELETE /api/weather/history/:id
Description: Delete a city from the search history by its ID.

# 🚀 Deployment
Deploy to Render
Push to GitHub:

bash
Copy code
git add .
git commit -m "Initial commit"
git push origin main
Deploy to Render:

Go to Render.
Connect your repository.
Set environment variables (API_KEY).
Deploy both the server and client.

# 🖼️ Screenshots
Add screenshots of your application in action.

# 🚧 Future Improvements
Add more detailed error handling.
Improve UI design and responsiveness.
Add unit tests for server and client code.
Implement caching for API responses.

# 📜 License
This project is licensed under the MIT License.

Thank You! 🌟
If you have any questions or need further assistance, feel free to open an issue or reach out!

Link: