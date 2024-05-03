import type { PlasmoMessaging } from "@plasmohq/messaging"
import { createClient } from '@supabase/supabase-js'

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const {URL} = req.body;

  console.log("at background")
  //const comments = getVideoId(URL)
  const supabase = createClient('https://sbsrmviczmtuiuaxmyfd.supabase.co','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNic3Jtdmljem10dWl1YXhteWZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM2NDc2MTcsImV4cCI6MjAyOTIyMzYxN30.zw6ptFve9lTU9fTbtftdh6lURpQgGyF6hAObl1PwqG0')
  // Usage example (put your video URL here)
  //const comments = getComments(URL,youtube)

  const {data,error} = await supabase.functions.invoke('db-store', {
    body: {
      URL : URL
    },
  })


  res.send({
    data
  })
}

function getVideoId(videoUrl) {
  const urlParams = new URLSearchParams(new URL(videoUrl).search);
  return urlParams.get('v');
}


export default handler