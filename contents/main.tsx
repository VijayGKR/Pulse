import { useState, useEffect } from 'react'
import styleText from 'data-text:../style.css'
import type { PlasmoCSConfig } from 'plasmo'
import { sendToBackground, sendToContentScript } from '@plasmohq/messaging'
import { useMessage } from '@plasmohq/messaging/hook'
import { parse } from 'node:path/win32'

export const config: PlasmoCSConfig = {
  matches:["*://*.youtube.com/*"]
}

function Main(){

    console.log('Current URL:', window.location.href);
    useEffect(() => {
      async function fetchData() {
        console.log("test")
        const resp = await sendToBackground({
          name: 'router',
          body: {
            URL: window.location.href
          },
        })
        console.log(resp)
      }
      fetchData();
    }, []);
    console.log("hello")

    return null

}

export default Main
