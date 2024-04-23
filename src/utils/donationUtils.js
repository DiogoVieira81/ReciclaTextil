function calculatePointsForDonation(donationAmount) {
    // Award 1 point for every $1 donated
    return Math.round(donationAmount);
  }

  module.exports = calculatePointsForDonation;