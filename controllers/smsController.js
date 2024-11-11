// controllers/smsController.js
import User from '../models/User.js';
import twilio from 'twilio';
import dotenv from 'dotenv';

dotenv.config();

const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export const handleSms = async (req, res) => {
  const messageBody = req.body.Body;
  const fromNumber = req.body.From;

  try {
    const [key, value] = messageBody.split(':').map((str) => str.trim());

    if (!key || !value) {
      throw new Error('Invalid format');
    }

    await User.findOneAndUpdate(
      { phone_number: fromNumber },
      { key, value, last_updated: new Date() },
      { upsert: true, new: true }
    );

    await twilioClient.messages.create({
      body: `Successfully updated ${key} to ${value}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: fromNumber,
    });

    res.send('<Response></Response>');
  } catch (error) {
    console.error('Error processing message:', error);

    await twilioClient.messages.create({
      body: 'Error: Message format should be "key:value"',
      from: process.env.TWILIO_PHONE_NUMBER,
      to: fromNumber,
    });

    res.status(400).send('<Response></Response>');
  }
};

export const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
