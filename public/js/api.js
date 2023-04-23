const fetch = require('node-fetch'); // Import node-fetch library

var apiKey = "IbaW8dTN1RMuvUDjDeWJ0ezUI3gDF3bGIt6COlj48Gi57bbvzt";
var apiSecret = "0ZZhQn3IwuGN76cO8lng1TrbgF3JrUB6QSpiye7Z";
var accessToken = null; // Initialize access token as null

const apiUrl = 'https://api.petfinder.com/v2/oauth2/token';

// Create the request body as a JSON object
const requestBody = {
  grant_type: 'client_credentials',
  client_id: apiKey,
  client_secret: apiSecret
};

const getAccessToken = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                throw new Error('Failed to fetch access token');
            }

            const body = await response.json();
            accessToken = body.access_token;
            console.log('Access Token:', accessToken);
            resolve(accessToken);
        } catch (err) {
            reject(err);
        }
    });
};

// Wrap the API request in a promise
const callExternalApiUsingFetch = () => {
    return new Promise((resolve, reject) => {
        // ... API call and response handling ...
        const queryParams = {
            type: 'Dog', //type of animal
            breed: 'Pit Bull Terrier',
            size: 'Medium', // S / M / L
            age: 'young', //"baby", "young", "adult", "senior"
            gender: 'male',
            location: 'Charlotte, NC', //The location to search for animals, such as a city, state, or ZIP code
            distance: 10, //radius according to unit param
            unit: 'Miles', //unit param for distance
            status: "adoptable", //"adoptable", "adopted", "found" -- our app should sort and only find adoptable
            attributes: "neutered"
        };
        fetch(`https://api.petfinder.com/v2/animals?${new URLSearchParams(queryParams)}`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                return resolve(data);
            })
            .catch(error => reject(error));
    });
};

export function fetchAndProcessPets () {
    try {
        getAccessToken(); // Wait for access token
        console.log('reached here');
        return callExternalApiUsingFetch(); // Wait for API call to complete and pets to be fetched
    } catch (error) {
        console.error(error);
    }
}
