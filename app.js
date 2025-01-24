const express = require('express');
const expressLayouts = require('express-ejs-layouts')
const Swal = require('sweetalert2')
const methodOverride = require('method-override')
const siswaRoute = require('./router/siswa')
const userTypeRoute = require('./router/userType')
const userRoute = require('./router/user')
const login = require('./router/login');
const logout = require('./router/logout');
const auth = require('./services/auth_jwt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');


const app = express();
const port = 3000;

app.listen(port, ()=>{
    console.log('express gass')
});

app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}))


// app.use(auth.sessionConf)
app.use(cookieParser());
app.use(['/siswa', '/usertype', '/user'], auth.isAuth)

app.use(methodOverride('_method'))

app.use(auth.attachUser);
app.use((req, res, next) => {
    res.locals.user = req.user || null; // Attach the user to res.locals
    next();
});

// Routes
app.use('/siswa', siswaRoute);
app.use('/usertype', userTypeRoute);
app.use('/user', userRoute);
app.use('/login', login);
app.use('/logout', logout);


// *Connect DB
require('./utils/db')
const Siswa = require('./models/siswa');
const user = require('./models/user');

//* Access ke home
app.get('/', auth.isAuth, async (req,res)=>{

    console.log(req.body)
    console.log(req.user)

    res.render('index', {
        title: 'Beranda',
        layout: 'index'
    })
});

app.get('/data' ,async (req,res) => {
    try {
        const kelas1 = await Siswa.countDocuments({kelas: 'Kelas 1'})
        const kelas2 = await Siswa.countDocuments({kelas: 'Kelas 2'})
        const kelas3 = await Siswa.countDocuments({kelas: 'Kelas 3'})
        const kelas4 = await Siswa.countDocuments({kelas: 'Kelas 4'})
        const kelas5 = await Siswa.countDocuments({kelas: 'Kelas 5'})
        const kelas6 = await Siswa.countDocuments({kelas: 'Kelas 6'})

        res.json({
            kelas1: kelas1,
            kelas2: kelas2,
            kelas3: kelas3,
            kelas4: kelas4,
            kelas5: kelas5,
            kelas6: kelas6
        })
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    
});

app.get('/dataPerKelas', async (req,res)=> {
    try {
        const kelas1 = {
            laki : await Siswa.countDocuments({kelas:'Kelas 1', gender: 'L'}),
            perempuan : await Siswa.countDocuments({kelas:'Kelas 1', gender: 'P'}),
        };

        const kelas2 = {
            laki : await Siswa.countDocuments({kelas:'Kelas 2', gender: 'L'}),
            perempuan : await Siswa.countDocuments({kelas:'Kelas 2', gender: 'P'}),
        };

        const kelas3 = {
            laki : await Siswa.countDocuments({kelas:'Kelas 3', gender: 'L'}),
            perempuan : await Siswa.countDocuments({kelas:'Kelas 3', gender: 'P'}),
        };

        const kelas4 = {
            laki : await Siswa.countDocuments({kelas:'Kelas 4', gender: 'L'}),
            perempuan : await Siswa.countDocuments({kelas:'Kelas 4', gender: 'P'}),
        };

        const kelas5 = {
            laki : await Siswa.countDocuments({kelas:'Kelas 5', gender: 'L'}),
            perempuan : await Siswa.countDocuments({kelas:'Kelas 5', gender: 'P'}),
        };

        const kelas6 = {
            laki : await Siswa.countDocuments({kelas:'Kelas 6', gender: 'L'}),
            perempuan : await Siswa.countDocuments({kelas:'Kelas 6', gender: 'P'}),
        }


        res.json({
            kelas1,
            kelas2,
            kelas3,
            kelas4,
            kelas5,
            kelas6
        })
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

