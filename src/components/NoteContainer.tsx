import React, { FC, useState, useEffect } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import ReactMarkdown from "react-markdown/with-html";

interface Props {
  noteId: string
}

const options = {
  mode: "markdown"
};

const NoteContainer: FC<Props>  = ({ noteId }) => {
  const [typingMode, setTypingMode] = useState<"preview" | "edit">("edit");
  const [value, setValue] = useState("");
  const [noteName, setNoteName] = useState("")

  useEffect(() => {
    const rawNote = localStorage.getItem(noteId) 
    if(rawNote) {
      setNoteName(JSON.parse(rawNote).name)
      setValue(JSON.parse(rawNote).value);
    }
  }, [noteId])

  useEffect(() => {
    if(noteId && value) {
      localStorage.setItem(noteId, JSON.stringify({
        name: noteName,
        value
      }))
    }
  }, [value, noteId, noteName])
  
  return (
    <div className="note-container">
      <div className="mode-buttons-container">
        <button
          className={`mode-button${
            typingMode === "edit" ? " mode-button-active" : ""
          }`}
          onClick={() => setTypingMode("edit")}
        >
          Edit
        </button>
        <button
          className={`mode-button${
            typingMode === "preview" ? " mode-button-active" : ""
          }`}
          onClick={() => setTypingMode("preview")}
        >
          Preview
        </button>
      </div>
      <h1 className="note-title">{noteName}</h1>
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

export default NoteContainer;
