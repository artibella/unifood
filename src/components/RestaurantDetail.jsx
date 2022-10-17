export default function RestaurantDetails({ title, openingHours = [], cuisines = [], diets = []  }) {
  
  return (
      <div className="hero min-h-screen bg-base-200">
          <div className="hero-content flex-col lg:flex-row-reverse">
              <img src={imageUrl} className="max-w-sm rounded-lg shadow-2xl" />
              <div>
                  <h2 className="text-5xl font-bold">{title}</h2>
                 
              </div>
          </div>
      </div>
  );
}
