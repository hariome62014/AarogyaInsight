const mongoose = require("mongoose");

const providerSchema = new mongoose.Schema({
  provider_id: {
    type: Number,
    required: true,
    unique: true, // Designate provider_id as the primary key
  },
  // You can add more fields for additional data related to the provider
});

const Provider = mongoose.model("Provider", providerSchema);

module.exports = Provider;
