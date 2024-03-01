
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const authRoute = require('./routes/authRoute');
const userController = require('./controllers/userController');
const UserModel = require('./models/User');

const pool=require("./config/db")



const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());



// MongoDB 
mongoose.connect('mongodb://localhost:27017/WeddingCard')
    .then(function () { console.log('connected successfully') })
    .catch(function (err) { console.log('DB was not connected' + err) }); 

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});


app.get("/", (req, res) => {
  res.send("This is a GET request example");
});

app.get("/register", (req, res) => {
  res.send("register");
});

app.post("/register", userController.registerUser);

app.post("/login",async (req,res)=>{

  // const email=req.body["email"]
  // const password=req.body["password"]
  // console.log("email:"+email);
  // console.log("password:"+password);

  // // const insertSTMT=`INSERT INTO accounts(email,password)VALUES('${email}','${password}')`
   
  // //  pool.query(insertSTMT,(response)=>{
  // //   console.log("Data saved")
  // //   console.log(response);
  // //  })
  // //  console.log(req.body);
  // //  res.send("Response recieved"+req.body);

  // // MongoDB에 데이터 저장
  // const newUser = new UserModel({ email, password });
  // newUser.save()
  //   .then(response => {
  //     console.log("Data saved");
  //     console.log(response);
  //     res.send("Response received" + req.body);
  //   })
  //   .catch(error => {
  //     console.error("Error saving data:", error.message);
  //     res.status(500).json({ message: 'Internal Server Error' });
  //   });


  try {
    const email = req.body["email"];
    const password = req.body["password"];
    console.log("email:" + email);
    console.log("password:" + password);

    // MongoDB에서 해당 이메일로 사용자 찾기
    const user = await UserModel.findOne({ email });

    // 사용자가 없으면 에러 반환
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // 비밀번호 비교
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // 비밀번호가 일치하지 않으면 에러 반환
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // 로그인 성공 시 필요한 로직을 추가 (예: 토큰 생성 등)
    // 여기에서는 간단하게 성공 메시지만 반환
    res.status(200).json({ message: 'Login successful' });
    console.log('Login successful');
  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});




// Routes
app.use('/auth', authRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); 
});
