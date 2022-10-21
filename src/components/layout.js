// components/layout.js

import Navbar from './Navbar'
import Sitefooter from './Sitefooter'

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Sitefooter />
    </>
  )
}