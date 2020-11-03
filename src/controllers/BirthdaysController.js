const db = require('../database/knex');

module.exports = {
    async index(req, res) {
      const [ persons ] = await db.raw(`SELECT fun.nome, fun.sexo, cur.ds_foto, car.nome cargo, se.nome setor FROM man_funcionario fun LEFT JOIN man_curriculo cur 
      ON fun.cpf = CONCAT( SUBSTRING(cur.nr_cpf,1,3), SUBSTRING(cur.nr_cpf,5,3), SUBSTRING(cur.nr_cpf,9,3), SUBSTRING(cur.nr_cpf,13,3) )
      LEFT JOIN man_situacao sit
      ON sit.epg_codigo = fun.codigo
      LEFT JOIN man_cargo car
      ON sit.car_codigo = car.codigo
      LEFT JOIN man_setor se
      on sit.lot_codigo = se.codigo
      WHERE DATE_FORMAT(fun.dtnascimento, "%d/%m") = DATE_FORMAT(NOW(), "%d/%m") AND fun.dtrescisao IS NULL ORDER BY fun.nome ASC`);

      return res.json(persons);
    }
}