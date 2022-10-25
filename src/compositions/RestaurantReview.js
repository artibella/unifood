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
      </section>
      <section className="grid grid-cols-3 gap-4">
        <div className="review col-span-2">
          <Slot name="review" />
        </div>
        <aside className="restaurant">
          <Slot name="restaurantDetails" />
        </aside>
      </section>
    </div>
  )
}