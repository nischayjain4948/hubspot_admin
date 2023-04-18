const Token = require("../models/tokens");
const MONGO_URI = "mongodb+srv://Nischay:Nischay@crudd.qoju4.mongodb.net/hubspot?retryWrites=true&w=majority"
const CLIENT_ID = "b1427cb1-0fd8-416f-8692-29b4aa31bb58"
const CLIENT_SECRET = "f0dbcc2e-4b00-43aa-9191-072dd51687cc"
const REDIRECT_URI = "http://localhost:3000/dashboard";




// get access token
const getAccessToken = async () => {
    const tokenResponse = await token.findOne({ email: "nischay.jain@dotsquares.com" })
    const aToken = tokenResponse.access_token;
    return aToken;
}

exports.AdminLogin = async (req, res, next) => {
    const { email, password } = req.body;
    const adminResponse = await Token.findOne({ email, password });
    if (!adminResponse) {
        return res.status(404).json({ message: "You are not authorized person." });
    }
    return res.status(200).json({ message: "Authenticate successfully." })

}

exports.ForgotPassword = async (req, res) => {
    const { email } = req.body;
    const adminResponse = await Token.findOne({ email });
    if (!adminResponse) {
        return res.status(404).json({ message: "You are not authorized person." });
    }
    return res.status(200).json({ message: "Authenticate successfully." })
}


exports.OAuth = async (req, res) => {
    try {
        const payload = {
            grant_type: "authorization_code",
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            redirect_uri: REDIRECT_URI,
            code: req.query.code,
        };

        console.log("call is here now");
        return

        const params = new url.URLSearchParams(payload);

        // we are using the rest api method here to exchange the tokens
        const apiResponse = await axios.post(
            "https://api.hubapi.com/oauth/v1/token",
            params.toString()
        );
        const tokenInfo = JSON.stringify(apiResponse.data);
        await Token.findOneAndUpdate({ tokenName: "nischayToken" }, {
            $set: {
                tokenName: "nischayToken",
                access_token: apiResponse.data.access_token,
                access_token_expire_in: apiResponse.data.expires_in,
                refresh_token: apiResponse.data.refresh_token,
                code: req.query.code
            },
        }, { upsert: true, new: true });
        req.params.code = payload.code;
        // return res.status(200).render(`dashboard`);
        console.log("OAuth called --->>>> ")
    }
    catch (err) {
        console.log("Something went wrong!");
    }
}

