const AUTH_SIGNUP_PATH = '/auth/signup'
const {CORE_API} = process.env

export async function POST(request: Request): Promise<Response> {
    const payload = await request.json()
    const res = await fetch(`${CORE_API}${AUTH_SIGNUP_PATH}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })

    const data = await res.json()
    
    return Response.json(data)
}