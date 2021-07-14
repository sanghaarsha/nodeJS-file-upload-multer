const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();

const fileUploadStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./images");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "==" + file.originalname);
    },
});

const upload = multer({ storage: fileUploadStorageEngine });

app.get("/", (req, res) => {
    res.send(`
    <a href="/single">single upload</a>
    <br>
    <br>
    <a href="/multiple">multiple upload</a>

    `);
});

app.get("/single", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/multiple", (req, res) => {
    res.sendFile(path.join(__dirname, "multiple.html"));
});

app.post("/single", upload.single("image"), (req, res) => {
    console.log(req.file);
    res.send("Single file upload done!");
});

app.post("/multiple", upload.array("images", 2), (req, res) => {
    console.log(req.files);
    res.send("multiple file upload done!");
});

app.use((req, res) => {
    res.send("404 : Page not found!");
});

app.listen(3000, () => {
    console.log("App live at http://localhost:3000");
});
