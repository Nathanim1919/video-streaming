// // Viewer.tsx
// import React, { useEffect, useState, useRef } from 'react';
// import io from 'socket.io-client';

// const peerConnection = new RTCPeerConnection();
// const socket = io('http://localhost:3000');
// let candidates = [];

// const Viewer = () => {
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const [isJoined, setIsJoined] = useState(false);

//   const joinOrLeaveStream = () => {
//     if (isJoined) {
//       socket.emit('leave-stream');
//       setIsJoined(false);
//     } else {
//       socket.emit('join-stream');
//       setIsJoined(true);
//     }
//   };

 

//   useEffect(() => {
//     socket.on('streamer-confirmed', async () => {
//       alert('Streamer confirmed');
//       if (peerConnection.connectionState !== 'closed') {
//         const offer = await peerConnection.createOffer();
//         await peerConnection.setLocalDescription(offer);
//         socket.emit('offer', offer);
//       } else {
//         console.error('Cannot create offer: RTCPeerConnection is closed');
//       }
//     });

//     socket.on('answer', async (answer) => {
//       console.log('Answer created', answer);
//       if (peerConnection.signalingState === 'have-local-offer') {
//         try {
//           await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
//           candidates.forEach(candidate => peerConnection.addIceCandidate(new RTCIceCandidate(candidate)));
//           candidates = [];
//         } catch (error) {
//           console.error('Error handling answer:', error);
//         }
//       }
//     });

//     peerConnection.onconnectionstatechange = () => {
//       console.log('Connection state change (Viewer):', peerConnection.connectionState);
//     };

//     peerConnection.ontrack = (event) => {
//       console.log('Track received (Viewer):', event.track);
//       if (videoRef.current) {
//         videoRef.current.srcObject = event.streams[0];
//       }
//     };

//     peerConnection.onicecandidate = (event) => {
//       if (event.candidate) {
//         console.log('ICE candidate (Viewer):', event.candidate);  // Add this line
//         socket.emit('candidate', event.candidate);
//       }
//     };

//     socket.on('offer', async (offer) => {
//       console.log('Offer received', offer);
//       if (peerConnection.signalingState === 'stable') {
//         console.log("offer is recieved at the view: ", peerConnection.signalingState)
//         try {
//           await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
//           const answer = await peerConnection.createAnswer();
//           await peerConnection.setLocalDescription(answer);
//           socket.emit('answer', answer);
//         } catch (error) {
//           console.error('Error handling offer:', error);
//         }
//       }
//     });

//     socket.on('candidate', (candidate) => {
//       if (peerConnection.remoteDescription) {
//         peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
//       } else {
//         candidates.push(candidate);
//       }
//     });
//   }, []);

//   return (
//       <div>
//           <h1>Welcome to the Viewer</h1>
//         <video ref={videoRef} autoPlay playsInline />
//         <button onClick={joinOrLeaveStream}>{isJoined ? 'Leave Stream' : 'Join Stream'}</button>
//       </div>
//   );
// };

// export default Viewer;
