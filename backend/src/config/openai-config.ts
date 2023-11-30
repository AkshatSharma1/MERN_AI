import  Configuration  from 'openai'
import { ClientOptions } from 'openai'

export const configureOpenAI = (): object =>{
    const config = new Configuration({
        organization: process.env.OPEN_AI_ORGANIZATION,
        apiKey: process.env.OPEN_AI_API_KEY
    })

    return config;
}
