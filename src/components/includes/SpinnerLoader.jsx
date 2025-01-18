import React from 'react'

const SpinnerLoader = ({color="warning"}) => {
  return (
         <div class={`spinner-border text-${color}`} role="status">
         </div>
 
  )
}

export default SpinnerLoader
