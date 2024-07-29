// const prompt = require('prompt-sync')();
// const username = prompt('What is your name? ');
// console.log(`Your name is ${username}`);

// NPM imports
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');

// Connect to MongoDB using Mongoose
const connect = async () => {
    try {
        console.log(process.env.MONGODB_URI);
        // Create connection
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
        await runQueries();
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    } finally {
        await mongoose.connection.close();
        console.log('Disconnected from MongoDB');
        process.exit();
    }
};

// Schema and Model Definition
const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
});

const Customer = mongoose.model('Customer', customerSchema);

// Run the connection
connect();

const runQueries = async () => {
    // Uncomment the functions you want to execute
    await createCustomer(newCustomer);
    await getAllCustomers();
    // await updateCustomerById('PUT_A_VALID_CUSTOMER_ID_HERE', { name: 'Updated Name' });
    // await deleteCustomerById('PUT_A_VALID_CUSTOMER_ID_HERE');
};

// Create a new customer payload
const newCustomer = {
    name: 'Vivienne',
    age: 6,
};

// Functions to interact with the database

// Create a new customer
async function createCustomer(customerData) {
    try {
        const response = await Customer.create(customerData);
        console.log('Customer created:', response);
    } catch (error) {
        console.error('Error creating customer:', error);
    }
}

// Get all customers
async function getAllCustomers() {
    try {
        const response = await Customer.find({});
        console.log('Customers found:', response);
    } catch (error) {
        console.error('Error finding customers:', error);
    }
}

// Update a customer by ID
async function updateCustomerById(id, updateData) {
    try {
        const response = await Customer.findByIdAndUpdate(id, updateData, {
            new: true,
        });
        console.log('Customer updated:', response);
    } catch (error) {
        console.error('Error updating customer:', error);
    }
}

// Delete a customer by ID
async function deleteCustomerById(id) {
    try {
        const response = await Customer.findByIdAndDelete(id);
        console.log('Customer deleted:', response);
    } catch (error) {
        console.error('Error deleting customer:', error);
    }
}