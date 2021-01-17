import $ from 'jquery';
import { API_KEY } from '../config';

export default function getMovie(id) {
    return new Promise((resolve, reject) => {
        const apiKey = API_KEY;
        const apiString = 'https://api.themoviedb.org/3/movie/' + id + '?api_key=' + apiKey;
        $.ajax({
            url: apiString,
            success: (latestResult) => {
                const result = latestResult;
                resolve(result)
            },
            error: (xhr, status, err) => {
                console.error("Failed to fetch data")
              }
        });
    })
}