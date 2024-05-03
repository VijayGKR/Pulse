# Pulse

## Introduction
Ever wanted to quickly grasp the community's reaction to a YouTube video without wading through hundreds or thousands of comments? Pulse is here to revolutionize how we understand audience feedback. This powerful extension leverages the advanced capabilities of Google Gemini 1.5, with its vast 1 million context token window, to deliver comprehensive summaries of YouTube comments. Perfect for both video consumers and content creators, Pulse provides an accurate and nuanced summary, capturing the key sentiments and insights from even the largest comment sections.

## Key Features

### For Content Creators:
- **Enhanced Engagement:** Understand the audience's reaction to fine-tune content strategy and increase viewer engagement.
- **Feedback Aggregation:** Get quick insights into what works and what doesn’t, directly from your viewer base.
- **Trend Detection:** Identify emerging trends and topics in viewer comments to stay ahead of the curve.
- **Community Sentiment Analysis:** Gauge the overall sentiment of the comments to better respond to audience mood and preferences.

### For Subscribers:
- **Time Saving:** Quickly grasp the gist of community discussions without scrolling through thousands of comments.
- **Enhanced Interaction:** Engage more effectively with content by understanding prevalent viewer opinions and questions.
- **Personalized Summaries:** Receive tailored summaries based on the most relevant themes in the comment section.

## How It Works
Pulse efficiently scans all comments on a YouTube video, utilizing the advanced natural language processing capabilities of Google Gemini 1.5. This technology enables Pulse to generate comprehensive summaries that encapsulate the core themes and sentiments of viewer discussions. With this tool, the need for repetitive summarization using small context windows and outdated algorithms is eliminated. Pulse delivers highly accurate, detailed summaries informed by every comment, providing a complete overview of viewer feedback in one go.

## Subscription Model

### Content Creators:
Content creators can subscribe to Pulse to enable comment summaries for their videos, which can be showcased to viewers and used for personal content strategy development. Subscription options include additional features like real-time sentiment updates and detailed analytical reports.

### Subscribers:
Viewers can subscribe to receive advanced comment summaries, enabling a richer interaction with video content. Subscriptions also offer customization options, such as focusing summaries on specific aspects like questions or feedback.


Join the revolution in video comment analysis and never miss the pulse of your audience again!


## Getting Started

This is a [Plasmo extension](https://docs.plasmo.com/) project bootstrapped with [`plasmo init`](https://www.npmjs.com/package/plasmo).

First, run the development server:

```bash
pnpm dev
# or
npm run dev
```

Open your browser and load the appropriate development build. For example, if you are developing for the chrome browser, using manifest v3, use: `build/chrome-mv3-dev`.

You can start editing the popup by modifying `popup.tsx`. It should auto-update as you make changes. To add an options page, simply add a `options.tsx` file to the root of the project, with a react component default exported. Likewise to add a content page, add a `content.ts` file to the root of the project, importing some module and do some logic, then reload the extension on your browser.

For further guidance, [visit our Documentation](https://docs.plasmo.com/)

## Making production build

Run the following:

```bash
pnpm build
# or
npm run build
```

This should create a production bundle for your extension, ready to be zipped and published to the stores.

## Submit to the webstores

The easiest way to deploy your Plasmo extension is to use the built-in [bpp](https://bpp.browser.market) GitHub action. Prior to using this action however, make sure to build your extension and upload the first version to the store to establish the basic credentials. Then, simply follow [this setup instruction](https://docs.plasmo.com/framework/workflows/submit) and you should be on your way for automated submission!
