import $ from 'jquery';
import { API_KEY } from '../config';

export default function getRecommendations(id) {
    return new Promise((resolve, reject) => {
        const apiKey = API_KEY;
        const apiString = 'https://api.themoviedb.org/3/movie/' + id + '/recommendations?api_key=' + apiKey + '&language=en-US&page=1';
        $.ajax({
            url: apiString,
            success: (latestResults) => {
                const results = latestResults.results;
                resolve(results);
            },
            error: (xhr, status, err) => {
                console.log('Failed to fetch recommendations');
            }
        });
    });
}