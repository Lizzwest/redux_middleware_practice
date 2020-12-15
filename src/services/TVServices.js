import Client from './index'
const API_KEY = process.env.REACT_APP_API_KEY

export const GetAllGenres = async () => {
    try {
        const response = await Client.get(`/genre/tv/list${API_KEY}`)
        console.log(response.data)
        return response.data.genres
    } catch(err) {console.log(err)}
}

export const GetTrending = async () => {
    try {
        const response = await Client.get(`/trending/tv/week${API_KEY}`)
        console.log(response.data.results)
        return response.data.results
    } catch(err) {console.log(err)}
}

export const GetShowsByGenre = async (id, page) => {
    try {
        const response = (id===99||id===10402) ? await Client.get(`/discover/tv${API_KEY}&with_genres=${id}&with_original_language=en|ja|it|fr|de|ru|pt|es|sl|sv&sort_by=vote_average.desc&vote_count.gte=100&language=en&page=${page}`) : 
        await Client.get(`/discover/tv${API_KEY}&with_genres=${id}&with_original_language=en|ja|it|fr|de|ru|pt|es|sl|sv&sort_by=vote_average.desc&vote_count.gte=100&language=en&page=${page}`)
        console.log(response.data.results)
        return response.data.results
    } catch(err) {console.log(err)}
}

export const GetSearchShows = async (query) => {
    try {
        const response = await Client.get(`/search/tv${API_KEY}&query=${query}`)
        console.log(response.data.results)
        return response.data.results
    } catch(err) {console.log(err)}
}

export const GetShowDetails = async (id) => {
    try {
        const response = await Client.get(`/tv/${id}${API_KEY}&append_to_response=videos`)
        const streaming = await Client.get(`/tv/${id}/watch/providers${API_KEY}`)
        console.log(response.data, streaming.data.results.US)
        const returnData = {show: response.data, stream: streaming.data.results.US}
        return returnData
    } catch(err) {console.log(err)}
}