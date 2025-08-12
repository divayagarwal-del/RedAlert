import mongoose from "mongoose"

const RoomSchema = new mongoose.Schema({
    prevCompTags: [{ type: String }],
    UserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['occupied', 'vacant'], default: 'vacant' }
})

export const Room = mongoose.model("Room", RoomSchema)


  