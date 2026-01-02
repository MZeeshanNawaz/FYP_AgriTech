import React, { useState } from "react";
import { askGemini } from "../services/gemini";
import { isAgriQuestion } from "../utils/agriGuard";
import "./AgriChatbot.css";

interface Message {
  role: "user" | "bot";
  text: string;
}

const AgriChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  //  Send message
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg: Message = { role: "user", text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");

    //  Reject non-agriculture questions
    if (!isAgriQuestion(input)) {
      setMessages(prev => [
        ...prev,
        {
          role: "bot",
          text:
            "یہ چیٹ بوٹ صرف زراعت، فصلوں، بیماریوں اور ان کے علاج سے متعلق سوالات کے جواب دیتا ہے۔ براہِ کرم اسی موضوع پر سوال کریں۔",
        },
      ]);
      return;
    }

    setLoading(true);

    try {
      const prompt = `
آپ AgriTech کے ماہر زرعی AI اسسٹنٹ ہیں۔
ہمیشہ خالص اور مکمل اردو زبان میں جواب دیں۔
انگریزی الفاظ، رومن اردو یا مخلوط زبان ہرگز استعمال نہ کریں۔
صرف زراعت، فصلوں، بیماریوں، کھاد، اسپرے اور ان کے علاج پر بات کریں۔
اگر سوال زراعت سے متعلق نہ ہو تو مؤدبانہ انداز میں جواب دینے سے انکار کریں۔
صارف کا سوال:
${input}
      `;
      const reply = await askGemini(prompt);

      setMessages(prev => [
        ...prev,
        { role: "bot", text: reply },
      ]);
    } catch {
      setMessages(prev => [
        ...prev,
        { role: "bot", text: "سرور سے جواب حاصل نہیں ہو سکا۔" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  //  New Chat
  const newChat = () => {
    setMessages([]);
    setSearch("");
  };

  //  Delete Chat
  const deleteChat = () => {
    if (window.confirm("کیا آپ واقعی یہ چیٹ حذف کرنا چاہتے ہیں؟")) {
      setMessages([]);
      setSearch("");
    }
  };

  //  Search filter
  const filteredMessages = messages.filter(m =>
    m.text.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="chat-wrapper">
      {/* Sidebar */}
      <aside className="sidebar">
        <button className="new-chat" onClick={newChat}>
          New Chat
        </button>

        <button className="delete" onClick={deleteChat}>
          Delete this chat
        </button>

        <div className="user-box">
          <strong>AgriTech Chatbot</strong>
        </div>
      </aside>

      {/* Chat Area */}
      <main className="chat-area">
        <div className="messages">
          {filteredMessages.map((m, i) => (
            <div key={i} className={`msg ${m.role}`}>
              {m.text}
            </div>
          ))}
          {loading && <div className="msg bot">جواب تیار کیا جا رہا ہے…</div>}
        </div>

        <div className="input-box">
          <input
            placeholder="اپنا سوال یہاں لکھیں (اردو یا انگریزی)"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && sendMessage()}
          />
          <button onClick={sendMessage}>➤</button>
        </div>
      </main>
    </div>
  );
};

export default AgriChatbot;
