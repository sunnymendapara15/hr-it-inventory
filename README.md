# HR IT Inventory

This repo hosts a lightweight inventory tracker that the HR team can use to log and review IT assets without any authentication.

## Backend (ASP.NET Core)
1. `cd backend`
2. `dotnet restore`
3. `dotnet run`
   - The API listens on `https://localhost:7243` by default. Adjust `appsettings.json` if needed.
   - Data is persisted to `inventory.db` in the backend folder.

## Frontend (React)
1. `cd frontend`
2. `npm install`
3. `npm start`
   - Uses `REACT_APP_API_BASE_URL` to target the backend (defaults to `http://localhost:5244`).

## Testing & Workflow
- Backend endpoint `GET /api/inventory` returns all entries.
- Backend endpoint `POST /api/inventory` accepts JSON payloads with `name`, `description`, `quantity`, and `notes`.
- The frontend form validates required fields before sending requests and refreshes the inventory list on success.
