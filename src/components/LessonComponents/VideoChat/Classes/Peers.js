import SimplePeer from "simple-peer";

export default class {
  costructor() {
    this.peers = [];
  }
  create(peerData) {
    this.peers.push(new Peer(peerData));
  }
}

class Peer {
  constructor(peerData) {
    this.peer.peer = new SimplePeer(peerData);
    // this.peer.peer.on("signal")
  }
}
