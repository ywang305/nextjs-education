This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/zeit/next.js/tree/canary/packages/create-next-app).
## About
This is a tech-probe project, targeting at full-stack development

* live demo: [https://nextjs-education.now.sh](https://nextjs-education.now.sh)

* probes
  ![architecture](https://user-images.githubusercontent.com/24782000/87746532-cf120600-c7be-11ea-923f-683a2064d182.png)

## Getting Started
First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/zeit/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/import?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Mongo-Atlas

```Javascript
`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-1iam7.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
```

## Azure Function + SignalR based message pushing
* create SignalR service, 
  - connection-string is gona be used by serverless Function
  - ![signalR connection_string](https://user-images.githubusercontent.com/24782000/87732683-b3493880-c79b-11ea-9738-0e571c4324f2.png)
* Add SignalR's Connection String in Funciotn's Config Setting
  - Add const
  - ![add connection string to signalR](https://user-images.githubusercontent.com/24782000/87733175-0079da00-c79d-11ea-97ee-d430d1444518.png)
* Add Function "negotiate"( must be this name! )
  - binding input from SignalR, with Hubs and ConnString
  - ![negotiate function](https://user-images.githubusercontent.com/24782000/87733100-cc061e00-c79c-11ea-86bb-ad727be54902.png)
* Add Funtion "message"
  - binding output to SignalR, with coresponding Hubs and ConnString
  - add broadcast code
  - ![function code: message binding to SignalR output](https://user-images.githubusercontent.com/24782000/87733255-4b93ed00-c79d-11ea-8fa3-065243056bc3.png)
  - ![function message , add signalr output](https://user-images.githubusercontent.com/24782000/87734214-fc9b8700-c79f-11ea-858d-54014287c8ad.png)
* Allow Azure Function to CORS from Vercel
  - ![add cors for function](https://user-images.githubusercontent.com/24782000/87734386-7e8bb000-c7a0-11ea-9cc7-92bf71c845c0.png)
