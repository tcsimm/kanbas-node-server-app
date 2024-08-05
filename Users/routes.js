// Users/routes.js
import * as dao from "./dao.js";
import mongoose from 'mongoose';

export default function UserRoutes(app) {
  const findAllUsers = async (req, res) => {
    try {
      const { role, name } = req.query;
      if (role) {
        console.log(`Finding users by role: ${role}`);
        const users = await dao.findUsersByRole(role);
        res.json(users);
        return;
      }
      if (name) {
        console.log(`Finding users by name: ${name}`);
        const users = await dao.findUsersByPartialName(name);
        res.json(users);
        return;
      }
      console.log('Finding all users');
      const users = await dao.findAllUsers();
      res.json(users);
    } catch (error) {
      console.error('Error retrieving users:', error);
      res.status(500).json({ error: 'Failed to retrieve users' });
    }
  };

  const findUserById = async (req, res) => {
    const userId = req.params.userId;
    console.log('User ID:', userId);

    if (!userId) {
      console.error('User ID is missing in the request');
      return res.status(400).json({ error: 'User ID is required' });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      console.error('Invalid User ID format:', userId);
      return res.status(400).json({ error: 'Invalid User ID format' });
    }

    try {
      console.log(`Finding user by ID: ${userId}`);
      const user = await dao.findUserById(userId);
      if (!user) {
        console.error('User not found with ID:', userId);
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      console.error('Error retrieving user by ID:', error);
      res.status(500).json({ error: 'Failed to retrieve user' });
    }
  };

  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
}
