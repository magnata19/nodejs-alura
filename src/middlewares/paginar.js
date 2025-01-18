import RequisicaoIncorreta from '../erros/RequisicaoIncorreta.js';

async function paginar(req, res, next) {
    try {
        let {limite = 5, pagina = 1, campoOrdenacao = "_id", ordem = -1} = req.query;

      limite = parseInt(limite);
      pagina = parseInt(pagina);
      ordem = parseInt(ordem);

      const resultado = req.resultado;

      if(limite > 0 && pagina > 0){
        const resutadoPaginado = await resultado.find()
        .sort( {[campoOrdenacao]: ordem} )
        .limit(limite)
        .skip((pagina - 1) * limite)
        res.status(200).json(resutadoPaginado);
      } else {
        next(new RequisicaoIncorreta());
      }
    } catch(error) {
        next(error);
    }
}

export default paginar;