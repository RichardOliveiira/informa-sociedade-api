const avisodb = require('../models/avisos');

async function cadastrarAvisos(aviso) {

    if (!aviso.titulo || !aviso.descricao) {
        throw error('Você precisa informar um título e uma descrição');
    }

    try {
        let cadastrarAviso = avisodb(aviso);
        return await cadastrarAviso.save();

    } catch (error) {
        throw error(error);
    }

}
async function pegaTodosAvisos() {
     return avisodb.find()
 }


module.exports = {
    cadastrarAvisos,
    pegaTodosAvisos
}