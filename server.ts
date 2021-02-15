import * as http from 'http';
import * as path from 'path';
import * as express from 'express';

let app = express();

var appDir = path.join(__dirname, "asset");
app.use(express.static("asset"));


app.get("*", (req, res) => {
    res.sendFile(path.join(appDir, "index.html"));
});

const port = 8081;

http.createServer(app).listen(port, () => {
    console.log("Express server listening on port " + port);
    console.log("http://localhost:" + port);
});