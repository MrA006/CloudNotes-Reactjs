
const Alert = (props) => {
  return (
    props.alert && (
      <div style={{height:"3rem", border:"2px solid red"}}>
        <div className={`alert alert-${props.alert.type}`} role="alert">
          <strong>{props.alert.type === 'danger' ? 'Error' : 'Success'} : </strong>{props.alert.msg}
        </div>
      </div>
    )
  )
}

export default Alert