const Title = props => {
  return (
    <p
      style={{
        fontSize: props.size,
        fontWeight: props.weight || "regular",
        letterSpacing: props.space || 0,
        marginBottom: props.size / 1.2,
      }}
    >
      {props.children}
    </p>
  )
}

export default Title
