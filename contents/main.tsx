import { useState, useEffect } from 'react';
import { sendToBackground } from '@plasmohq/messaging';
import { useMessage } from "@plasmohq/messaging/hook";

export const config = {
  matches:["*://*.youtube.com/*"]
};

function Main() {
    const [fetching, setFetching] = useState(false);

    useMessage<string, any>(async (req, res) => {
      if (req.name === "main") {
        const url = window.location.href;

        // Start fetching data and set fetching state to true
        if (!fetching) {
          setFetching(true);
          fetchData(url).then(data => {
            // After fetching data, send the data and reset fetching state
            console.log('Fetched data:', data);
            res.send(data);

            setFetching(false);
          }).catch(error => {
            console.error('Failed to fetch data:', error);
            res.send(null);  // Send null if fetching fails
            setFetching(false);
          });
        }

        // Send null while data is being fetched
        if (fetching) {
          console.log('Sending null as data is still fetching...');
          res.send(null);
        }
      }
    });

    async function fetchData(url) {
      console.log("Fetching data for URL:", url);
      const resp = await sendToBackground({
        name: 'router',
        body: {
          URL: url
        },
      });
      console.log(resp);
      return resp; // Assuming resp.data.summary is the required response
    }

    return null;
}

export default Main;