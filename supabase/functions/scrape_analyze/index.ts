// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.
import {youtube_v3} from 'npm:@googleapis/youtube'


Deno.serve(async (req) => {
  const { URL } = await req.json()

  const API_KEY = 'AIzaSyAGbMnuPK2hj_eoS-xTaHr01BfQ67-d-yc'; // Replace this with your actual API key
  const youtube = new youtube_v3.Youtube({
    auth: API_KEY
  });

  const data = await getComments(URL,youtube)
  console.log(data)

  return new Response(
    JSON.stringify(data),
    { headers: { "Content-Type": "application/json" } },
  )
})

function getVideoId(videoUrl) {
    const urlParams = new URLSearchParams(new URL(videoUrl).search);
    return urlParams.get('v');
}

async function getComments(videoUrl,youtube) {
    const videoId = getVideoId(videoUrl);
    if (!videoId) {
        console.log("Could not extract video ID.");
        return [];
    }

    const comments = [];
    try {
        let response = await youtube.commentThreads.list({
            part: 'snippet',
            videoId: videoId,
            textFormat: 'plainText',
            maxResults: 100 // API's maximum allowed value
        });

        while (response.data) {
            response.data.items.forEach(item => {
                const comment = item.snippet.topLevelComment.snippet.textDisplay;
                comments.push(comment);
            });

            if (response.data.nextPageToken) {
                response = await youtube.commentThreads.list({
                    part: 'snippet',
                    videoId: videoId,
                    textFormat: 'plainText',
                    pageToken: response.data.nextPageToken,
                    maxResults: 100
                });
            } else {
                break;
            }
        }
    } catch (e) {
        console.error("An error occurred:", e);
    }

    return comments;
}


/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/scrape_analyze' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
