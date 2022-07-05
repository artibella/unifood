export default function MainNavigation({component}) {
    return (
      <nav role="nav" className="main-nav">
        <ul>
          {component.slots.items.map((item, index) => (
            <li>
              <a href={item.parameters.url.value} key="`${item.parameters.url}`-index">{item.parameters.title.value}</a>
            </li>
          
          ))}
        </ul>
      </nav>
    );
  }