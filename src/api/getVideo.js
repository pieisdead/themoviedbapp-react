import $ from 'jquery';
import { API_KEY } from '../config';

export default function getVideo(id) {
    return new Promise((resolve, reject) => {
        const apiKey = API_KEY;
        const apiString = 'https://api.themoviedb.org/3/movie/' + id + '/videos?api_key=' + apiKey;
        $.ajax({
            url: apiString,
            success: (latestResults) => {
                const results = latestResults.results;
                resolve(results);
            },
            error: (xhr, status, err) => {
                console.error('Failed to get video');
            }
        });
    });
}