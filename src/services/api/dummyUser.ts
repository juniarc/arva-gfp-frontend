import bcrypt from "bcryptjs";

export interface User {
  id: number;
  username: string;
  email: string;
  password: string; // Hashed password
  name?: string;
  address?: string;
}

// Generate hashed passwords
const hashPassword = (password: string): string => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

// In-memory users array
export const users: User[] = [
  {
    id: 1,
    username: "john_doe",
    email: "john@example.com",
    password: hashPassword("password123"),
  },
  {
    id: 2,
    username: "jane_doe",
    email: "jane@example.com",
    password: hashPassword("mypassword"),
  },
  {
    id: 3,
    username: "jame",
    email: "jame@example.com",
    password: hashPassword("password123"),
  },
  {
    id: 4,
    username: "jack",
    email: "jack@example.com",
    password: hashPassword("mypassword"),
  },
];

// Helper function to get the next available user ID
const getNextUserId = (): number => {
  if (users.length === 0) return 1; // If no users exist, start from 1
  return Math.max(...users.map((user) => user.id)) + 1; // Find max ID and increment
};

// Add new user to the users array
export const addUser = (username: string, email: string, password: string): string | null => {
  // Check if username already exists
  if (users.some((user) => user.username === username)) {
    return "Username already exists";
  }

  // Check if email already exists
  if (users.some((user) => user.email === email)) {
    return "Email already exists";
  }

  // Create new user
  const newUser: User = {
    id: getNextUserId(), // Ensure unique user ID
    username,
    email,
    password: hashPassword(password),
  };
  
  users.push(newUser); // Add new user to the array
  return null; // Return null if successful
};
