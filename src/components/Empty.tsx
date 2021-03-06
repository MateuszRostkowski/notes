import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

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
      <p
        className={classNames('add-new-info', {
          'add-new-info--shown': shown,
        })}>
        ← Click here to add one
      </p>
    </div>
  );
};

export default Empty;
