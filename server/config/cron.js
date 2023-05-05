const cron = require('node-cron');
var request = require("request");
const Token = require("../models/tokens");
const CLIENT_ID = "b1427cb1-0fd8-416f-8692-29b4aa31bb58";
const CLIENT_SECRET = "f0dbcc2e-4b00-43aa-9191-072dd51687cc";
const REDIRECT_URI = `http://localhost:3000/oauth-callback`;


exports.refreshTokenCron = async () => {
    try {
        cron.schedule(" */5 * * * * ", async () => {
            let tokenInfo = await Token.findOne();

            if (tokenInfo.refresh_token && tokenInfo.refresh_token != null) {
                const formData = {
                    grant_type: "refresh_token",
                    client_id: CLIENT_ID,
                    client_secret: CLIENT_SECRET,
                    redirect_uri: REDIRECT_URI,
                    refresh_token: tokenInfo.refresh_token,
                };

                request.post(
                    "https://api.hubapi.com/oauth/v1/token",
                    { form: formData },
                    async (err, data) => {
                        let refreshedTokenData = JSON.parse(data.body);
                        let refreshedTokenInfo = await Token.findOneAndUpdate(
                            {
                                tokenName: "nischayToken",
                            },
                            {
                                tokenName: "nischayToken",
                                access_token: refreshedTokenData.access_token,
                                access_token_expire_in: refreshedTokenData.expires_in,
                                refresh_token: refreshedTokenData.refresh_token


                            }
                        );
                        console.log('refreshedTokenData :>> ', refreshedTokenData);
                        console.log(`access token refreshed in every 5 minutes`);
                    }
                )
            }
        });
    } catch (error) {
        console.log('error :>> ', error);
    }
}
