import { Slot } from "@uniformdev/canvas-react";

export default function Section({ title, children }) {

  return (
    <section className="section bg-gray">

      <div className="container mx-auto max-w-lg py-8 lg:py-20">
        <h2 className="text-4xl text-center mb-16 font-bold text-gray-900">
          {title}
        </h2>
        
        <div className="section-content">
          {children}
        </div>
      </div>
    </section>
  )
}
