export type BubbleUserType = {
    id: string;
    name: string;
    avatar: string;
}

export type BubbleType = {
    id: string;
    content: string;
    title: string;
    timestamp: string;
    user: BubbleUserType;
    type: 'text' | 'image' | 'video' | 'audio';
    status: 'sent' | 'received' | 'read';
    attachment?: {
        url: string;
        preview: string;
        type: 'image' | 'video' | 'audio';
    };
}