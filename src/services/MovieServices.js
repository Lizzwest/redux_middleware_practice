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
        // console.log(response.data.results)
        return response.data.results
    } catch(err) {console.log(err)}
}

export const GetMoviesByGenre = async (id, page, name) => {
    console.log(id)
    console.log(page)
    console.log(name)
    try {
        const response = (id===99) ? await Client.get(`/discover/movie${API_KEY}&with_genres=${id}&with_original_language=en|ja|it|fr|de|ru|pt|es|sl|sv&sort_by=vote_average.desc&vote_count.gte=250&language=en&page=${page}`) : 
        await Client.get(`/discover/movie${API_KEY}&with_genres=${id}&with_original_language=en|ja|it|fr|de|ru|pt|es|sl|sv&sort_by=vote_average.desc&vote_count.gte=516&language=en&page=${page}`)
        console.log(response.data.results)
        return response.data.results
    } catch(err) {console.log(err)}
}

export const GetSearchMovies = async (query) => {
    try {
        const response = await Client.get(`https://api.themoviedb.org/3/search/movie${API_KEY}&query=${query}`)
        console.log(response.data.results)
        return response.data.results
    } catch(err) {console.log(err)}
}

