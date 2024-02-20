
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoute = require('./routes/authRoute');

const pool=require("./config/db")

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3200;

// Middleware
app.use(express.json());
app.use(cors());

app.post("/login",(req,res)=>{
  const email=req.body["email"]
  const password=req.body["password"]
  console.log("email:"+email);
  console.log("password:"+password);

  const insertSTMT=`INSERT INTO accounts(email,password)VALUES('${email}','${password}')`
   
   pool.query(insertSTMT,(response)=>{
    console.log("Data saved")
    console.log(response);
   })
   console.log(req.body);
   res.send("Response recieved"+req.body);
})

// Routes
app.use('/auth', authRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); 
});
