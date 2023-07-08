"use client";

export default function Error({ error, reset }) {
  return;
  <div>
    <h2>Error...</h2>
    <button
      onClick={() => {
        reset();
      }}
    >
      Reload
    </button>
  </div>;
}
