function fillRoomName(roomName) {
  roomName = roomName + "";
  if (roomName.length < 8) {
    return new Array(8 - roomName.length).fill("0").join("") + roomName;
  }
  return roomName;
}

export default fillRoomName;
