import { fetch, FetchResultTypes } from '@sapphire/fetch'
import { Profile, LabyProfileResponse, MojangAPIResponse } from './types.js'

export default async function getNameHistory(usernameOrUUID: string): Promise<Profile | null> {
    try {
        const uuid = await resolveUsername(usernameOrUUID)
        const resp = await fetch(`https://laby.net/api/v2/user/${uuid}/get-profile`, FetchResultTypes.Result)
        if (!resp.ok) {
            return null
        }
        const response: LabyProfileResponse = await resp.json()
        return {
            uuid: response.uuid,
            username: response.username,
            changedDate: new Date(response.username_history[response.username_history.length - 1].changed_at),
            accurate: response.username_history[response.username_history.length - 1].accurate,
            history: response.username_history.map((name) => ({
                username: name.username,
                changeDate: new Date(name.changed_at),
                accurate: name.accurate
            })),
            textures: response.textures.SKIN.map((texture) => ({
                type: texture.type,
                imageHash: texture.image_hash,
                fileHash: texture.file_hash,
                firstSeen: new Date(texture.first_seen_at),
                lastSeen: new Date(texture.last_seen_at),
                slim: texture.slim_skin,
                current: texture.active ?? false
            }))
        }

    } catch(e) {
        return null
    }
}

async function resolveUsername(input: string): Promise<string> {
    if (!input.includes('-') || input.length < 17) {
        const uuidResponse: MojangAPIResponse = await fetch(`https://api.mojang.com/users/profiles/minecraft/${input}`, FetchResultTypes.JSON)

        if ('id' in uuidResponse) {
            return `${uuidResponse.id.substring(0, 8)}-${uuidResponse.id.substring(8, 12)}-${uuidResponse.id.substring(12, 16)}-${uuidResponse.id.substring(16, 20)}-${uuidResponse.id.substring(20)}`
        } else {
            throw new Error('Failed to fetch UUID')
        }

    } else {
        return input
    }

}