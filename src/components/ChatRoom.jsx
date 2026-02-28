import { useState, useEffect, useRef } from "react";

const STORAGE_KEY = "portfolio_chatroom_messages";
const NAME_KEY = "portfolio_chatroom_name";

function generateId() {
  return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
}

function getAvatar(name) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
  const colors = [
    "#6366f1", "#8b5cf6", "#ec4899", "#f59e0b",
    "#10b981", "#3b82f6", "#ef4444", "#14b8a6",
  ];
  const color = colors[name.charCodeAt(0) % colors.length];
  return { initials, color };
}

export default function ChatRoom() {
  const [name, setName] = useState(() => localStorage.getItem(NAME_KEY) || "");
  const [inputName, setInputName] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  });
  const [myId] = useState(() => generateId());
  const bottomRef = useRef(null);

  // Sync messages dari localStorage (simulasi real-time antar tab)
  useEffect(() => {
    const sync = () => {
      try {
        const stored = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        setMessages(stored);
      } catch { /* empty */ }
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  // Auto scroll ke bawah
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSetName = (e) => {
    e.preventDefault();
    const trimmed = inputName.trim();
    if (!trimmed) return;
    localStorage.setItem(NAME_KEY, trimmed);
    setName(trimmed);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMsg = {
      id: generateId(),
      uid: myId,
      displayName: name,
      text: message.trim(),
      createdAt: Date.now(),
    };

    const prev = (() => {
      try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
      catch { return []; }
    })();

    const updated = [...prev, newMsg].slice(-100); // simpan max 100 pesan
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setMessages(updated);
    setMessage("");
  };

  const handleLogout = () => {
    localStorage.removeItem(NAME_KEY);
    setName("");
    setInputName("");
  };

  // Belum punya nama
  if (!name) {
    return (
      <div className="bg-zinc-900 border border-gray-700 p-6 rounded-xl shadow-lg max-w-xl mx-auto mt-5 flex flex-col items-center gap-6">
        <h2 className="text-2xl font-bold text-center text-white">💬 Chat Room</h2>
        <p className="text-sm text-gray-400 text-center">
          Masukkan nama tampilan kamu untuk mulai chat
        </p>
        <form onSubmit={handleSetName} className="flex gap-2 w-full max-w-sm">
          <input
            type="text"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            placeholder="Nama kamu..."
            maxLength={30}
            className="flex-1 p-2 rounded-lg bg-zinc-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
          <button
            type="submit"
            className="bg-violet-600 px-4 py-2 rounded-lg text-white hover:bg-violet-700 transition"
          >
            Masuk
          </button>
        </form>
      </div>
    );
  }

  const avatar = getAvatar(name);

  return (
    <div className="bg-zinc-900 border border-gray-700 p-6 rounded-xl shadow-lg max-w-xl mx-auto mt-5">
      <h2 className="text-2xl font-bold text-center mb-4 text-white">💬 Chat Room</h2>

      {/* Header user */}
      <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-3">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
            style={{ backgroundColor: avatar.color }}
          >
            {avatar.initials}
          </div>
          <span className="text-white font-semibold">{name}</span>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-600 px-4 py-1 rounded-full text-white hover:bg-red-700 transition text-sm"
        >
          Ganti Nama
        </button>
      </div>

      {/* Area pesan */}
      <div className="h-72 overflow-y-auto border border-gray-700 p-3 rounded-lg bg-zinc-800 mb-4 space-y-3">
        {messages.length === 0 && (
          <p className="text-center text-gray-500 text-sm mt-20">Belum ada pesan. Mulai chat! 🚀</p>
        )}
        {messages.map((msg) => {
          const isMe = msg.uid === myId;
          const msgAvatar = getAvatar(msg.displayName);
          return (
            <div key={msg.id} className={`flex gap-2 ${isMe ? "justify-end" : "justify-start"}`}>
              {!isMe && (
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0"
                  style={{ backgroundColor: msgAvatar.color }}
                >
                  {msgAvatar.initials}
                </div>
              )}
              <div
                className={`p-3 rounded-lg max-w-[75%] ${isMe ? "bg-violet-600 text-white" : "bg-gray-700 text-white"
                  }`}
              >
                <div className="text-xs opacity-70 mb-1">{msg.displayName}</div>
                <div>{msg.text}</div>
              </div>
              {isMe && (
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0"
                  style={{ backgroundColor: avatar.color }}
                >
                  {avatar.initials}
                </div>
              )}
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Form kirim pesan */}
      <form onSubmit={sendMessage} className="flex gap-2 flex-wrap sm:flex-nowrap w-full">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ketik pesan..."
          className="flex-1 min-w-0 p-2 rounded-lg bg-zinc-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-violet-500"
        />
        <button
          type="submit"
          className="bg-violet-600 px-4 py-2 rounded-lg text-white hover:bg-violet-700 transition w-full sm:w-auto"
        >
          Send
        </button>
      </form>
      <p className="text-xs text-gray-500 mt-2 text-center">
        💡 Pesan tersimpan di browser (localStorage)
      </p>
    </div>
  );
}
