import { Fragment } from "react";
import { LinkIcon, PhoneIcon, CurrencyEuroIcon, BanknotesIcon } from '@heroicons/react/24/outline';

const renderPriceRange = function (priceRange) {
    let priceString = [];
    for (let i = 0; i < priceRange; i++) {
        priceString.push(<CurrencyEuroIcon className="w-6 h-6" />)
    }
    return (
        <div className="restaurant-pricerange flex flex-row gap-2">
            <span className="font-bold" ><BanknotesIcon className="w-6 h6 inline-block" /> Price range:</span>
            <span className="flex flex-row">
                {priceString}
            </span>
            
        </div>
    )
}

const renderOpeningHours = (openingHours) => {
    return (
        <ul className="mt-8">
            {openingHours.map((item) => {
                return (
                    <li key={item.day} className="flex">
                        <span className="mr-8 w-24">{item.day}</span>
                        <span> {item.openingTime} – {item.closingTime}</span>
                    </li>
                )
            })}
        </ul>
    )
}

const renderCuisines = (cuisines) => {
    return (
        <Fragment>
            {cuisines.map((item) => {
                return (
                    <span key={item.label} className="badge badge-primary badge-outline badge-lg inline-block mr-2">{item.label}</span>
                )
            })}
        </Fragment>
    )
}

const renderDiets = (diets) => {
    return (
        <Fragment>
            {diets.map((item) => {
                return (
                    <span key={item.label} className="badge badge-primary badge-outline badge-lg inline-block mr-2">{item.label}</span>
                )
            })}
        </Fragment>
    )
}


export default function RestaurantDetails({ title, openingHours = [], cuisines = [], diets = [], priceRange = '', telephone = '', website = '' }) {

    return (
        <section className="restaurant-details pb-8">
            <div className="container mx-auto max-w-xxl">
                <div className="">
                    <h2 className="text-xl text-left mb-4 font-bold text-gray-900">
                        {title}
                    </h2>
                    <div className="restaurant-meta">
                        {renderPriceRange(priceRange)}
                        
                        <div className="restaurant-contact mt-8 flex gap-6">
                            { website ? (
                            <a href={website} target="_blank" className="flex flex-row hover:underline">
                                <LinkIcon className="w-6 h-6 inline-block mr-2" />
                                <span>Website</span>
                            </a>
                            ) : ''}
                            { telephone ? (
                                <span className="restaurant-phone">
                                    <PhoneIcon className="w-6 h-6 inline-block mr-2" />
                                    <span>{telephone}</span>
                                </span>
                            ) : ''}
                        </div>
                        {renderOpeningHours(openingHours)}
                        <div className="mt-8 flex flex-col">
                            <div>
                                <span className="font-bold inline-block mr-2">Cuisines:</span> {renderCuisines(cuisines)}
                            </div>
                            <div>
                            <span className="font-bold inline-block mr-2">Suitable for diets:</span>  
                                {renderDiets(diets)}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
