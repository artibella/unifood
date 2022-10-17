export default function GenericHero({ title, body, imageUrl, ctas }) {
    console.log('image', imageUrl);
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img src={imageUrl} className="max-w-sm rounded-lg shadow-2xl" />
                <div>
                    <h2 className="text-5xl font-bold">{title}</h2>
                    <p className="py-6">{body}</p>
                    {/* <div className="flex flex-row">
                        { ctas.forEach(({title, link}) => {
                            <a href={link} className="btn btn-primary">{title || "Read more"}</a>
                            })
                        }
                    </div> */}
                </div>
            </div>
        </div>
    );
}
