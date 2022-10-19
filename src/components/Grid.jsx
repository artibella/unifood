import classNames from "classnames";

export default function Grid({ columns = 3, children }) {
  const gridClasses = classNames(
    'grid-content', 'lg:grid', 
    {[`grid-cols-${columns}`] : true}
  );

  return (
    <div className='grid-container'>
      <div className={gridClasses}>
        {children}
      </div>
    </div>
  )
}
