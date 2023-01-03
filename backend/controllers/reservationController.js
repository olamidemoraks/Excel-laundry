const Reservation = require("../models/reservation");
const User = require("../models/user");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("../errors");

const getUserReservation = async (req, res) => {
  const { userId } = req.user;
  const reservations = await Reservation.find({ userId })
    .sort("-createdAt")
    .exec();
  res.status(StatusCodes.OK).json({ reservations, total: reservations.length });
};

const getAllReservation = async (req, res) => {
  const reservations = await Reservation.find()
    .sort("-pickupDate")
    .lean()
    .exec();
  const reservationWithUser = await Promise.all(
    reservations.map(async (reservation) => {
      const user = await User.findById(reservation.userId)
        .select("-password -role")
        .lean()
        .exec();
      return {
        ...user,
        ...reservation,
      };
    })
  );
  res
    .status(StatusCodes.OK)
    .json({ reservations: reservationWithUser, total: reservations.length });
};

const createReservation = async (req, res) => {
  req.body.userId = req.user.userId;
  const reservation = await Reservation.create(req.body);
  res.status(StatusCodes.CREATED).json(reservation);
};

const getReservation = async (req, res) => {
  const { id } = req.params;
  const reservation = await Reservation.findOne({ id }).exec();
  if (!reservation) {
    throw new NotFoundError("Reservation not found.");
  }
  res.status(StatusCodes.OK).json(reservation);
};

const cancelReservation = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;

  const reservation = await Reservation.findOneAndRemove({ id }).exec();
  if (!reservation) {
    throw new NotFoundError("Reservation not found.");
  }
  if (reservation.userId.toString() !== userId) {
    throw new BadRequestError("Not allowed");
  }
  res.status(StatusCodes.OK).json(reservation);
};

const updateReservation = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const reservation = await Reservation.findOne({ _id: id }).exec();
  if (!reservation) {
    throw new NotFoundError("Reservation not found.");
  }
  reservation.status = status;
  await reservation.save();
  res.status(StatusCodes.OK).json(reservation);
};

module.exports = {
  createReservation,
  updateReservation,
  getAllReservation,
  cancelReservation,
  getUserReservation,
  getReservation,
};
