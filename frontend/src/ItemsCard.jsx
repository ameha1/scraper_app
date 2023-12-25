import React from 'react';


const ItemsCard = ({items}) => {


    return(
        <div className="item">

            <div>
                
                {items.detail.map((dtl,i) => (
                    
                    <p key={i}>{dtl}</p>
                    
                ))}

                {/* <p>{items.detail}</p> */}

                
            </div>

            <div>

                <img src={items.Poster} alt="" />
                

                {/* <img src={item0.Poster !== 'N/A' ? item0.Poster : 'https://via.placeholder.com/400'} alt="" /> */}

            </div>

            <div>
                {/* <span>{item0.Type}</span> */}
                <h4>{items.Title}</h4>
                <h3>{items.Price}</h3>
            </div>

        </div>

    
    )

    
}

export default ItemsCard;
