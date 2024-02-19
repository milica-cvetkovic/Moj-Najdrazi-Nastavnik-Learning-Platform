import express from 'express';
import cors from 'cors'
import mongoose from 'mongoose'
import loginRegistrationRouter from './routers/login-registration.router';
import studentRouter from './routers/student.router';
import teacherRouter from './routers/teacher.router';
import adminRouter from './routers/admin.router';


const app = express();
const path = require('path');

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/moj_najdrazi_nastavnik')
const conn = mongoose.connection
conn.once('open', ()=>{
    console.log("DB ok")
})

const router = express.Router()
router.use('/loginRegistration', loginRegistrationRouter)
router.use('/ucenik', studentRouter)
router.use('/nastavnik', teacherRouter)
router.use('/admin', adminRouter)

//app.use('/src/uploads', express.static(path.join(__dirname, '/src/uploads')));
app.use('/uploads', express.static(path.join(__dirname, 'src', 'uploads')));

app.use(express.json());

app.use("/" ,router)
app.listen(4000, () => console.log(`Express server running on port 4000`));
