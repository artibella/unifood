import { Slot } from "@uniformdev/canvas-react";

export default function RestaurantReview({title}) {
  return (
    <div className="container mx-auto px-16">
      <section>
        <h1 className='text-3xl mb-16'>{title}</h1>
        <Slot name="hero" />
      </section>
      <section>
        <div className="my-8">
          <Slot name="authors" />
        </div>
        <Slot name="restaurantDetails" />
      </section>
      <section>
        <Slot name="review" />
      </section>
    </div>
  )
}