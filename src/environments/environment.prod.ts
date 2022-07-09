export const environment = {
  production: true,
  apiUrl: 'https://vcampus-api.herokuapp.com/',
  imageUrl: 'https://vcampus-api.herokuapp.com/uploads',
  presetPassword :"12345",
  socketURL : 'https://vcampus-api.herokuapp.com',
  wsEndpoint: 'ws://vcampus-api.herokuapp.com:8081/',
  RTCPeerConfiguration: {
    iceServers: [
      {
        urls: 'stun:stun1.l.google.com:19302'
      }
    ]
  }
};
