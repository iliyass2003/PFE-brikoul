import React from 'react'
import '../style/NotFound.css'

const NotFound = () => {
  return (
    <div className='notfound'>
      <i class="fa-solid fa-robot fa-shake"></i>
      <span className='n404'>404</span>
      <span className='non'>Page non trouvée</span>
    </div>
  )
}

export default NotFound