var express = require('express');
var router = express.Router();
var cors = require('cors');
const cheerio = require('cheerio');
const request = require('request-promise');

router.use(cors({
    origin : "*",
}))

// const API_URL = 'https://www.imdb.com/title/tt15398776/?ref_=hm_top_tt_i_1';
// const API_URL = 'https://www.rainforestapi.com/playground?apikey=C5ACB3A0067547C7AC601C008C8C3CD3'

// const SearchItem = async() => {

//     const response = await fetch(`${API_URL}`);
//     const data = await response.json();
//     console.log(data);

// }

// SearchItem();

// (async () => {
//     const response = await request(API_URL);
//     let $ = cheerio.load(response);
//     let title = $('div[class="title_wrapper"]>h1').text();

// })()

// router.get('/',(req,res)=>{
        
    // res.json([
    //     { "Title" : "Acer", "Year" : "2023", "Price" : "20,000", "Type" : "Laptop", "Poster" : "N/A"},
    // ])
            
//     res.send('working!');
            
// });


module.exports = router;
