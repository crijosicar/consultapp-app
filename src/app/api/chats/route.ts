import {headers} from 'next/headers'

const API_CHAT_PATH = '/api/chat/'
const {CORE_API} = process.env

export async function GET(request: Request): Promise<Response> {
    const authorization = headers().get('authorization')
    const {searchParams} = new URL(request.url)

    if (!authorization) return Response.json({error: 'Unauthorized'}, {status: 401})

    let requestUrl = `${CORE_API}${API_CHAT_PATH}`

    if (searchParams) {
        requestUrl = `${requestUrl}?${searchParams}`
    }

    const chatRes = await fetch(requestUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${authorization}`,
        },
    })

    const chatData = await chatRes.json()

    //Set default values
    const {chats = [], count = 0} = chatData

    return Response.json({chats, count}, {status: 200})
}

export async function POST(request: Request): Promise<Response> {
    const authorization = headers().get('authorization')

    if (!authorization) return Response.json({error: 'Unauthorized'}, {status: 401})

    const payload = await request.json()

    const createChatRes = await fetch(`${CORE_API}${API_CHAT_PATH}`, {
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