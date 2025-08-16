import { Room } from "../models/room_models";

async function addRoom(req, res) {
    const { roomNo, roomName } = req.body;
    const room = new Room({
        roomNo: roomNo,
        roomName: roomName,
    })
    await room.save();

    res.status(200).json({
        message: "Room Added Sucessfully",
        room: room
    })

}

export default {
    addRoom
}