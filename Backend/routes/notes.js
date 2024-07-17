const express = require('express');
const router = express.Router();

router.get('/', (req,res)=>{
    o = {
        name : 'Anas',
        work : 'don'
    }
    res.send(res.json(o));
});


module.exports = router;