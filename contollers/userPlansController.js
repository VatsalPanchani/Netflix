//const userPlan = require('../models/userPlan');
const user_plan = require('../models/userPlan');
const nodemailer = require('nodemailer');
// userPlansController.js
const { sendEmail } = require('../sendemail');

// Create a new user plan
exports.createUserPlan = async (req, res) => {
  try {
    const { userId, planId, activationDate } = req.body;

    // Calculate expiration date as one month after the activation date
    const expirationDate = new Date(activationDate);
    expirationDate.setMonth(expirationDate.getMonth() + 1);

    const newUserPlan = new user_plan({
      userId,
      planId,
      activationDate,
      expirationDate,
    });

    const savedUserPlan = await newUserPlan.save();
    res.json(savedUserPlan);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
    console.log(error);
  }
};


// Read all user plans
exports.getAllUserPlans = async (req, res) => {
  try {
    const userPlans = await UserPlan.find();
    res.json(userPlans);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Read a specific user plan by ID
exports.getUserPlanById = async (req, res) => {
  try {
    const userPlan = await UserPlan.findById(req.params.userPlanId);
    if (!userPlan) {
      return res.status(404).json({ error: 'User plan not found' });
    }
    res.json(userPlan);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a user plan
exports.updateUserPlan = async (req, res) => {
  try {
    const updatedUserPlan = await UserPlan.findByIdAndUpdate(req.params.userPlanId, req.body, { new: true });
    if (!updatedUserPlan) {
      return res.status(404).json({ error: 'User plan not found' });
    }
    res.json(updatedUserPlan);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a user plan
exports.deleteUserPlan = async (req, res) => {
  try {
    const deletedUserPlan = await UserPlan.findByIdAndDelete(req.params.userPlanId);
    if (!deletedUserPlan) {
      return res.status(404).json({ error: 'User plan not found' });
    }
    res.json(deletedUserPlan);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};


//-----------E-Mail------------//

// Function to send an email to the user
// const sendExpirationEmail = async (email, activationDate, expireDate) => {
//   const subject = 'Your Plan Expiration Notification';
//   const message = `Dear User,\n\nYour plan is expiring soon.\n\nActivation Date: ${activationDate}\nExpire Date: ${expireDate}\n\nPlease renew your plan to continue enjoying our services.\n\nThank you,\nThe Netflix Team`;
//   await sendEmail(email, subject, message);
// };

// Function to handle the expiration logic
// exports.handleExpiration = async (req, res) => {
//   try {
//     // Get the user's email, activation date, and expire date from the request or database
//     const { email, activationDate, expireDate } = req.body;

//     // Calculate the current date
//     const currentDate = new Date();

//     // Check if the expire date is reached
//     if (currentDate >= new Date(expireDate)) {
//       // Send the expiration email
//       await sendExpirationEmail(email, activationDate, expireDate);
//     }

//     // Handle other expiration logic or responses
//     // ...

//     res.status(200).json({ message: 'Expiration handled successfully' });
//   } catch (error) {
//     console.error('Error handling expiration:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

//module.exports = { handleExpiration };

exports.sendEmail = async (user_email) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'vatsalpanchani10@gmail.com',
      pass: 'jltvaiajmuvamlvh'
    }
  })

  await transporter.sendMail({
    from: 'vatsalpanchani10@gmail.com',
    to: user_email,
    subject: 'Plan Expiration Notification',
    text: 'Your plan has expired today. Please renew your subscription.'
  }).then((result) => {
    console.log('Email sent');
  }).catch((error) => {
    console.log(error);
  });
}