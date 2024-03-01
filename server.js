import fs from 'node:fs/promises';
import mongoose from 'mongoose';
import cors from 'cors';
import express from 'express';

import userRoute from './routes/user_route.js';
import productRoute from './routes/product_route.js';
import savedItemRoute from './routes/saved_items_route.js';
// import openaiTextComplition from './api/openai/text_complition.js';
// import printfulRoute  from './api/printful_api.js';
// import aliExpressRoute  from './api/ali_express_api.js';
// import aliBabaRoute  from './api/alibaba_api.js';

// Constants
const isProduction = process.env.NODE_ENV === 'production'
const port = process.env.PORT || 3000
const base = process.env.BASE || '/'

// Cached production assets
const templateHtml = isProduction
  ? await fs.readFile('./dist/client/index.html', 'utf-8')
  : ''
const ssrManifest = isProduction
  ? await fs.readFile('./dist/client/.vite/ssr-manifest.json', 'utf-8')
  : undefined

// Create http server
const app = express();

// middleware
app.use(express.json());
//app.use(cors({origin: 'http://localhost:3000'}));

(async () => {
  
  app.use('/api/users', userRoute);

  // user's products
  app.use('/api/products', productRoute);
  
  app.use('/api/saved-items', savedItemRoute);
  
//  app.use('/api/ai', openaiTextComplition);
  
  
  // api integeration
  // app.use('api/ali_express/products', aliExpressRoute);
  // app.use('api/alibaba/products', aliBabaRoute);
  // app.use('api/printful/products', printfulRoute);
  
  //app.use('api/mail', nodeMailer);

})();


// Add Vite or respective production middlewares
let vite
if (!isProduction) {
  const { createServer } = await import('vite')
  vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    base
  })
  app.use(vite.middlewares)
} else {
  const compression = (await import('compression')).default
  const sirv = (await import('sirv')).default
  app.use(compression())
  app.use(base, sirv('./dist/client', { extensions: [] }))
}

// Serve HTML
app.use('*', async (req, res) => {
  try {
    const url = req.originalUrl.replace(base, '')

    let template
    let render
    if (!isProduction) {
      // Always read fresh template in development
      template = await fs.readFile('./index.html', 'utf-8')
      template = await vite.transformIndexHtml(url, template)
      render = (await vite.ssrLoadModule('/src/entry-server.jsx')).render
    } else {
      template = templateHtml
      render = (await import('./dist/server/entry-server.js')).render
    }

    const rendered = await render(url, ssrManifest)

    const html = template
      .replace(`<!--app-head-->`, rendered.head ?? '')
      .replace(`<!--app-html-->`, rendered.html ?? '')

    res.status(200).set({ 'Content-Type': 'text/html' }).send(html)
  } catch (e) {
    vite?.ssrFixStacktrace(e)
    console.log(e.stack)
    res.status(500).end(e.stack)
  }
})

// Start http server
mongoose.connect("mongodb+srv://3mtt:123456a@cluster0.pujkpju.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
 console.log('connected to database')
 app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`)
 })
})
.catch((err) => {
 console.log(err)
}) 
