import mongoose from "mongoose"

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            minlength: 6
        },
        phnNumber: {
            type: Number,
            require: true
        },
        room_number: [
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