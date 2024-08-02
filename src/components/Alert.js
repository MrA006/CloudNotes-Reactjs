import React from 'react'

const Alert = (props) => {
  return (
    <div style={{height:"3rem"}}>
      {props.alert && <div className={`alert alert-${props.alert.type}`} role="alert">
        <strong>{props.alert.type==='danger'?'error':'success'} : </strong>{props.alert.msg}
       </div>}
    </div>
  )
}

export default Alert
