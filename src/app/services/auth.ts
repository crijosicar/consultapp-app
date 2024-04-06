export const sendLoginUser = async (payload: any): Promise<any> => {
    const response = await fetch('/api/login', {method: 'POST', body: payload})
    return await response.json()
}

export const sendSignupUser = async (payload: any): Promise<any> => {
    const response = await fetch('/api/signup', {method: 'POST', body: payload})
    return await response.json()
}