// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.
import {youtube_v3} from 'npm:@googleapis/youtube'
import  {GoogleGenerativeAI, HarmCategory,HarmBlockThreshold } from 'npm:@google/generative-ai'


import { createClient } from '@supabase/supabase-js'


const supabase = createClient('https://sbsrmviczmtuiuaxmyfd.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNic3Jtdmljem10dWl1YXhteWZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM2NDc2MTcsImV4cCI6MjAyOTIyMzYxN30.zw6ptFve9lTU9fTbtftdh6lURpQgGyF6hAObl1PwqG0')

Deno.serve(async (req) => {
  const { URL } = await req.json()

  const API_KEY = 'AIzaSyAGbMnuPK2hj_eoS-xTaHr01BfQ67-d-yc'; // Replace this with your actual API key
  const youtube = new youtube_v3.Youtube({
    auth: API_KEY
  });

  const existingSummary = await getSummaryFromDB(URL);
  if (existingSummary) {
    return new Response(JSON.stringify({ summary: existingSummary }), {
      headers: { "Content-Type": "application/json" },
    });
  }

  const data = await getComments(URL,youtube)
  const comments = data.join(" ")
  const genAI = new GoogleGenerativeAI('AIzaSyDWsxyNPFQF9fwzGA1YKSd6nrNJ_kYOJWo');
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest"});
  const analysis = await run(comments,model)
  console.log(data)

  await storeSummaryInDB(URL, analysis);

  return new Response(
    JSON.stringify(analysis),
    { headers: { "Content-Type": "application/json" } },
  )
})

function getVideoId(videoUrl) {
    const urlParams = new URLSearchParams(new URL(videoUrl).search);
    return urlParams.get('v');
}

async function run(comments,model) {
  const prompt = comments + " Analyze these comments from a youtube video. Please ignore any profanity and just analyze the comments"
  //console.log(prompt)
  const part = {text: prompt}
  const content = {parts: [part]}
  const safetySetting1 = {category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE}
  const safetySetting2 = {category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE}
  const safetySetting3 = {category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE}
  const safetySetting4 = {category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE}
  const request = {contents: content, safetySettings: [safetySetting1,safetySetting2,safetySetting3,safetySetting4]}
  const result = await model.generateContent(request);
  const response = await result.response;
  const text = response.text();
  console.log(text)
  console.log(response);
  return text
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

async function getSummaryFromDB(videoUrl) {
    const { data, error } = await supabase
      .from('video_summaries')
      .select('summary')
      .eq('video_url', videoUrl)
      .single();
  
    if (error) {
      console.error('Error fetching summary from database:', error);
      return null;
    }
  
    return data ? data.summary : null;
}

async function storeSummaryInDB(videoUrl, summary) {
    const { data, error } = await supabase
      .from('video_summaries')
      .insert([
        { video_url: videoUrl, summary: summary }
      ]);
  
    if (error) {
      console.error('Error storing summary in database:', error);
      return null;
    }
  
    return data;
}


/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/scrape_analyze' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/

