import express from "express";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.post("/submit", (req, res) =>{
    res.render("home.ejs");
})

app.listen(port, () => {
    console.log("Server is running on port 3000");
});