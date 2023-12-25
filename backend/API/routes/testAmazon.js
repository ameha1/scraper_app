
const express = require('express')
var router = express.Router();
var cors = require('cors');
const axios = require('axios');
const cheerio = require('cheerio');
const { JSDOM } = require('jsdom');
const { get } = require('config');
const mongoose = require('mongoose');
const Products = require('../mongo-db/index');


router.use(cors({
    origin : "*",
}))

// mongoose.connect('mongodb://localhost:27017/WareHouse')

//     .then(() => console.log('connected to MongoDB'))
//     .catch(() => console.error('Could not connect to MongoDB ... ',err))


product_ids = ['B08PNN2SKF','B09LKXHWCF','B07ZQRN3KR','B0BQCWQBQX','B0BY3G27VJ','B0C1H26C46','B0C8NY7QH8'];

// product_ids = ['B0B728K77Q','B0BV4G3XVN','B0CBLGZFPW']


const getProductUrl = (product_id) => {

    if(product_id == 'B08PNN2SKF'){

    return `https://www.amazon.com/Apple-iPhone-12-Mini-64GB/dp/${product_id}/&keywords=iphone&sprefix=iphone%2Caps%2C353&sr=8-1`;
    // return `https://www.amazon.com/ASUS-IPS-Type-Display-Keyboard-FA706IH-RS53/dp/${product_id}?keywords=laptop&qid=1698218900&sr=8-9&th=1`

    }
    if(product_id == 'B09LKXHWCF'){

    return `https://www.amazon.com/Apple-iPhone-13-Mini-128GB/dp/${product_id}/keywords=iphone+12&qid=1697122059&sr=8-3`;
    // return `https://www.amazon.com/Lenovo-3i-i3-1115G4-Processor-Platinum/dp/${product_id}?keywords=laptop&qid=1698218252&sr=8-4`;
    }
    if(product_id == 'B07ZQRN3KR'){

    return `https://www.amazon.com/Apple-iPhone-Pro-256GB-Silver/dp/${product_id}/keywords=iphone+14&qid=1697323713&sprefix=iphone+14%2Caps%2C534&sr=8-8`;
    // return `https://www.amazon.com/MSI-Modern-i5-1155G7-Processor-Graphics/dp/${product_id}?keywords=laptop&qid=1698219197&sr=8-10`;
    
    }
    if(product_id == 'B0BQCWQBQX'){

    return `https://www.amazon.com/Google-Pixel-7-5G-Android-Phone/dp/${product_id}/?keywords=iphone&pd_rd_r=ddd92929-5887-4df5-ac0e-8919bb6b5936&pd_rd_w=aw4YF&pd_rd_wg=ITgjz&pf_rd_p=01961676-8d6d-4578-9f01-2e7bdc7dd6df&pf_rd_r=QM2TCPHJRYQSBAGGCKGJ&qid=1697324444&sr=8-38`;
   
        }
    if(product_id == 'B0BY3G27VJ'){

    return `https://www.amazon.com/SAMSUNG-A34-Unlocked-Worldwide-T-Mobile/dp/${product_id}/&keywords=samsung&qid=1700802127&sprefix=samsu%2Caps%2C1246&sr=8-3&th=1`;
   
        }
    if(product_id == 'B0C1H26C46'){

    return `https://www.amazon.com/HUAWEI-P60-Pro-MNA-LX9-Unlocked/dp/${product_id}/&keywords=huawei&qid=1700802580&sprefix=huawei%2Caps%2C379&sr=8-3&th=1`
        
    }
    if(product_id == 'B0C8NY7QH8'){
    
    return `https://www.amazon.com/Nokia-Dual-SIM-Factory-Unlocked-Smartphone/dp/${product_id}/&keywords=nokia&qid=1700826202&sprefix=nokia%2Caps%2C383&sr=8-4`

    }
    if(product_id == 'B0BNWPSCGB'){

    return `https://www.amazon.com/OnePlus-Dual-SIM-Smartphone-Hasselblad-Processor/dp/${product_id}/&keywords=tecno+spark+10+pro&qid=1700826448&sprefix=tecno%2Caps%2C341&sr=8-6`

    }
}


async function getPrice(product_id) {

    const productUrl = getProductUrl(product_id);
    
    const { data: html } = await axios.get(productUrl, {
        headers : {

            Accept : 'text/html, */*; q=0.01',
            Host : 'www.amazon.com',
           'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36',
           
            TE : 'trailers',          
           
        },

    });
    

    const dom = new JSDOM(html);
    
    const $ = (selector) => dom.window.document.querySelector(selector);
    
    const title = $('#productTitle').textContent;
    const pinnedElement = $('#corePrice_desktop');
    const pinnedPrice = $('.a-offscreen').textContent;
    const pinnedetail = $('#poExpander');
    const detail = pinnedetail.querySelectorAll('.a-spacing-small');
    const pinnedImg = $('#imgTagWrapperId');
    const imageElements = pinnedImg.querySelectorAll('img');
    const imageSource = Array.from(imageElements).map(img => img.src);
    
    const details = [];
    
    
    detail.forEach(element => {
        
        const detailTitle = element.querySelector('.a-size-base.a-text-bold').textContent;
        const info = element.querySelector('.a-size-base.po-break-word').textContent;
        
        
        details.push(
            
            detailTitle +' - '+ info
            
            );
            

        
    });

    details.shift();

    return {"Title" : title,  "Price" : pinnedPrice, "detail" : details, "Poster" : imageSource[0]}
    
}


async function executeAsyncMultipleTimes() {
    

    const results = [];
    
    Products.deleteMany()
    .then(products=>
            products.deleteMany 
        )
    
    for (const arg of product_ids) {
        
        
        const result = await getPrice(arg);
        // results.push(result);
        const product = new Products({

            Title :result.Title,
            Price :result.Price,
            detail:result.detail,
            Poster:result.Poster

        })

        // module.exports = { product };
        results.push(result);
        
        Products.find()
        .then(products => {
            product.save()
        });
                                            
                        
    }
                    
    

    router.get('/', (req, res) => {
                        
        Products.find()
        
    .then(products => res.json(products))
    .catch(err => res.json(err))

        // res.json(results)
        // res.json([results]);

    });

  }
  
  executeAsyncMultipleTimes();


module.exports = router;