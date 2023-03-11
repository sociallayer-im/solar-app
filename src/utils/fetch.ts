import axios from 'axios'

export interface FetchOptions {
    url: string,
    data?: Record<string, string | number | any>
    authToken?: string
    header?: {}
}

async function get (options: FetchOptions) {
    if (options.data && options.authToken ) {
        options.data.auth_tokne = options.authToken
    }

    return await axios.get(options.url, {
        params: options.data
    })
}

async function post (options: FetchOptions) {
    if (options.data && options.authToken ) {
        options.data.auth_tokne = options.authToken
    }

    return await axios.post(options.url, options.data, {
        headers: options.header || {
            'Content-Type': 'application/json'
        }}
    )
}

export default { get, post }
