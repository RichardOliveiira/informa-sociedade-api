const express =  require('express')
const controller = require('../controllers/avisos');
const httpStatus = require('http-status-code');
const router = express.Router()


router.get("/todos",(req, res) => {
    controller.pegaTodosAvisos().then(avisos =>{
        res.status(200).send(avisos)
    }).catch(error =>{
        console.log(error)
    })
})


router.post("/cadastro", (req, res) => {
    controller.cadastrarAvisos(req.body.aviso).then(cadastro =>{
        res.status(200).send({"msg": "Cadastro efetuado com sucesso!"})
    }).catch(error =>{
        console.log(error)
    })
}) 

module.exports= router