import {v4 as uuidv4} from "uuid";

export const createBaseChat = async (accessToken: string) => {
    const payload = JSON.stringify({
        timeline: [{
            id: uuidv4(),
            user: {
                id: 1,
                name: 'ConsultApp',
                avatar: 'https://ui-avatars.com/api/?name=Consult+App'
            },
            title: 'ConsultApp',
            content: " <h2 className=\"font-medium text-gray-800 dark:text-white\"> How can we help? </h2> <div className=\"space-y-1.5\"> <p className=\"mb-1.5 text-sm text-gray-800 dark:text-white\"> You can ask questions like: </p> <ul className=\"list-disc list-outside space-y-1.5 ps-3.5\"> <li className=\"text-sm text-gray-800 dark:text-white\"> How can I get a VISA as a Colombian national? </li> <li className=\"text-sm text-gray-800 dark:text-white\"> Steps to get a visitor VISA to Canada as a Colombian? </li> <li className=\"text-sm text-gray-800 dark:text-white\"> Is it hard to get a VISA as a Colombian national for Canada? </li> </ul> </div>",
            timestamp: new Date().toISOString(),
            type: 'text',
            status: 'received'
        }]
    })

    const fetchOpts = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        },
        body: payload
    }

    const timelineResponse = await fetch('/api/chats', fetchOpts)
    return await timelineResponse.json()
}

export const getCurrentTimeline = async (accessToken: string) => {
    const fetchOpts = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        },
    }

    const response = await fetch('/api/chats', fetchOpts)
    return await response.json()
}

export const updateChatTimeline = async (accessToken: string, chatId: number, timeline: any) => {
    const fetchOpts = {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify({
            timeline
        })
    }
    const postTimelineResponse = await fetch(`/api/chats/${chatId}`, fetchOpts)
    return await postTimelineResponse.json()
}