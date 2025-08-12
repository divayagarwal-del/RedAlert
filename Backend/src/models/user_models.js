import mongoose from "mongoose"

const UserSchema = new mongoose.Schema(
    {   
        name: {
            type: String,
            required: true,
            trim: true
        },
        number: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        room_number:[
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Room'
                }
        ],
        complaints: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Complaint'
                }
        ],
    }
)

export const User = mongoose.model("User", UserSchema)