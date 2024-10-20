const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const AuctionItem = require('./AuctionItem');

const Bid = sequelize.define('Bid', {
  amount: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
}, {
  schema: 'auction_schema', // Ensure the schema is specified
  tableName: 'Bids',        // Optionally specify the table name
  timestamps: true,         // Adds createdAt and updatedAt
});

// Define associations
Bid.belongsTo(User, {
  foreignKey: {
    allowNull: false,       // Ensure that a bid cannot exist without a user
  },
  onDelete: 'CASCADE',      // Delete bids if the associated user is deleted
});
Bid.belongsTo(AuctionItem, {
  foreignKey: {
    allowNull: false,       // Ensure that a bid cannot exist without an auction item
  },
  onDelete: 'CASCADE',      // Delete bids if the associated auction item is deleted
});

module.exports = Bid;
