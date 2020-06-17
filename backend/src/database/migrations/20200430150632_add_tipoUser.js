
exports.up = function(knex) {
    return [knex('tipoUser').insert({
        id: 1,
        descricao: 'Admin'
    }),
    knex('tipoUser').insert({
        id: 2,
        descricao: 'Padrao'
    }),
    ];
};

exports.down = function(knex) {
    return knex('tipoUser').del();
};
