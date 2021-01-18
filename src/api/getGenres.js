import $ from 'jquery';
import { API_KEY } from '../config';

export default function getGenres() {
    return new Promise((resolve, reject) => {
        const apiKey = API_KEY;
        const apiString = 'https://api.themoviedb.org/3/genre/movie/list?api_key=' + apiKey;
        
        $.ajax({
            url: apiString,
            success: (latestResults) => {
                const results = latestResults.genres;
                resolve(results)
            },
            error: (xhr, status, err) => {
                console.error("Failed to fetch genres")
              }
        });
    })
}
