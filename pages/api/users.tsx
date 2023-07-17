export default function handler(req: any, res: any) {

  const data = [
    {
      "id": 2,
      "nome": "Sérgio Júnior",
      "contato": "84910101010",
      "senha": "serginho123"
    },
    {
      "id": 1,
      "nome": "Hélio Filho",
      "contato": "84981072912",
      "senha": "helinho123"
    },
    {
      "id": 3,
      "nome": "Marcílio Targino",
      "contato": "84950505050",
      "senha": "marcilinho123"
    }
  ]
  if(req.method === 'GET'){
    return res.status(200).json(data)
  }
}