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
    console.log(id)
    try {
        const endpoint = (id) => {
            switch(id) {
                case 16: return `/discover/tv${API_KEY}&with_genres=${id}&with_original_language=en|it|fr|de|ru|pt|es|sl|sv&sort_by=vote_average.desc&vote_count.gte=25&language=en&page=${page}`;
                case 10764: return `/discover/tv${API_KEY}&with_genres=${id}&with_original_language=en|it|fr|de|ru|pt|es|sl|sv&sort_by=vote_average.desc&vote_count.gte=50&language=en&page=${page}`;
                case 10763: return `/discover/tv${API_KEY}&with_genres=${id}&with_original_language=en|it|fr|de|ru|pt|es|sl|sv&sort_by=vote_average.desc&vote_count.gte=25&language=en&page=${page}`;
                case 10768: return `/discover/tv${API_KEY}&with_genres=${id}&without_genres=16&with_original_language=en|it|fr|de|ru|pt|es|sl|ja|sv&sort_by=vote_average.desc&vote_count.gte=20&language=en&page=${page}`;
                case 37: return `/discover/tv${API_KEY}&with_genres=${id}&with_original_language=en|it|fr|de|ru|pt|es|sl|ja|sv&sort_by=vote_average.desc&vote_count.gte=20&language=en&page=${page}`;
                case 99: return `/discover/tv${API_KEY}&with_genres=${id}&with_original_language=en|it|fr|de|ru|pt|es|sl|ja|sv&sort_by=vote_average.desc&vote_count.gte=20&language=en&page=${page}`;
                case 10765: return `/discover/tv${API_KEY}&with_genres=${id}&without_genres=10751,16,35&with_original_language=en|it|fr|de|ru|pt|es|sl|sv&sort_by=vote_average.desc&vote_count.gte=25&language=en&page=${page}`;
                case 35: return `/discover/tv${API_KEY}&with_genres=${id}&without_genres=10751,16,18,10765,10764&with_original_language=en|it|fr|de|ru|pt|es|sl|sv&sort_by=vote_average.desc&vote_count.gte=30&language=en&page=${page}`;
                default: return `/discover/tv${API_KEY}&with_genres=${id}&without_genres=16,10764&with_original_language=en|it|fr|de|ru|pt|es|sl|sv&sort_by=vote_average.desc&vote_count.gte=30&language=en&page=${page}`;

            }
        }
        const response = await Client.get(endpoint(id)) 
        console.log(response.data)
        return response.data
    } catch(err) {console.log(err)}
}

export const GetAnimeShows = async (page) => {
    try {
        const response = await Client.get(`/discover/tv${API_KEY}&with_genres=16&with_original_language=ja&sort_by=vote_average.desc&vote_count.gte=25&language=en&page=${page}`) 
        console.log(response.data)
        return response.data
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