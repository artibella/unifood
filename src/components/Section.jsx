import { Slot } from "@uniformdev/canvas-react";
import classNames from "classnames";
import slugify from "slugify";

export default function Section({ title = '', theme = 'light', children }) {
  const id = slugify(title);
  const sectionClasses = classNames(
    'section', 'py-8', 'lg:py-16',
    { ['bg-black']: theme === 'dark' },
    { 'bg-mango-400': theme === 'spring' },
    { 'bg-ice-100': theme === 'light' },
  );

  const headingClasses = classNames(
    'text-4xl', 'text-left', 'mb-16', 'font-bold',
    { 'text-white': theme === 'dark' },
    { 'text-gray-900': theme !== 'dark' },
  );


  return (
    <section data-theme={theme} className={sectionClasses} id={id}>
      <div className="container mx-auto">
        <div className="px-4 md:px-8">
          <h2 className={headingClasses}>
            {title}
          </h2>
          <div className="section-content">
            {children}
          </div>
        </div>
      </div>
    </section>
  )
}
