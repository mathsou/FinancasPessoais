const connection = require('../database/connection');

module.exports = {
    async create(request, response){
        const {fatura} = request.query;
        const id_usuario = response.locals.idUser;
        const mes = parseInt(fatura.slice(0,2));
        const ano = parseInt(fatura.slice(2));
        const cartoes = await connection('faturas')
            .join('cartoes', 'cartoes.id', '=', 'faturas.cartao_id')
            .where('cartoes.usuario_id', '=', id_usuario)
            .andWhere('mes_id', '=', mes)
            .andWhere('ano', '=', ano)
            .select([
                'faturas.cartao_id',
                'faturas.valor'
            ]);

        await connection('faturas')
            .where('mes_id', '=', mes)
            .andWhere('ano', '=', ano)
            .update({
                paga: 1
            })
        var i;
        for(i=0; i<cartoes.length; i++){
            await connection('cartoes')
                .where('cartoes.usuario_id', '=', id_usuario)
                .andWhere('id', '=', cartoes[i].cartao_id)
                .increment('limiteD', cartoes[i].valor)
        }
        return response.status(204).send()
    }
}