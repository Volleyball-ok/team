const express = require('express');
const router = express.Router();
const Team = require('../models/Team');
const nodemailer = require('nodemailer');

router.post('/', async (req, res) => {
  const { teamName, players, email, phone, location, numPlayers } = req.body;

  try {
    const newTeam = new Team({ teamName, players, email, phone, location, numPlayers });
    await newTeam.save();

    const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false  // <-- ADD THIS LINE
  }
});


    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: [email, process.env.EMAIL_USER],
      subject: '🏐 Volleyball Tournament Registration',
      text: `Hey ${teamName}!\n\nThanks for registering.\nWe'll send your match time soon!\n\n🏐 - Volleyball Team`
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Registered and email sent!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Registration failed.' });
  }
});

module.exports = router;
