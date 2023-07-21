import { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '@vercel/postgres';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  try {
    const { id }: any = request.query;
    const result = await sql`
      SELECT 
        * 
      FROM 
        viagem
      WHERE
        id_usuario = ${id}
      ;`;

    result.rows.map((item: any) => {
      const datahrInicio = item.dt_inicio.toString();
      const indiceSegundoDoisPontosInicio = datahrInicio.indexOf(':', datahrInicio.indexOf(':') + 1);
      const dataInicio = datahrInicio.substring(0, indiceSegundoDoisPontosInicio)
      item.dt_inicio = dataInicio

      const datahrFim = item.dt_fim.toString();
      const indiceSegundoDoisPontosFim = datahrFim.indexOf(':', datahrFim.indexOf(':') + 1);
      const dataFim = datahrFim.substring(0, indiceSegundoDoisPontosFim)
      item.dt_fim = dataFim
    });

    return response.status(200).json(result.rows);
  } catch (error) {
    return response.status(500).json({ error });
  }
}
