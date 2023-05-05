const router = require("express").Router();
const AdminController = require("../controllers/adminController");
const hubspot = require("@hubspot/api-client");
Port = 8080
const CLIENT_ID = "b1427cb1-0fd8-416f-8692-29b4aa31bb58"
const REDIRECT_URI = "http://localhost:3000/dashboard"



router.post("/login", AdminController.AdminLogin);
router.post("/forgot-password", AdminController.ForgotPassword);


router.get("/auth", (req, res) => {
    const hubspotClient = new hubspot.Client();
    const uri = hubspotClient.oauth.getAuthorizationUrl(
        CLIENT_ID,
        REDIRECT_URI,
        "crm.objects.contacts.write"
    );
    console.log("uri", uri);
    res.status(200).json({ redirected_uri: uri });
})

router.post("/Oauth_callback", AdminController.OAuth);


router.get("/getAllCards/:code", AdminController.GetAllCards);


module.exports = router;