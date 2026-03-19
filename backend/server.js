require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/config/db');

const PORT = process.env.PORT || 5000;

// Bind to 0.0.0.0 for Render health checks immediately
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
    
    // Connect to Database after binding port
    connectDB().then(() => {
        console.log('MongoDB successfully connected.');
    }).catch(err => {
        console.error('Failed to connect to database:', err);
    });
});
