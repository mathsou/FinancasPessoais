const connection = require('../database/connection');
const cripto = require('../functions/cripto');

module.exports = {
    async create(request, response){
        var {user, senha} = request.body;
        senha = cripto.criptografar(senha);
        const usuario = await connection('usuarios')
            .where('userName', '=', user)
            .orWhere('email', '=', user)
            .select([
                'id',
                'senha',
                'nome',
                'salarioB'])
            .first();

        if(usuario){
            if(senha == usuario.senha){
                return response.json(usuario);
            }
            return response.json({error: 'Senha incorreta'})
        }
        return response.json({error: 'Usuario não encontrado'})
    }
}