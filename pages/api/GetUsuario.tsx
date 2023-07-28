import { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '@vercel/postgres';
 
export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  try {
    const { id }: any = request.query;
    const result = await sql`
    SELECT 
      * 
    FROM 
      usuario
    WHERE
      id = ${id}
    ;`;

    const usuario = result.rows;
    
    usuario.map( (item) => { 
      const nomeDoUsuário = item.nome.toLowerCase();
      const nome = nomeDoUsuário.split(' ')[0];

      if(nomeDoUsuário.split(' ')[1] === "da" || nomeDoUsuário.split(' ')[1] === "de" || nomeDoUsuário.split(' ')[1] === "do"|| nomeDoUsuário.split(' ')[1] === "dos"|| nomeDoUsuário.split(' ')[1] === "das"){
      
        const sobrenome = nomeDoUsuário.split(' ')[1] + " " + nomeDoUsuário.split(' ')[2];
        item.nome = nome;
        item.sobrenome = sobrenome;
      
      } else{
        const sobrenome = nomeDoUsuário.split(' ')[1];
        item.nome = nome;
        item.sobrenome = sobrenome;
      }
    })

    return response.status(200).json( usuario );
  } catch (error) {
    return response.status(500).json({ error });
  }
}