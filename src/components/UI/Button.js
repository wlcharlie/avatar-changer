import { useState } from "react"
import "../../styles/Button.scss"

const Button = props => {
  const style = {}
  if (props.bg) {
    style.backgroundImage = `url(${props.bg})`
    style.border = "none"
  }

  const click =
    (props.click || [{ detail: "default" }])[0].detail === props.style
      ? "click"
      : ""
  const stayClick = props.stayClick === props.part ? "click" : ""

  return (
    <button
      className={click + stayClick}
      data-part={props.part}
      data-style={props.style}
      style={style}
    >
      {props.children}
    </button>
  )
}

export default Button
