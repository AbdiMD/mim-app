const express = require('express')
const router = express.Router();

// *Connect DB
require('../utils/db')
const Siswa = require('../models/siswa')

//* Get list of siswa
router.get('/', async (req,res)=>{
    const siswa = await Siswa.find()

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
router.post('/', async (req,res)=>{
    try{
        //* Saving to db
        const siswa = new Siswa(req.body);

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


router.put('/', async (req,res)=>{
    const siswa = await Siswa.updateOne({_id:req.body._id}, {
        $set: {
            nama: req.body.nama,
            dob: req.body.dob,
            alamat: req.body.alamat,
            gender: req.body.gender,
            kelas: req.body.kelas,
            note: req.body.note
        }
    });

    // res.redirect('/siswa')
});

module.exports = router;