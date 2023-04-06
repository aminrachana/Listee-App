const express = require("express");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

const api = require("./modules/rapid/api");

const app = express();
const port = process.env.PORT || 8888;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.static(path.join(__dirname, "public")));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({
    extended: true
}));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.get("/", (request, response) => {
    response.render("index", { title: "hotels" });
})

let city;

// Access the parse results as request.body
app.post('/', async (request, response) => {
    let hotelsList = await api.getHotels({ city: request.body.city });
    console.log('hotelsList ', hotelsList);
    console.log(request.body.city);
    city = request.body.city;
    // return response.render("index", {
    //     title: "hotels", hotelsList: {
    //         status: true,
    //         message: 'Success',
    //         timestamp: 1678644150999,
    //         data: [
    //             {
    //                 title: '<b>London</b>',
    //                 geoId: '186338',
    //                 documentId: '186338',
    //                 trackingItems: 'geo',
    //                 secondaryText: 'England, United Kingdom'
    //             },
    //             {
    //                 title: '<b>London</b>',
    //                 geoId: '154995',
    //                 documentId: '154995',
    //                 trackingItems: 'geo',
    //                 secondaryText: 'Ontario, Canada'
    //             },
    //             {
    //                 title: '<b>London</b>',
    //                 geoId: '39598',
    //                 documentId: '39598',
    //                 trackingItems: 'geo',
    //                 secondaryText: 'Kentucky, United States'
    //             },
    //             {
    //                 title: '<b>Park Plaza Westminster Bridge London</b>',
    //                 geoId: '1657415',
    //                 documentId: '1657415',
    //                 trackingItems: 'hotel',
    //                 secondaryText: 'London, England',
    //                 image: [Object]
    //             },
    //             {
    //                 title: '<b>Londonderry</b>',
    //                 geoId: '46145',
    //                 documentId: '46145',
    //                 trackingItems: 'geo',
    //                 secondaryText: 'New Hampshire, United States'
    //             },
    //             {
    //                 title: '<b>Londonderry</b>',
    //                 geoId: '57304',
    //                 documentId: '57304',
    //                 trackingItems: 'geo',
    //                 secondaryText: 'Vermont, United States'
    //             },
    //             {
    //                 title: '<b>London</b>',
    //                 geoId: '50567',
    //                 documentId: '50567',
    //                 trackingItems: 'geo',
    //                 secondaryText: 'Ohio, United States'
    //             },
    //             {
    //                 title: '<b>Park Grand London Kensington</b>',
    //                 geoId: '193143',
    //                 documentId: '193143',
    //                 trackingItems: 'hotel',
    //                 secondaryText: 'London, England',
    //                 image: [Object]
    //             },
    //             {
    //                 title: '<b>Travelodge London City hotel</b>',
    //                 geoId: '13569031',
    //                 documentId: '13569031',
    //                 trackingItems: 'hotel',
    //                 secondaryText: 'London, England',
    //                 image: [Object]
    //             },
    //             {
    //                 title: 'Add a missing place',
    //                 geoId: null,
    //                 documentId: null,
    //                 trackingItems: null
    //             }
    //         ]
    //     },
    // });
    return response.render("index", { title: "hotels", hotelsList });
});

app.get("/hotel", async (request, response) => {
    let attractionsList = await api.getAttractions({ city });
    console.log('request.query.name ', JSON.stringify(request.query.name));
    console.log('request.query.location ', JSON.stringify(request.query.location));
    console.log('city ', city);

    response.render("hotel", { title: "hotel", name: request.query.name, location: request.query.location, attractionsList });
    // response.render("hotel", {
    //     title: "hotel", 
    //     name: request.query.name,
    //     location: request.query.location,
    //     attractionsList: {
    //         "type": "FeatureCollection",
    //         "features": [
    //             {
    //                 "type": "Feature",
    //                 "id": "11516950",
    //                 "geometry": {
    //                     "type": "Point",
    //                     "coordinates": [
    //                         38.3667488,
    //                         59.855999
    //                     ]
    //                 },
    //                 "properties": {
    //                     "xid": "W286523296",
    //                     "name": "Svitochnaya Tower",
    //                     "dist": 142.39454047,
    //                     "rate": 7,
    //                     "osm": "way/286523296",
    //                     "wikidata": "Q4410967",
    //                     "kinds": "towers,architecture,fortifications,historic,interesting_places,other_towers,fortified_towers"
    //                 }
    //             },
    //             {
    //                 "type": "Feature",
    //                 "id": "8048285",
    //                 "geometry": {
    //                     "type": "Point",
    //                     "coordinates": [
    //                         38.3664017,
    //                         59.8565636
    //                     ]
    //                 },
    //                 "properties": {
    //                     "xid": "W275383180",
    //                     "name": "Seminary",
    //                     "dist": 153.91477743,
    //                     "rate": 2,
    //                     "osm": "way/275383180",
    //                     "kinds": "architecture,historic_architecture,interesting_places,other_buildings_and_structures"
    //                 }
    //             },
    //             {
    //                 "type": "Feature",
    //                 "id": "4036452",
    //                 "geometry": {
    //                     "type": "Point",
    //                     "coordinates": [
    //                         38.3653984,
    //                         59.8569565
    //                     ]
    //                 },
    //                 "properties": {
    //                     "xid": "N929266037",
    //                     "name": "Водяные ворота",
    //                     "dist": 154.63693413,
    //                     "rate": 1,
    //                     "osm": "node/929266037",
    //                     "kinds": "fortifications,defensive_walls,historic,interesting_places"
    //                 }
    //             },
    //         ]
    //     }
    // });
})

app.get("/contact", async (request, response) => {
    response.render("contact")
})

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
})