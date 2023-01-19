const express = require('express');
const jwt = require("jsonwebtoken")
const app = express();
const passport = require("passport");
const multer = require('multer');

const db = require("./modules/db.js");
db.connect();

require("./modules/passport.js")(passport);

app.use(express.json());

var storage = multer.diskStorage({   
   destination: function(req, file, cb) { 
      cb(null, './files');    
   }, 
   filename: function (req, file, cb) { 
      cb(null , file.originalname);   
   }
});

var upload = multer({ storage: storage }).single("file");

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    jwt.sign(
      { user: req.user },
      "secretKey",
      { expiresIn: "1h" },
      (err, token) => {
        if (err) {
          return res.json({
            token: null,
          });
        }
        res.json({
          token,
        });
      }
    );
  }
);

app.post("/api/files/upload", passport.authenticate("jwt", { session: false }), upload, (req, res) => {
  
})

app.get("/profile", (req, res) => {
  console.log(req);
  res.send("Welcome");
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
