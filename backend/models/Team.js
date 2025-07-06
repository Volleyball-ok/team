const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
  teamName: { type: String, required: true },
  captainName: { type: String },
  players: [String],
  email: { type: String, required: true },
  phone: { type: String },
  location: { type: String },
  numPlayers: { type: Number }
}, { timestamps: true });

module.exports = mongoose.model('Team', TeamSchema);
