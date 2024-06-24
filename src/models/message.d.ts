/**
 * 消息类别
 */
export type MessageType = {
    cancelTime: Date
    content: string,
    isCancel: number
    isRead: number,
    id: number,
    readTime: Date,
    receiveType: number,
    avatarUrl: string,
    receiveUserId: number,
    teamId: number,
    sendTime: Date,
    sendType: number,
    sendUserId: number,
    userName: string,
    type: number
};
