import React, { useState, useEffect, useReducer } from "react"
import { images } from "../../assets/images/alpaca/export"
import "../../styles/SelectorSection.scss"

import Title from "../UI/Title"
import Button from "../UI/Button"

const accessorize = {
  backgrounds: [
    "blue50",
    "blue60",
    "blue70",
    "darkblue30",
    "darkblue50",
    "darkblue70",
    "green50",
    "green60",
    "green70",
    "grey40",
    "grey70",
    "grey80",
    "red50",
    "red60",
    "red70",
    "yellow50",
    "yellow60",
    "yellow70",
  ],
  ears: ["default", "tilt-backward", "tilt-forward"],
  neck: ["default", "bend-backward", "bend-forward", "thick"],
  hair: ["default", "bang", "curls", "elegant", "fancy", "quiff", "short"],
  nose: ["default"],
  mouth: ["default", "astonished", "eating", "laugh", "tongue"],
  eyes: ["default", "angry", "naughty", "panda", "smart", "star"],
  leg: [
    "default",
    "bubble-tea",
    "cookie",
    "game-console",
    "tilt-backward",
    "tilt-forward",
  ],
  accessories: ["default", "earings", "flower", "glasses", "headphone"],
}

const defaultData = [
  { part: "hair", detail: "default" },
  { part: "ears", detail: "default" },
  { part: "eyes", detail: "default" },
  { part: "mouth", detail: "default" },
  { part: "neck", detail: "default" },
  { part: "leg", detail: "default" },
  { part: "accessories", detail: "default" },
]

const upperCase = str => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

const PartButtons = ({ click }) => {
  return Object.keys(accessorize).map(
    e =>
      e !== "nose" && (
        <Button key={e} part={e} stayClick={click}>
          {upperCase(e)}
        </Button>
      )
  )
}

const DetailButtons = ({ data, click }) => {
  if (data === "backgrounds") {
    return accessorize[data].map(e => (
      <Button key={e} part={data} style={e} bg={images.backgrounds[e]} />
    ))
  }
  return accessorize[data].map(
    e =>
      data !== "nose" && (
        <Button
          key={e}
          part={data}
          style={e}
          click={click.filter(k => k.part === data)}
        >
          {upperCase(e)}
        </Button>
      )
  )
}

const setDetail = (state, action) => {
  return DetailButtons(action.part)
}

const SelectorSection = props => {
  const [clickData, setClickData] = useState(defaultData)
  // const [detail, dispatchDetail] = useReducer(
  //   setDetail,
  //   "accessories",
  //   DetailButtons
  // )

  const [detail, setDetail] = useState("accessories")

  const partClick = e => {
    if (e.target.tagName !== "BUTTON") return
    setDetail(e.target.dataset.part)
    // dispatchDetail({ part: e.target.dataset.part })
  }

  const detailClick = e => {
    if (e.target.tagName !== "BUTTON") return
    const data = {
      part: e.target.dataset.part,
      detail: e.target.dataset.style,
    }
    props.catchDataUP(data)
    setClickData(prev => {
      prev.splice(
        prev.findIndex(e => e.part === data.part),
        1
      )
      prev.push(data)
      return prev
    })
  }

  // for random
  useEffect(() => {
    if (!props.trigger) return
    const data = Object.keys(accessorize).map(e => {
      return {
        part: e,
        detail: accessorize[e][~~(Math.random() * accessorize[e].length)],
      }
    })
    props.catchDataUP([{ random: true }, ...data])
    setClickData(data)
  }, [props.trigger])

  return (
    <div>
      <Title size={16} weight="bolder">
        ACCESSORIZE THE ALPACA'S
      </Title>
      <div className="button_group" onClick={partClick}>
        <PartButtons click={detail} />
      </div>
      <Title size={16} weight="bolder">
        STYLE
      </Title>
      <div className="button_group style" onClick={detailClick}>
        {/* {detail} */}
        <DetailButtons data={detail} click={clickData} />
      </div>
    </div>
  )
}

export default SelectorSection
