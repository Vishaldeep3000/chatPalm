import { useState } from 'react';
import { SiChatbot } from "react-icons/si";
import { MdClose } from "react-icons/md";
import { IoSend } from "react-icons/io5";
import React, { useEffect } from 'react';

const App = () => {
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);
  const [isButtonPressed, setIsButtonPressed] = useState(false);

  useEffect(() => {
    if (window.VANTA) {
      window.VANTA.FOG({
        el: "body", // Target the body element
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00
      });
    }
  }, []);

  console.log('messages', messages);

  const getResponse = async () => {
    setIsButtonPressed(true); // Set button pressed state to true
    setText(''); // Clear the text input before fetching response

    const response = await fetch(`http://localhost:8000/prompt/${text}`);
    const data = await response.json();
    console.log('data', data);

    setMessages([...messages, {
      author: data.messages[0].content,
      bot: data.candidates[0].content,
    }]);

    setIsButtonPressed(false); // Set button pressed state to false after request
  };

  console.log(text);
  function open(){
    var element = document.getElementsByClassName('chat-bot')[0];
    element.style.display = 'block';
    var icon = document.getElementsByClassName('btn')[0];
    icon.style.display = 'none';
  }

  function close(){
    var element = document.getElementsByClassName('chat-bot')[0];
    element.style.display = 'none';
    var icon = document.getElementsByClassName('btn')[0];
    icon.style.display = 'block';
  }

  return (
    <div className='main' id="body">
      <div className='btn'>
        <button className='btn-close' onClick={()=>open()}><SiChatbot /></button>
      </div>
    <div className="chat-bot">
      <div className="chat-header">
        <div className="info-container">
          <div className='heading'>
          <h3>Chat with</h3>
          <h2>PaLM 2 Bot</h2>
          </div>
          <div className='close_icon'>
            <button className='btn-close' onClick={() => close()}><MdClose /></button>
          </div>
        </div>
       
      </div>
      <div className="feed">
        {messages?.map((message, _index) => (
          <div key={_index}>
            <div className="question bubble">{message.author}</div>
            <div className="response bubble">{message.bot}</div>
          </div>
        ))}
      </div>
      <textarea value={text} placeholder='Enter Prompt' onChange={e => setText(e.target.value)} />
<button
  onClick={getResponse}
  style={{ backgroundColor: text.trim().length === 0  ? "grey" : "green" }}
  disabled={text.trim().length === 0} // Disable button if text is empty or contains only whitespace
><IoSend/>
</button>
    </div>
    </div>
  );
};

export default App;
