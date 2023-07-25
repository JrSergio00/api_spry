import { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '@vercel/postgres';
import cors from 'cors';

// // Criar o middleware do cors
// const corsMiddleware = cors({
//   origin: 'http://localhost:5173', // Substitua isso pelo endereço do seu frontend
//   methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
//   allowedHeaders: ['Content-Type', 'Authorization'], // Headers permitidos
// });

// // Aplicar o middleware do cors apenas para essa rota
// export const config = {
//   api: {
//     bodyParser: false, // Desabilita o bodyParser padrão
//   },
// };

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {

  try {
    // Utilize o corsMiddleware como middleware antes de executar sua API
    // await new Promise<void>((resolve, reject) => {
    //   corsMiddleware(request, response, (err?: Error) => {
    //     if (err) {
    //       return reject(err);
    //     }
    //     resolve();
    //   });
    // });

    const { id }: any = request.query;
    const { nome, sobrenome, contato } = request.body;
    const nomeCompleto = nome + " " + sobrenome;

    const result = await sql`
    UPDATE 
      usuario
    SET 
      nome = ${nomeCompleto},
      contato = ${contato}
    WHERE 
      id =  ${id}
    ;`;

    // result.rows.map((item: any) => {
    // });

    return response.status(200).json(result.rows);
  } catch (error) {
    return response.status(500).json({ error });
  }
}
