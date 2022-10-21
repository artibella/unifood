import { Slot } from "@uniformdev/canvas-react";
import slugify from "slugify";

export default function Section({ title = '', theme='light', children }) {
  const id = slugify(title);

  return (
    <section data-theme={theme} className="section py-8 lg:py-20" id={id}>
      <div className="container mx-auto max-w-xxl">
        <h2 className="text-4xl text-left mb-16 font-bold text-gray-900">
          {title}
        </h2>
        
        <div className="section-content">
          {children}
        </div>
      </div>
    </section>
  )
}
