const express = require('express')
const router = express.Router();
const upload = require('../utils/upload');

// *Connect DB
require('../utils/db')
const Siswa = require('../models/siswa')

//* Get list of siswa
router.get('/', async (req,res)=>{
    const { search } = req.query;

    // Use a condition to define the query dynamically
    const query = search
        ? { $or: [{ nama: { $regex: search, $options: 'i' } }, { kelas: { $regex: search, $options: 'i' } }] }
        : {};

    // Fetch results based on the query
    const siswa = await Siswa.find(query);

    res.render('siswa', {
        title: 'Daftar Siswa',
        layout: 'siswa',
        siswa
    })
});

//* Access page tambah-siswa
router.get('/tambah-siswa', async (req,res)=>{

    const kelas = await Siswa.schema.path('kelas').enumValues;

    res.render('tambah-siswa', {
        title: 'Tambah Siswa',
        layout: 'tambah-siswa',
        kelas
    })

});

router.get('/:_id', async (req,res)=>{
    const siswa = await Siswa.findOne({_id:req.params._id});
    const kelas = await Siswa.schema.path('kelas').enumValues;

    res.render('edit-siswa', {
        title: 'Edit Siswa',
        layout: 'edit-siswa',
        siswa,
        kelas
    })
});

//* Saving data on tambah-siswa
router.post('/', upload.single('profilePicture'),async (req,res)=>{
    try{
        //* Saving to db
        const {nama, alamat, dob, gender, kelas, note} = req.body;
        const siswa = new Siswa({
            nama,
            alamat,
            dob,
            gender,
            kelas,
            note,
            profilePicture: req.file ? req.file.filename : null
        });

        await siswa.save();

        // res.redirect('/siswa')

    } catch (error){
        //* Error handling
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
    
});

//* Delete a siswa
router.delete('/', async (req,res)=>{
    const siswa = await Siswa.deleteOne({_id:req.body._id})

    // res.redirect('/siswa')
});


router.put('/', upload.single('profilePicture'), async (req,res)=>{
    const {nama, alamat, dob, gender, kelas, note} = req.body;
    const siswa = await Siswa.updateOne({_id:req.body._id}, {
        $set: {
            nama,
            alamat,
            dob,
            gender,
            kelas,
            note,
            profilePicture: req.file ? req.file.filename : null
        }
    });

    res.redirect('/siswa')
});

module.exports = router;