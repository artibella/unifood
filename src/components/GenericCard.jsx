import Link from 'next/link'
import { Card } from 'react-daisyui';

export default function GenericCard ({title, image, body, link='#'}) {

    return (
        <Card className='bg-white'>
          <Card.Image
            src={image}
            alt={title}
          />
          <Card.Body>
            <Link href={link}>
                <a className="hover:underline">{title}</a>
            </Link>
            <Card.Title tag="h2">{body}</Card.Title>
            <Card.Actions>
            
            </Card.Actions>
          </Card.Body>
        </Card>
      )
}
