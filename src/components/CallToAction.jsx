import Link from "next/link";
import { Fragment } from "react";

const renderPrimaryCta = (title, link) => {
  return (
    <div className="rounded-md shadow">
      <Link href={link}>
        <a
          className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 md:py-4 md:px-10 md:text-lg"
        >
          {title}
        </a>
      </Link>
    </div>
  )
}

const renderSecondaryCta = (title, link) => {
  return (
    <div className="mt-3 sm:mt-0 sm:ml-3">
      <Link href={link}>
        <a
          className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-100 px-8 py-3 text-base font-medium text-indigo-700 hover:bg-indigo-200 md:py-4 md:px-10 md:text-lg"
        >
          {title}
        </a>
      </Link>
    </div>
  )
}

export default function CallToAction({ title='', link='', linkPrefix='', component }) {
  const variant = component.variant || 'primary'; 
  const url = linkPrefix + link;
  const linkCta = variant === 'primary' ? renderPrimaryCta(title, url) : renderSecondaryCta(title, url) ;
  
  return (
    <>
      {linkCta}
    </>
  );
}
