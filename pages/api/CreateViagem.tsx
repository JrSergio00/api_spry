import { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '@vercel/postgres';
import cors from 'cors';

const corsMiddleware = cors({
    origin: 'http://localhost:5173',
    methods: ['POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
});

export default async function handler(
    request: NextApiRequest,
    response: NextApiResponse
) {
    await new Promise<void>((resolve, reject) => {
        corsMiddleware(request, response, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });

    try {
        const { partida, destino, valor, tp_veiculo, tp_pagamento, dt_inicio, distancia, id_usuario, dt_fim, prestador }: any = request.body

        const result = await sql`
            INSERT INTO 
                viagem 
                (
                    id,
                    partida, 
                    destino,
                    valor,
                    tp_veiculo,
                    tp_pagamento,
                    dt_inicio,
                    distancia,
                    id_usuario,
                    status,
                    dt_fim,
                    id_prestador
                ) 
            VALUES 
                (
                    (SELECT MAX(id) + 1 FROM viagem),
                    ${partida.trim().toLowerCase()}, 
                    ${destino.trim().toLowerCase()},
                    ${valor},
                    ${tp_veiculo}, 
                    ${tp_pagamento},
                    ${dt_inicio},
                    ${distancia}, 
                    ${id_usuario},
                    'I',
                    ${dt_fim},
                    ${prestador}
                )
            ;`

        // Se houver pelo menos um resultado, retorna true, senão, retorna false
        console.log(result)
        return response.status(200).json({ result: true });
    } catch (error) {
        console.error(error);
        return response.status(500).json({ error: 'Erro interno do servidor' });
    }

}
