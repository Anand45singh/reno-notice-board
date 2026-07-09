import { useState, useEffect } from "react";

export default function Home() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [notices, setNotices] = useState([]);

  const loadNotices = async () => {
    const res = await fetch("/api/notices");
    const data = await res.json();
    setNotices(data);
  };

  useEffect(() => {
    loadNotices();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/notices", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        body,
        category: "GENERAL",
        priority: "NORMAL",
        publishDate: new Date().toISOString(),
        image: "",
      }),
    });

    if (res.ok) {
      alert("Notice Added Successfully");
      setTitle("");
      setBody("");
      loadNotices(); // Notice list refresh
    } else {
      alert("Something went wrong");
    }
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>Reno Notice Board</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Notice Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: "300px", padding: "10px" }}
        />

        <br /><br />

        <textarea
          placeholder="Notice Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows="5"
          cols="45"
        />

        <br /><br />

        <button type="submit">Add Notice</button>
      </form>

      <hr />

      <h2>All Notices</h2>

      {notices.map((notice) => (
        <div
          key={notice.id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <h3>{notice.title}</h3>
          <p>{notice.body}</p>
        </div>
      ))}
    </div>
  );
}