/**
 * 队伍类别
 */
import {UserType} from "./user";

export type TeamType = {
    id: number;
    name: string;
    description: string;
    expireTime?: Date;
    maxNum: number;
    joinNum: number;
    password?: string;
    // 0 公开 1 私有 2 加密
    status: number;
    createTime: Date;
    updateTime: Date;
    createUser?: UserType;
    hasJoin?: boolean;
    teamImage: string;
}