const pool = require("../db/connectDB");

const createConversationTable = async () => {
  try {
    const query = `
        CREATE TABLE IF NOT EXISTS conversations(
        conversation_id serial primary key,
        conversation_title varchar(20),
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

const createConversation = async (id) => {
  const query = `insert into conversations(created_by , updated_by) values ($1, $1) returning conversation_id`;
  const result = await pool.query(query, [id]);
  return result.rows[0].conversation_id;
};

const getConversationByUserId = async (userId) => {
  const query = `select c. * from conversation c left join conversation_members cm on c.conversation_id = cm.conversation_id where cm.user_id = $1 order by c.updated_at desc `;
  const result = await pool.query(query, [userId]);

  return result.rows;
};

const getConversationById = async (convodId) => {
  const query = `Select * from conversations where conversation_id = $1`;
  const result = await pool.query(query, [convodId]);

  return result.rows;
};

module.exports = {
  createConversationTable,
  createConversation,
  getConversationByUserId,
  getConversationById,
};
