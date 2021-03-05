import React, { useState, useEffect } from 'react';

const Empty = () => {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShown(true);
    }, 1000);
    return clearTimeout(timeoutId);
  }, []);

  return (
    <div className="empty-container">
      <h1>You don't have any note</h1>
      <p className={`add-new-info${shown ? ' add-new-info--shown' : ''}`}>
        ← Click here to add one
      </p>
    </div>
  );
};

export default Empty;
