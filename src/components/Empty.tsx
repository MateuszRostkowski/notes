import React, { useState, useEffect } from "react";

const Empty = () => {
  const [shown, setShown] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setShown(true)
    }, 1000)
  }, [])

  return (
    <div className="empty-container">
        <h1>Nie masz jeszcze żadnej notatki</h1>
        <p className={`add-new-info${shown ? " add-new-info--shown" : ""}`}>← Wciśnij tutaj aby dodać nową notatkę</p>
    </div>
  );
};

export default Empty;
