import $ from 'jquery';
import { API_KEY } from '../config';

export default function getCast(id) {
    return new Promise((resolve, reject) => {
        const apiKey = API_KEY;
        const apiString = 'https://api.themoviedb.org/3/movie/' + id + '/credits?api_key=' + apiKey;
        $.ajax({
            url: apiString,
            success: (latestResults) => {
                const results = latestResults.cast;
                resolve(results);
            },
            error: (xhr, status, err) => {
                console.error('Failed to get cast');
            }
        });
    });
}