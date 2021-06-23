var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended: true
}))



mongoose.connect('mongodb://localhost:27017/User_Details', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error', () => {
    console.log("error in connection");
});

db.once('open', () => {
    console.log("connected to mongo!!!");
})




app.post("/sign_up", (req, res) => {
    var name = req.body.user_name;
    var email = req.body.user_email;
    var password = req.body.user_password;

    var data = {
        "_id": email,
        "name": name,
        "password": password
    }


    var User_details = db.collection('users').findOne({ _id: email });
    if (User_details == null) {
        db.collection('users').insertOne(data, (err, collection) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Successfully created!!!");
                console.log(data);
            }
        });
        return res.redirect('login.html');
    } else {
        console.log("User Already Exists!!!");
        return res.redirect('Register.html');
    }

})



app.post("/card_details", (req, res) => {
    var card_name = req.body.card_name;
    var card_number = req.body.card_number;
    var expiry_date = req.body.expiry_date;
    var cvv = req.body.cvv;
    var email = req.body.email;

    var data = {
        "_id": email,
        "card_name": card_name,
        "card_number": card_number,
        "expiry_date": expiry_date,
        "cvv": cvv
    }


    db.collection('card_details').insertOne(data, (err, collection) => {
        if (err) {
            console.log(err);
        } else {
            console.log("successfully card added:");
            console.log(data);
            return res.redirect("Index.html");
        }
    })
})



app.post("/sign_in", async(req, res) => {
    var email = req.body.user_email;
    var password = req.body.user_password;

    var User_details = await db.collection('users').findOne({ _id: email });
    if (User_details == null) {
        console.log("Invalid User!!!");
        return res.redirect("Login.html");
    } else {
        if (User_details.password == password) {
            return res.redirect('Index.html');
        } else {
            console.log("Invalid Password!!!");
            return res.redirect("Login.html");
        }
    }
})




app.get("/", (req, res) => {
    res.set({
        "Allow-access-Allow-Orgin": '*'
    })
    return res.redirect("Index.html");
}).listen(3000);

console.log("listing on port 3000");