const mongoose = require("mongoose");

const tokensSchema = new mongoose.Schema(
    {
        tokenName: {
            type: String,
            required: true,
        },
        access_token: {
            type: String,
            required: true,
        },
        access_token_expire_in: {
            type: Number,
        },
        refresh_token: {
            type: String,
            required: true,
        },

        adminFullName: {
            type: String,
            default: "nischayjain"
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true

        },
        randomstring: {
            type: String,
            default: ''
        },
        code: {
            type: String,
            default: ""
        }
    },
    { timestamps: true, versionKey: false }
);
module.exports = mongoose.model("tokens", tokensSchema);
