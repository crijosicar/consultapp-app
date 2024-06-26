const AUTH_LOGIN_PATH = '/auth/login'
const AUTH_TOKEN_PATH = '/auth/token'
const {CORE_API} = process.env

export async function POST(request: Request): Promise<Response> {
    const payload = await request.json()

    const loginRes = await fetch(`${CORE_API}${AUTH_LOGIN_PATH}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })

    const loginData = await loginRes.json()

    if (loginData.error === 'email not registered') return Response.json({error: 'Invalid credentials'}, {status: 404})

    if (!loginData.code) return Response.json({error: loginData.error}, {status: 500})

    const accessDataRes = await fetch(`${CORE_API}${AUTH_TOKEN_PATH}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({token: loginData.code}),
    })

    const accessData = await accessDataRes.json()

    if (!accessData.access_token) return Response.json(loginData, {status: 500})

    return Response.json({
        accessToken: accessData.access_token,
        refreshToken: accessData.refresh_token,
    }, {status: 201})
}