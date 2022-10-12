export default function ContributerList({byline, contributers}) {

    const avatars = contributers.map(({name, image, link}, index) => (
        <img
          className="inline-block h-10 w-10 rounded-full ring-2 ring-white overflow-hidden"
          src={image}
          alt={name} key={index.toString()}
        />
        )
    );

    const nameWithLinks = contributers.map(({name, link}, index) => {
        let nameLink = <span className="font-bold">{name}</span>;
        if(link) {
            nameLink = (
                <a href={link} className="hover:underline" key={`contributer-${index}`}>{nameLink}</a>
            )
        }
        return nameLink;
    })

    const names = nameWithLinks.reduce(
        (prev, curr, index, items) => {
          const isLast = index >=  items.length - 1;
          return isLast ? [prev, ' & '  ,curr] : [prev, ', ' ,curr] 
        }
    );

    const avatarSpacing = contributers.length > 1 ? '-space-x-2' : '';

    return (
      <div className="flex gap-x-5 items-center">
        <div className="avatars">
            <div className={`flex ${avatarSpacing}`}>
                {avatars}
            </div>
        </div>
        <div className="contributers">
            <span className="text-base">{byline}</span>
            <div className="contributer-names">{names}</div>
        </div>
      </div>
    )
  }
  