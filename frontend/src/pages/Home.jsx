import React from 'react';
export default function Home() {
  return (
    <div className="hero">
      <div>
        <h1>EventEase Pro — Book events easily</h1>
        <p className="note">
          Secure event booking with atomic seat control & JWT authentication.
        </p>
      </div>
      <div>
        <a className="btn" href="/events">
          Browse Events
        </a>
      </div>
    </div>
  );
}
