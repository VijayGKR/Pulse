import { useState, useEffect } from 'react'
import styleText from 'data-text:../style.css'
import type { PlasmoCSConfig } from 'plasmo'
import { sendToBackground, sendToContentScript } from '@plasmohq/messaging'
import { useMessage } from '@plasmohq/messaging/hook'


export default function IndexPopup() {
  const [data, setData] = useState("")

  useEffect(() => {
    async function fetchData() {
      console.log("test")
      const resp = await sendToBackground({
        name: 'router',
        body: {
          URL: 'https://www.youtube.com/watch?v=PPCfDe8TfJQ'
        },
      })
      console.log(resp)
    }
    fetchData();
  }, []);

  console.log("hi")
  return (
    <div
      style={{
        padding: 16
      }}>
      <h2>
        Welcome to your{" "}
        <a href="https://www.plasmo.com" target="_blank">
          Plasmo
        </a>{" "}
        Extension!
      </h2>
      <input onChange={(e) => setData(e.target.value)} value={data} />
      <a href="https://docs.plasmo.com" target="_blank">
        View Docs
      </a>
    </div>
  )
}
