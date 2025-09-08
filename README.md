# Expenses App

This repository contains two main projects:
- **Expenses.API**: A .NET 9 Web API for managing users and their financial transactions.
- **Expenses.Angular-Client**: An Angular application that serves as the front-end for interacting with the API.

---

## Expenses.API (.NET 9 Web API)

The API provides endpoints for:
- **User authentication and management**
- **CRUD operations for financial transactions** (add, update, delete, list, get by ID)
- Each transaction is associated with a user and includes fields such as type, amount, category, and timestamps.

**Tech Stack:**
- .NET 9
- Entity Framework Core
- SQL Server

**Key Features:**
- User registration and login
- Secure transaction management per user
- Data models for User and Transaction
- DTOs for safe data transfer

**Project Structure:**
- `Controllers/` – API endpoints for authentication and transactions
- `Data/Services/` – Business logic for transactions
- `Models/` – Data models for users and transactions

**Running the API:**
The API will run at [https://localhost:7061](HTTPS: https://localhost:7061) by default.

- cd Expenses.API/Expenses.API
- dotnet restore
- dotnet build
- dotnet run


---

## Expenses.Angular-Client (Angular Front-End)

The Angular client provides a user interface for:
- Registering and logging in
- Viewing, adding, editing, and deleting transactions
- Viewing transaction history by user

**Tech Stack:**
- Angular
- TypeScript
- Consumes the Expenses.API backend

**Running the Angular Client:**
- cd Expenses.Angular-Client
- npm install
- ng serve

The Angular app will typically run at [http://localhost:4200](http://localhost:4200).

---

## Getting Started

### Prerequisites
- [.NET 9 SDK](https://dotnet.microsoft.com/download)
- [Node.js & npm](https://nodejs.org/)
- [Angular CLI](https://angular.io/cli)
- SQL Server (or update the connection string in `appsettings.json`)

### Project Structure

```text
/
├── Expenses.API/Expenses.API         # .NET 9 Web API project
├── Expenses.Angular-Client          # Angular front-end project
├── .gitignore
└── README.md
```


---

## License

This project is licensed under the MIT License.
