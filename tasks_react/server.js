let express    = require("express");
let app        = express();
let bodyParser = require("body-parser");
let session    = require("express-session");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({secret:"ahsldkajshldkajshd"}));

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

require("./server/config/mongoose.js");
require("./server/config/routes.js")(app);

app.listen(8000,()=>{
	console.log("Server Running");
});