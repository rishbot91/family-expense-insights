# Family Expense Insights
Family Expense Insights is a web application that provides insights into family-level and member-level financial data. It allows users to analyze member contributions to expenses, optimize savings, and manage transactions effectively.

# Project Overview
The project aims to:

- Analyze financial data to determine member contributions and spending patterns.
- Offer suggestions for savings optimization based on income and expenses.
- Allow management of member-level transactions.
- The system uses a MongoDB database for storing family and transaction data, and an xlsx file serves as the initial dataset for importing information.

# Technologies Used
- Backend: Node.js, Express.js
- Database: MongoDB
- Library: xlsx for handling Excel files
- Other: Mongoose for database modeling

# How to Run the Project
1. Clone the Repository
Clone the repository to your local machine:
```
git clone <repository-url>
cd family-expense-insights
```
3. Install Dependencies
Install all necessary Node.js dependencies:
```
npm install
```
3. Set Up MongoDB
Ensure MongoDB is installed and running on your system.
By default, MongoDB runs on mongodb://127.0.0.1:27017.
Verify MongoDB is running:
```
mongod
```
4. Import Data
Place the family_financial_and_transactions_data.xlsx file in the data folder of the project.
Run the data importer script to load data into MongoDB:
```
node dataImporter.js
```
5. Start the Server
Start the backend server:
```
node app.js
```
The server will start on http://localhost:5000.

# Future Improvements
- Add category-wise expense analysis.
- Integrate visualizations for data representation.
- Enhance with user authentication for secure access.
