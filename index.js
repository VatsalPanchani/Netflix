const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const planRoutes = require('./routes/planRoutes');
const userPlansRoutes = require('./routes/userPlansRoutes');
const videoRoutes = require('./routes/videoRoutes');


const app = express();
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Serve uploaded files statically

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/netflix', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  });

// Routes
app.use('/users', userRoutes);
app.use('/plans', planRoutes);
app.use('/user-plans', userPlansRoutes);
app.use('/videos', videoRoutes);

// Start the server
app.listen(5000, () => {
  console.log('Server started on port 5000');
});

//-----------Cron Job----------------//
const cron = require('node-cron');
const UserPlan = require('./models/userPlan');
const { sendEmail } = require('./contollers/userPlansController');
//const { sendExpirationEmail } = require('./');

// Schedule cron job to run daily
cron.schedule('*/60 * * * * *', async () => {
  try {
    // Get current date and time
    const currentDate = new Date();

    // Find expired user plans
    const expiredUserPlans = await UserPlan.find({ expirationDate: { $lte: currentDate } }).populate('userId');
    // // Send email notifications for expired plans
    console.log(expiredUserPlans);


    for (const userPlan of expiredUserPlans) {
      const user_email = userPlan.userId.email;
      console.log(user_email);
      // const user_email = 'teksun123456@gmail.com';
      await sendEmail(user_email);
    }
    console.log('All Expiration email notifications sent!');

  }
  catch (error) {
    console.error('Error in cron job:', error);
  }
});
