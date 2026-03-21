import User from '../models/User.model.js';

export const findUserByEmail = (email) => User.findOne({ email });

export const findUserByEmailWithPassword = (email) => User.findOne({ email }).select('+password');

export const createUser = (payload) => User.create(payload);

export const findUserById = (userId) => User.findById(userId);

export const findAllUsers = () => User.find({}).sort({ createdAt: -1 });

export const updateUserById = (userId, update) => User.findByIdAndUpdate(userId, update, { new: true });
