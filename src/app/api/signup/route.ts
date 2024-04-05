const AUTH_SIGNUP_PATH = '/auth/signup'
const {CORE_API} = process.env


export async function POST(request: Request): Promise<Response> {
    const payload = await request.json()

    const signupRes = await fetch(`${CORE_API}${AUTH_SIGNUP_PATH}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })

    const signupData = await signupRes.json()
    
    return Response.json(signupData, {status: 201})
}