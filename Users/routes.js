// Users/routes.js
import * as dao from "./dao.js";
import mongoose from 'mongoose';

export default function UserRoutes(app) {
  const findAllUsers = async (req, res) => {
    try {
      const { role, name } = req.query;
      if (role) {
        const users = await dao.findUsersByRole(role);
        res.json(users);
        return;
      }
      if (name) {
        const users = await dao.findUsersByPartialName(name);
        res.json(users);
        return;
      }
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
      return res.status(400).json({ error: 'User ID is required' });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'Invalid User ID format' });
    }

    try {
      const user = await dao.findUserById(userId);
      if (!user) {
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
