const express = require("express")
const bodyParse = require("body-parser")
const mongoose = require("mongoose")
const validator = require("validator")
mongoose.connect("mongodb://localhost:27017/Deakin", { useNewUrlParser: true })
const app = express()

app.use(bodyParse.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

app.post('/', (req, res) => {
    const lname = req.body.lastName
    const fname = req.body.firstName
    const city = req.body.city
    const email = req.body.email
    const password = req.body.password
    const cpassword = req.body.ConfirmPassword
    const address = req.body.address
    const address1 = req.body.address2
    const region = req.body.region
    const zip = req.body.zip
    const phone = req.body.phone

    const userSchema = new mongoose.Schema({
        city: {
            type: String,
            trim: true,
            required: true
        },
        fname: {
            type: String,
            maxlength: 50,
            trim: true,
            required: true
        },
        lname: {
            type: String,
            maxlength: 50,
            trim: true,
            required: true
        },
        email: {
            type: String,
            lowercase: true,
            required: true,
            validate(value) {
                if (!validator.isEmail(value)) { throw new Error('The email is not valid!') }
            }
        },
        password: {
            type: String,
            minlength: 8,
            required: true
        },
        cpassword: {
            type: String,
            minlength: 8,
            required: true,
            validator(value) {
                if (!(value == this.password)) {
                    { throw new Error('Two passwords are not the same') }
                }
            }
        },
        address: {
            type: String,
            required: true,
        },
        address1: {
            type: String,
            required: true,
        },
        region: {
            type: String,
            required: true,
        },
        zip: String,
        phone: String,
    })
    const Users = mongoose.model("Users", userSchema)
    const user = new Users(
        {
            lname: lname,
            fname: fname,
            city: city,
            email: email,
            password: password,
            cpassword: cpassword,
            address: address,
            address1: address1,
            region: region,
            zip: zip,
            phone: phone
        }
    )
    user.save((err) => {
        if (err) { console.log(err) }
        else { console.log("Successfull!") }
    })

})


app.listen(8080, function (request, response) {
    console.log("server is running on port 8080")
})
