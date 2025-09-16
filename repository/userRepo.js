const pool = require("../db/connectDB");

const createUserTable = async () => {
  try {
    const query = `
        CREATE TABLE IF NOT EXISTS users(
        user_id serial primary key,
        fullname varchar(20) not null,
        email varchar(50) unique not null,
        password text not null,
        created_at timestamp default current_timestamp,
        created_by int,
        updated_at timestamp default current_timestamp,
        updated_by int
        )`;
    await pool.query(query);
  } catch (error) {
    console.log(error);
  }
};

const createUser = async (fullname, email, password) => {
  const query = `INSERT INTO users(fullname, email, password) VALUES ( $1, $2,$3) returning user_id`;
  const result = await pool.query(query, [fullname, email, password]);
  const newUserId = result.rows[0].user_id;
  const updateQuery = `
      UPDATE users
      SET created_by = $1, updated_by = $1
      WHERE user_id = $1
    `;
  await pool.query(updateQuery, [newUserId]);
  return { user_id: newUserId };
};

const getUserByEmail = async (email) => {
  const query = `SELECT * FROM users WHERE email=$1`;
  const result = await pool.query(query, [email]);
  return result.rows[0];
};

const getAllUser = async (email) => {
  const query = `SELECT * FROM users`;
  const result = await pool.query(query);
  return result.rows;
};

module.exports = { createUserTable, createUser, getUserByEmail, getAllUser };
