import { Fragment } from "react";

const renderPrice = function (priceRange) {
    let priceString = '';
    for (let i = 0; i < priceRange; i++) {
        priceString += '€'
    }
    return (
        <span>
            {priceString}
        </span>
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


export default function RestaurantDetails({ title, openingHours = [], cuisines = [], diets = [], priceRange = '', telephone = '' }) {

    return (
        <section className="restaurant-details py-8">
            <div className="container mx-auto max-w-xxl">
                <div className="">
                    <h2 className="text-xl text-left mb-4 font-bold text-gray-900">
                        {title}
                    </h2>
                    <div className="restaurant-meta">
                        {renderPrice(priceRange)}
                        {renderOpeningHours(openingHours)}
                        <div className="mt-8 flex flex-row">
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
