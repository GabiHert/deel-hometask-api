# Deel API

## 📌 Overview

The **Deel API** is a RESTful service designed to manage contracts, jobs, payments, and financial transactions. It provides endpoints for listing contracts, making payments, depositing balances, and retrieving statistical insights.

## 📂 Project Structure

```
📦 deel-api
├── 📁 src
│   ├── 📁 application  # Business logic orchestration
│   ├── 📁 domain       # Business logic
│   ├── 📁 infra        # Infrastructure configuration
│   ├── 📁 integration  # Infrastructure integration
```

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/GabiHert/deel-hometask-api.git
   cd deel-api
   ```
2. Install dependencies:
   ```sh
   npm install  # or yarn install
   ```
3. Start the server:
   ```sh
   npm run dev  # Start in development mode
   npm start    # Start in production mode
   ```

---

## 📝 Notes

- Ensure that the `profile_id` header is set in requests that require user authentication.
- Use proper date formats when querying `/admin/best-profession` and `/admin/best-clients`.
- All requests should be made to `localhost:3001` unless configured otherwise.

---

## 🚀 Future improvements

- Integration with Cucumber
- API Swagger
- Application Logs
