import Client from './index'
const API_KEY = process.env.REACT_APP_API_KEY

export const GetAllGenres = async () => {
    try {
        const response = await Client.get(`/genre/movie/list${API_KEY}`)
        console.log(response.data)
        return response.data.genres
    } catch(err) {console.log(err)}
}

export const GetTrending = async () => {
    try {
        const response = await Client.get(`/trending/movie/week${API_KEY}`)
        console.log(response.data.results)
        return response.data.results
    } catch(err) {console.log(err)}
}

export const GetMoviesByGenre = async (id, page, name) => {
    console.log(id, page, name)
    try {
        const response = (id===99||id===37||id===10770||id===10402) ? await Client.get(`/discover/movie${API_KEY}&with_genres=${id}&with_original_language=en|ja|it|fr|de|ru|pt|es|sl|sv&sort_by=vote_average.desc&vote_count.gte=120&language=en&page=${page}`) : 
        await Client.get(`/discover/movie${API_KEY}&with_genres=${id}&with_original_language=en|ja|it|fr|de|ru|pt|es|sl|sv&sort_by=vote_average.desc&vote_count.gte=516&language=en&page=${page}`)
        console.log(response.data)
        return response.data
    } catch(err) {console.log(err)}
}

export const GetSearchMovies = async (query) => {
    try {
        const response = await Client.get(`/search/movie${API_KEY}&query=${query}`)
        console.log(response.data.results)
        return response.data.results
    } catch(err) {console.log(err)}
}

export const GetMovieDetails = async (id) => {
    try {
        const response = await Client.get(`/movie/${id}${API_KEY}&append_to_response=videos`)
        const streaming = await Client.get(`/movie/${id}/watch/providers${API_KEY}`)
        const recommendations = await Client.get(`/movie/${id}/recommendations${API_KEY}`)
        console.log(response.data, streaming.data.results.US, recommendations.data)
        const returnData = {movie: response.data, stream: streaming.data.results.US, recommend: recommendations.data.results.filter(r => r.poster_path!==null)}
        return returnData
    } catch(err) {console.log(err)}
}

