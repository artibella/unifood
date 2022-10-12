export default function MainNavigation({ component }) {
    return (
        <nav role="nav" className="main-nav">
            <ul>
                {component.slots.items.map((item, index) => (
                    <li key={index}>
                        <a href={item.parameters.url.value}>{item.parameters.title.value}</a>
                    </li>

                ))}
            </ul>
        </nav>
    );
}