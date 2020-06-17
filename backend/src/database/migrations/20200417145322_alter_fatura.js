
exports.up = function(knex) {
    return knex.schema.table('faturas', function(table) {
        table.integer('fechamento');
        table.integer('vencimento');
    });
};

exports.down = function(knex) { 
    return knex.schema.table('faturas', function(tavble){
        table.dropColumn('fechamento');
        table.dropColumn('vencimento');
    });
};
