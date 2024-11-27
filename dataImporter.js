const mongoose = require('mongoose');
const xlsx = require('xlsx');
const Family = require('./models/Family');
const Transaction = require('./models/Transaction');

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/family_expenses', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

const importData = async () => {
  try {
    // Load the workbook from the data folder
    const workbook = xlsx.readFile('./data/family_financial_and_transactions_data.xlsx');

    // Load the first sheet (assuming it contains all data)
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = xlsx.utils.sheet_to_json(sheet);

    // Extract family-level data and member-level transactions
    const familyMap = new Map(); // To track unique family data
    const transactions = [];

    rows.forEach((row) => {
      // Collect unique family-level data
      if (!familyMap.has(row['Family ID'])) {
        familyMap.set(row['Family ID'], {
          familyID: row['Family ID'],
          income: row['Income'],
          savings: row['Savings'],
          monthlyExpenses: row['Monthly Expenses'],
          loanPayments: row['Loan Payments'],
          creditCardSpending: row['Credit Card Spending'],
          dependents: row['Dependents'],
          financialGoalsMet: row['Financial Goals Met (%)'],
        });
      }

      // Collect transaction data
      transactions.push({
        memberID: row['Member ID'],
        familyID: row['Family ID'],
        category: row['Category'],
        amount: row['Amount'],
        date: new Date(row['Transaction Date']),
      });
    });

    // Insert family-level data
    for (const family of familyMap.values()) {
      await Family.create(family);
    }
    console.log('Family data imported successfully');

    // Insert transaction data
    await Transaction.insertMany(transactions);
    console.log('Transaction data imported successfully');
  } catch (error) {
    console.error('Error importing data:', error.message);
  }
};

// Run the importer
const run = async () => {
  await connectDB();
  await importData();
  process.exit();
};

run();
