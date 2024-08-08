import * as dao from "./dao.js";
import mongoose from 'mongoose';

const signup = async (req, res) => {
  try {
    console.log('Received signup request:', req.body);  // Log the incoming request data

    const existingUser = await dao.findUserByUsername(req.body.username);
    if (existingUser) {
      return res.status(400).json({ message: "Username already taken" });
    }

    const newUser = await dao.createUser(req.body);
    
    req.session.currentUser = newUser;

    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error during signup:', error);  // Log the error for debugging
    res.status(500).json({ error: 'Error signing up' });
  }
};

const signin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await dao.findUserByCredentials(username, password);

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    req.session.currentUser = user;
    res.json(user);
  } catch (error) {
    console.error('Error signing in:', error);
    res.status(500).json({ error: 'Error signing in' });
  }
};

const signout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to sign out' });
    }
    res.sendStatus(200);
  });
};

const profile = (req, res) => {
  const currentUser = req.session.currentUser;
  if (!currentUser) {
    return res.status(401).json({ error: 'User not signed in' });
  }
  res.json(currentUser);
};

const createUser = async (req, res) => {
  try {
    const user = await dao.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Error creating user' });
  }
};

const findAllUsers = async (req, res) => {
  try {
    const { role, name } = req.query;
    let users;

    if (role) {
      users = await dao.findUsersByRole(role);
    } else if (name) {
      users = await dao.findUsersByPartialName(name);
    } else {
      users = await dao.findAllUsers();
    }

    res.json(users);
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).json({ error: 'Failed to retrieve users' });
  }
};

const findUserById = async (req, res) => {
  const userId = req.params.userId;

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

const updateUser = async (req, res) => {
  const { userId } = req.params;
  const userUpdateData = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: 'Invalid User ID format' });
  }

  try {
    const result = await dao.updateUser(userId, userUpdateData);
    if (result.nModified === 0) {
      return res.status(404).json({ error: 'User not found or no changes made' });
    }
    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
};

export default function UserRoutes(app) {
  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.get("/api/users/profile", profile);
  app.post("/api/users", createUser);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.put("/api/users/:userId", updateUser);
}
