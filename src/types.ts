export type LabyProfileResponse = {
    uuid: string
    username: string
    username_history: Array<{
        username: string
        name: string
        changed_at: string
        accurate: boolean
    }>
    textures: {
        SKIN: Array<{
            type: string
            image_hash: string
            file_hash: string
            first_seen_at: string
            last_seen_at: string
            slim_skin: boolean
            active: boolean
        }>
    }
}

export type Profile = {
    uuid: string
    username: string
    changedDate: Date
    accurate: boolean
    history: Array<{
        username: string
        changeDate: Date
        accurate: boolean
    }>
    textures: Array<{
        type: string
        imageHash: string
        fileHash: string
        firstSeen: Date
        lastSeen: Date
        slim: boolean
        current: boolean
    }>
}

export type MojangAPIResponse = {
    name: string
    id: string
} | {
    error: 'BadRequestException'
    errorMessage: string
} | {
    error: 'TooManyRequestsException'
    errorMessage: string
}
