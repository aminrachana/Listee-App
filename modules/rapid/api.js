const tripAdvisor = "https://tripadvisor16.p.rapidapi.com/api/v1"; //base URL for trip advisor API requests
const places = "https://opentripmap-places-v1.p.rapidapi.com/en/places"; //base URL for places (attractions) API requests

/*
 * Functions for Hotels requests.
 */

async function getHotels({city}) {
    console.log('city ', city);
    let reqUrl = `${tripAdvisor}/hotels/searchLocation?query=${city}`;
    let response = await fetch(
        reqUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'X-RapidAPI-Key': '030eb28c14mshb2c36693e6e4ed1p1d491ejsn5ee82c92e81f',
                'X-RapidAPI-Host': 'tripadvisor16.p.rapidapi.com'
            }
        }
    );
    return await response.json();
}


/*
 * Functions for Attractions requests.
 */

async function getAttractions({city}) {
    let reqUrl = `${places}/geoname?name=${city}`;
    let response = await fetch(
        reqUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'X-RapidAPI-Key': 'd6498a6b48msh87307525c2a691bp1e425ajsnffa9a6c6561e',
                'X-RapidAPI-Host': 'opentripmap-places-v1.p.rapidapi.com'
            }
        }
    );
    const coordinates = await response.json();
    console.log("coordinates ", coordinates);

    reqUrl = `${places}/radius?radius=500&lon=${coordinates.lon}&lat=${coordinates.lat}`;
    response = await fetch(
        reqUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'X-RapidAPI-Key': 'd6498a6b48msh87307525c2a691bp1e425ajsnffa9a6c6561e',
                'X-RapidAPI-Host': 'opentripmap-places-v1.p.rapidapi.com'
            }
        }
    );

    return await response.json();
}


module.exports = {
    getHotels,
    getAttractions
};