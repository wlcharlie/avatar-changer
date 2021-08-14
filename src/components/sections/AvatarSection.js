import { useEffect, useState } from "react"
import { images } from "../../assets/images/alpaca/export"
import mergeImages from "merge-images"
import "../../styles/AvatarSection.scss"

const AvatarSection = props => {
  const [details, setDetails] = useState({
    backgrounds: images.backgrounds.blue50,
    ears: images.ears.default,
    neck: images.neck.default,
    nose: images.nose,
    mouth: images.mouth.default,
    hair: images.hair.default,
    eyes: images.eyes.default,
    leg: images.leg.default,
    accessories: images.accessories.default || "",
  })

  useEffect(() => {
    if (!props.data) return
    if (props.data[0] || false) {
      const random = {}
      props.data.splice(0, 1)
      for (const e of props.data) {
        random[e.part] = images[e.part][e.detail]
        random["nose"] = images.nose
      }
      return setDetails(random)
    }

    setDetails(prev => {
      return {
        ...prev,
        [props.data.part]: images[props.data.part][props.data.detail],
      }
    })
  }, [props.data])

  useEffect(async () => {
    if (props.downloadEvent) {
      const data = []
      for (const key in details) {
        if (!details[key]) continue
        data.push(details[key])
      }
      const img = await mergeImages(data)
      const a = document.createElement("a") //Create <a>
      a.href = img //Image Base64 Goes here
      a.download = "Image.png" //File name Here
      a.click() //Downloaded file
    }
  })

  return (
    <div className="avatar">
      <img src={details.backgrounds} alt="backgrounds" />
      <img src={details.ears} alt="ears" />
      <img src={details.neck} alt="neck" />
      <img src={details.nose} alt="nose" />
      <img src={details.mouth} alt="mouth" />
      <img src={details.hair} alt="hair" />
      <img src={details.eyes} alt="eyes" />
      {details.leg && <img src={details.leg} alt="leg" />}
      {details.accessories && (
        <img src={details.accessories} alt="accessories" />
      )}
    </div>
  )
}

export default AvatarSection
