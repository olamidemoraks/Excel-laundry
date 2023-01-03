const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const reservationScheme = new mongoose.Schema(
  {
    sweater: {
      type: Number,
      default: 0,
    },
    suit: {
      type: Number,
      default: 0,
    },
    trouser: {
      type: Number,
      default: 0,
    },
    jacket: {
      type: Number,
      default: 0,
    },
    blouse: {
      type: Number,
      default: 0,
    },
    jeans: {
      type: Number,
      default: 0,
    },
    shirt: {
      type: Number,
      default: 0,
    },
    tShirt: {
      type: Number,
      default: 0,
    },
    pickupDate: {
      type: Date,
      required: [true, "please choose a pickup date"],
    },
    pickupTime: {
      type: String,
      required: [true, "please choose a pickup Time"],
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // service: {
    //   type: [String],
    //   default: ["Iron"],
    //   required: true,
    // },
    status: {
      type: String,
      enum: ["waiting", "accepted", "rejected", "delivered"],
      default: "waiting",
    },
  },
  { timestamps: true }
);

reservationScheme.plugin(AutoIncrement, {
  inc_field: "receipt",
  id: "receiptNum",
  start_seq: 500,
});

module.exports = mongoose.model("Reservation", reservationScheme);
