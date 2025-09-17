const pool = require("../db/connectDB");

const createMessageTable = async () => {
  try {
    const query = `
        CREATE TABLE IF NOT EXISTS messages(
        message_id serial primary key,
        message_content text not null,
        conversation_id int not null references conversations(conversation_id) on delete cascade,
        sender_id int not null references users(user_id) on delete cascade,
        is_read boolean default false,
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

//creating a message
async function createMessage({
  message_content,
  conversation_id,
  sender_id,
  isRead = false,
}) {
  const query = `
    INSERT INTO messages (message_content, conversation_id, sender_id, is_read, created_at, created_by, updated_by )
    VALUES ($1, $2, $3, $4, NOW(), $3,$3)
    RETURNING *`;

  const result = await pool.query(query, [
    message_content,
    conversation_id,
    sender_id,
    isRead,
  ]);
  return result.rows[0];
}

//read messages

async function getMessagesByConversationId(conversation_id) {
  const query = `
    SELECT m.*, u.fullname, u.email
    FROM messages m
    INNER JOIN users u ON m.sender_id = u.user_id
    WHERE m.conversation_id = $1
    ORDER BY m.created_at ASC`;

  const result = await pool.query(query, [conversation_id]);
  return result.rows;
}

async function updateMessage(message_id) {
  const query = `
    UPDATE messages 
    SET 
    is_read = $1,
    updated_at = NOW()
    WHERE message_id = $2
    RETURNING *`;
  const result = await pool.query(query, [true, message_id]);
  return result.rows[0];
}

//delete message
async function deletMessage(message_id) {
  const query = `
    DELETE FROM messages 
    WHERE message_id = $1
    RETURNING *`;
  const result = await pool.query(query, [message_id]);
  return result.rows[0];
}

module.exports = {
  createMessageTable,
  createMessage,
  getMessagesByConversationId,
  updateMessage,
  deletMessage,
};
