import {headers} from 'next/headers'

const API_CHAT_PATH = '/api/chat/'
const {CORE_API} = process.env

export async function PUT(request: Request, {params}: { params: { id: string } }): Promise<Response> {
    const authorization = headers().get('authorization')

    if (!authorization) return Response.json({error: 'Unauthorized'}, {status: 401})

    if (!params.id) return Response.json({error: 'Invalid chat id'}, {status: 400})

    const payload = await request.json()

    const createChatRes = await fetch(`${CORE_API}${API_CHAT_PATH}${params.id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${authorization}`,
        },
        body: JSON.stringify(payload),
    })

    const createChatData = await createChatRes.json()
    
    if (createChatData.error) return Response.json({error: createChatData.error}, {status: 500})

    return Response.json({}, {status: 201})
}