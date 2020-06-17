
exports.up = function(knex) {
    return knex('usuarios').insert({
        id: 1,
        userName: 'admin',
        nome: 'Administrador',
        email: 'admin.controleDividas@hotmail.com',
        senha: '1q2w3e4r5t6y',
        salarioB: 0,
        tipoUser_id: 1
    });
};

exports.down = function(knex) {
    return knex('usuarios').del();
};
