const connection = require('../database/connection');
const crypto = require('crypto');
const cripto = require('../functions/cripto');

module.exports = {
    async index (request, response) {
        const id = request.headers.autorizar;
        const usuario = await connection('usuarios')
        .select('userName', 'nome', 'email', 'salarioB')
        .where({id: id});
        return response.json(usuario);
        
    },
    async create (request, response){
        var {userName, nome, email, senha, salarioB} = request.body;
        console.log(userName, nome, email, senha, salarioB);
        const tipoUser_id = 2;
        senha = cripto.criptografar(senha);
        const id = crypto.randomBytes(8).toString('hex');
        await connection('usuarios').insert({
            id,
            userName,
            nome,
            email,
            senha,
            salarioB,
            tipoUser_id
        }); 
        return response.json({id});
    },


    async modify(request, response){
        var {userName, nome, email, senha, salarioB} = request.body;
        const id = request.headers.autorizar;
        senha = cripto.criptografar(senha);
        await connection('usuarios')
        .where('id', id)
        .update({
            userName: userName,
            nome: nome,
            email: email,
            senha:senha,
            salarioB: salarioB,
        });
        return response.status(204).send();
    }

};