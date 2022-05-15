import React, { useEffect, useState } from "react";

export default function VideoChat() {

  const startVideoChat = () => {
    window.open("https://meet.google.com/new");
  };

  return (
    <>
      <div>Calendar</div>
      <button onClick={startVideoChat}>Start video chat</button>
    </>
  );

};