import React, { useEffect, useState } from 'react';
import { VideoPlus } from 'tabler-icons-react';

export default function VideoChat() {
  const startVideoChat = () => {
    window.open('https://meet.google.com/new');
  };

  return (
    <>
      {/* <div>Calendar</div> */}
      <VideoPlus onClick={startVideoChat}></VideoPlus>
      {/* <button>Start video chat</button> */}
    </>
  );
}
