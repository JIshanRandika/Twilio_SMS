import Park from '../models/Park.js';

// Get all parks
export const getParks = async (req, res) => {
  try {
    const parks = await Park.find();
    res.json(parks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching parks' });
  }
};

// Get a single park by ID
export const getParkById = async (req, res) => {
  try {
    const park = await Park.findById(req.params.id);
    if (!park) return res.status(404).json({ message: 'Park not found' });
    res.json(park);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching park' });
  }
};

// Create a new park
export const createPark = async (req, res) => {
  try {
    const newPark = new Park(req.body);
    await newPark.save();
    res.status(201).json(newPark);
  } catch (error) {
    res.status(500).json({ message: 'Error creating park' });
  }
};

// Update a park by ID
export const updatePark = async (req, res) => {
  try {
    const updatedPark = await Park.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPark) return res.status(404).json({ message: 'Park not found' });
    res.json(updatedPark);
  } catch (error) {
    res.status(500).json({ message: 'Error updating park' });
  }
};

// Delete a park by ID
export const deletePark = async (req, res) => {
  try {
    const deletedPark = await Park.findByIdAndDelete(req.params.id);
    if (!deletedPark) return res.status(404).json({ message: 'Park not found' });
    res.json({ message: 'Park deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting park' });
  }
};
