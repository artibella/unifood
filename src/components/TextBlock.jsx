import slugify from "slugify";

export default function TextBlock({ title = '', body='' }) {
  const id = slugify(title);

  return (
    <article className="text-block my-8 lg:my-20" id={id}>
      <div className="container mx-auto max-w-xxl">
        {title ? (
        <h3 className="text-3xl text-left mb-8 font-bold text-gray-900">
          {title}
        </h3>
        ) : ''}
        <div className="prose lg:prose-xl"
            dangerouslySetInnerHTML={{__html: body}}
        />  
      </div>
    </article>
  )
}
