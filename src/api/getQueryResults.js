import $ from 'jquery';
import { API_KEY } from '../config';

export default function getQueryResults(type, term) {
    return new Promise((resolve, reject) => {
        const apiString = 'https://api.themoviedb.org/3/movie/';
        const apiKey = API_KEY;
        var urlString = '';
        switch (type) {
            case 'popular':
                urlString = apiString + 'popular?api_key=' + apiKey + '&language=en-US';
                break;
            case 'top_rated':
                urlString = apiString + 'top_rated?api_key=' + apiKey + '&language=en-US';
                break;
            case 'upcoming':
                urlString = apiString + 'upcoming?api_key=' + apiKey + '&language=en-US';
                break;
            case 'now_playing':
                urlString = apiString + 'now_playing?api_key=' + apiKey + '&language=en-US';
                break;
            case 'search':
                urlString = 'https://api.themoviedb.org/3/search/movie?api_key=' + apiKey + '&query=' + term;
                break;
            default:
                urlString = apiString + 'popular?api_key=' + apiKey + '&language=en-US';
        }
        $.ajax({
            url: urlString,
            success: (latestResults) => {
                const results = latestResults.total_pages;
                resolve(results)
            },
            error: (xhr, status, err) => {
                console.error("Failed to fetch data")
              }
        });
    })
}
