# Smart Goal Planner

A web application for managing and tracking financial savings goals with data persistence using `db.json` and `json-server`.

## Features

- **Data Management & Persistence**
  - All goal data stored in `db.json`
  - `json-server` provides REST API endpoints for CRUD operations
  - Initial goals fetched from `db.json` on app load

- **Multiple Savings Goals (CRUD Operations)**
  - Create: Add new financial goals (POST)
  - Read: View all goals
  - Update: Modify goal name, target amount, category, or deadline (PUT/PATCH)
  - Delete: Remove goals (DELETE)

- **Progress Tracking**
  - Display total saved vs. target amount for each goal
  - Show remaining amount needed
  - Visual progress bar per goal

- **Deposit Management**
  - Add deposits to specific goals
  - Update savedAmount via PATCH requests
  - Automatic progress recalculation

- **Overview Dashboard**
  - Total number of goals
  - Total money saved across all goals
  - Completed goals tracking
  - Time remaining for each goal
  - Warning for deadlines within 30 days
  - Overdue status for missed deadlines

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Suleyaziz/code-challenge-week-2
   cd code-challenge-week-2
2. Install and watch db.json server
    ```bash
    npm install -g json-server
    json-server --watch db.json
3. Start the server
   ```bash
   npm start
4. Start Vite
   ```bash
   npm run dev
   ## Author

**Suleiman Aziz**  
Email: [suleimanaziz212@gmail.com](mailto:suleimanaziz212@gmail.com)

## License

**MIT License**  
MIT
