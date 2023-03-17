# simpleicetest
A simple node js application to fetch ICE cadidates from desired `iceServers` which are configurable.
Does not depend on any signalling to get remote offer/answer.
Uses a dummy SDP as offer from remote candidate and sets that as remote SDP.
Once the `setRemoteDescription` is successful performs a `createAnswer` and sets the the answer generated as local SDP.
Once the `setLocalDescription` is successful, the ICE candidates are received on the callback defined for `onicecandidate`

# build
`npm install`

# run
`node icetest.js`

# exit
Press CTRL+C


