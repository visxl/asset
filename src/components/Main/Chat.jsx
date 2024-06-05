// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import SockJS from 'sockjs-client';
// import { over } from '@stomp/stompjs';

// const Chat = () => {
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState('');
//   const [username, setUsername] = useState('');
//   const [stompClient, setStompClient] = useState(null);

//   useEffect(() => {
//     const socket = new SockJS('http://localhost:8080/ws');
//     const client = over(socket);
//     client.connect({}, () => {
//       client.subscribe('/topic/public', (msg) => {
//         if (msg.body) {
//           setMessages((prevMessages) => [...prevMessages, JSON.parse(msg.body)]);
//         }
//       });
//     });
//     setStompClient(client);
//   }, []);

//   const sendMessage = async () => {
//     const chatMessage = {
//       sender: username,
//       content: message,
//       type: 'CHAT'
//     };
//     await axios.post('http://localhost:8080/api/chat/sendMessage', chatMessage);
//     setMessage('');
//   };

//   const addUser = async () => {
//     const chatMessage = {
//       sender: username,
//       content: `${username} has joined the chat`,
//       type: 'JOIN'
//     };
//     await axios.post('http://localhost:8080/api/chat/addUser', chatMessage);
//   };

//   const handleSendMessage = (event) => {
//     event.preventDefault();
//     sendMessage();
//   };

//   const handleAddUser = (event) => {
//     event.preventDefault();
//     addUser();
//   };

//   return (
//     <div>
//       <form onSubmit={handleAddUser}>
//         <input
//           type="text"
//           placeholder="Enter your username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//         <button type="submit">Join Chat</button>
//       </form>
//       <form onSubmit={handleSendMessage}>
//         <input
//           type="text"
//           placeholder="Enter your message"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         />
//         <button type="submit">Send</button>
//       </form>
//       <div>
//         <h2>Chat Messages</h2>
//         <ul>
//           {messages.map((msg, index) => (
//             <li key={index}>{`${msg.sender}: ${msg.content}`}</li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Chat;
