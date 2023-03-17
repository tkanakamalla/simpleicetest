'use strict';

const DefaultRTCPeerConnection = require('wrtc').RTCPeerConnection;

var configuration = {
    "iceServers": [ {
            "urls": "stun:stun.l.google.com:19302"
        }, {
            "urls": "turn:numb.viagenie.ca",
            "credential": 'muazkh',
            "username": 'webrtc@live.com'
        }]
};


var offer = {
  type: 'offer',
  sdp: `\
v=0
o=- 2327044227424838191 2 IN IP4 127.0.0.1
s=-
t=0 0
a=group:BUNDLE 0
a=msid-semantic: WMS
m=application 9 DTLS/SCTP 5000
c=IN IP4 0.0.0.0
a=ice-ufrag:ZVjA
a=ice-pwd:ySFnYuYDmL6hstu0f3kgG71w
a=ice-options:trickle
a=fingerprint:sha-256 BD:08:3B:BA:84:0F:E7:0B:CD:61:FD:EA:E7:F1:31:62:14:52:43:DB:CB:5D:1C:60:53:0E:E1:7C:87:41:56:FD
a=setup:actpass
a=mid:0
a=sctpmap:5000 webrtc-datachannel 1024
`.split('\n').join('\r\n')
};

var peer_con = new DefaultRTCPeerConnection(configuration, {});

console.log("RTCPeerConnection object created");


peer_con.onicecandidate = function (event) {
console.log("Ice candidate found : ");
if (event.candidate) {
        console.log(event.candidate.candidate);
    }
};

peer_con.setRemoteDescription(offer).then(()=>{
	console.log("set remote sdp");
	console.log("create answer");
	peer_con.createAnswer().then(
	(local_sdp) => {
		console.log (local_sdp);
		peer_con.setLocalDescription(local_sdp)
                        .then(
                                () => console.log("set local sdp")
		        ).
                        catch((e)=> {
			        console.log(e);
			        console.log("failed to set local sdp")
		        });
	}).catch(() => {
		console.log ("error creating local SDP");
	});
});

