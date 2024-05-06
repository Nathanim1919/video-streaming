// // Streamer.tsx
// import React, { useEffect, useRef } from 'react';
// import io from 'socket.io-client';


// const peerConnection = new RTCPeerConnection();
// const socket = io('http://localhost:3000');

// const Streamer = () => {
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const [streamStarted, setStreamStarted] = React.useState(false);

//   const startStream = () => {
//     navigator.mediaDevices.getUserMedia({ video: true })
//       .then((stream) => {
//         if (videoRef.current) {
//           videoRef.current.srcObject = stream;
//         }
//         stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));
//       })
//       .then(() => {
//         return peerConnection.createOffer();
//       })
//       .then((offer) => {
//         return peerConnection.setLocalDescription(offer);
//       })
//       .then(() => {
//         console.log('Offer created', peerConnection.localDescription);
//         socket.emit('offer', peerConnection.localDescription);
//         socket.emit('start-stream');
//       })
//       .catch(error => {
//         console.error('Error starting stream:', error);
//       });
//     setStreamStarted(true);
//   };

//   const stopStream = () => {
//     if (videoRef.current && videoRef.current.srcObject) {
//       const mediaStream = videoRef.current.srcObject as MediaStream;
//       mediaStream.getTracks().forEach(track => track.stop());
//     }
//     socket.emit('stop-stream');
//     setStreamStarted(false);
//   };

//   useEffect(() => {
//     peerConnection.onconnectionstatechange = () => {
//       console.log('Connection state change (Streamer):', peerConnection.connectionState);
//     };

//     peerConnection.ontrack = (event) => {
//       console.log('Track received (Streamer):', event.track);
//     };

//     socket.on('viewer-wants-to-join', () => {
//       alert('Welcome');
//       if (window.confirm('A viewer wants to join the stream. Do you allow?')) {
//         console.log('Emitting streamer-confirmed event');
//         socket.emit('streamer-confirmed');
//       }
//     });

//     socket.on('answer', async (answer) => {
//       console.log('Answer received', answer);
//       if (peerConnection.signalingState === 'have-local-offer') {
//         try {
//           await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
//         } catch (error) {
//           console.error('Error setting remote description:', error);
//         }
//       }
//     });

//     socket.on('candidate', (candidate) => {
//       peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
//     });

//     // When the peer connection gathers ICE candidates, send them to the server
//     peerConnection.onicecandidate = (event) => {
//       if (event.candidate) {
//         console.log('ICE candidate (Streamer):', event.candidate);
//         socket.emit('candidate', event.candidate);
//       }
//     };
//   }, []);

//   return (
//     <div style={{
//       backgroundColor:'red',
//       width:"100vw",
//       height:"100vh"
//     }}>
//       <h1>Welcome to the Streamer</h1>
//       <video style={{
//          width:"100%",
//          height:"100%"
//       }} ref={videoRef} autoPlay playsInline />
//       {streamStarted ? (
//         <button onClick={stopStream}>Stop Stream</button>
//       ) : (
//         <button onClick={startStream}>Start Stream</button>
//       )}
//     </div>
//   );
// };

// export default Streamer;
