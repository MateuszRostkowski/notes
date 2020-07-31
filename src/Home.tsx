import React, { useState, useEffect } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import ReactMarkdown from "react-markdown/with-html";

const NOTE_KEY = "note_id"

const options = {};

function Home() {
  const [value, setValue] = useState("");

  useEffect(() => {
    const newNote = JSON.parse(localStorage.getItem(NOTE_KEY) ?? "") 
    setValue(newNote?.value ?? "");
  }, [])

  useEffect(() => {
    localStorage.setItem(NOTE_KEY, JSON.stringify({
      name: "Home",
      value
    }))
  }, [value])
  const [typingMode, setTypingMode] = useState<"preview" | "edit">("edit");
  return (
    <div>
      <div className="mode-buttons-container">
        <button
          className={`mode-button${
            typingMode === "preview" ? " mode-button-active" : ""
          }`}
          onClick={() => setTypingMode("preview")}
        >
          Preview
        </button>
        <button
          className={`mode-button${
            typingMode === "edit" ? " mode-button-active" : ""
          }`}
          onClick={() => setTypingMode("edit")}
        >
          Edit
        </button>
      </div>
      {typingMode === "edit" ? (
        <div className="code-mirror-container">
          <CodeMirror
            value={value}
            options={options}
            onBeforeChange={(editor, data, value) => {
              setValue(value);
            }}
          />
        </div>
      ) : (
        <div className="react-markdown-container">
          <ReactMarkdown source={value} escapeHtml={false} />
        </div>
      )}
    </div>
  );
}

export default Home;
