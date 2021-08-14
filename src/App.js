import { useCallback, useState } from "react"
import "./styles/App.scss"
import Title from "./components/UI/Title"
import TwoSection from "./components/layouts/TwoSection"
import AvatarSection from "./components/sections/AvatarSection"
import SelectorSection from "./components/sections/SelectorSection"
import Clicker from "./components/UI/Clicker"

function App() {
  const [detail, setDetail] = useState(null)
  const detailData = useCallback(data => {
    setDetail(data)
    setRandom(false)
  }, [])
  const [random, setRandom] = useState(false)
  const randomEvent = useCallback(e => {
    setRandom(true)
  }, [])
  const [download, setDownload] = useState(false)
  const downloadEvent = e => {
    setDownload(true)
    setTimeout(() => {
      setDownload(false)
      console.log("K")
    }, 3000)
  }

  return (
    <div className="App">
      <div className="title">
        <Title size={50} weight="bolder" space={2}>
          ALPACA GENERATOR
        </Title>
      </div>
      <TwoSection>
        <AvatarSection data={detail} downloadEvent={download} />
        <SelectorSection catchDataUP={detailData} trigger={random} />
        <div className="clicker_group function">
          <div onClick={randomEvent}>
            <Clicker>
              <i className="fas fa-random" />
              <span>Random</span>
            </Clicker>
          </div>
          <div onClick={downloadEvent}>
            <Clicker>
              <i className="fas fa-file-download" />
              <span>Download</span>
            </Clicker>
          </div>
        </div>
        <div className="clicker_group">
          <a href="#" className="fab fa-github info"></a>
          <a href="https://wlcharlie.github.io/" className="fas fa-at info"></a>
        </div>
      </TwoSection>
    </div>
  )
}

export default App
