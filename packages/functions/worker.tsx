import { renderToString } from "react-dom/server";

function Page() {
  return (
    <html>
      <head>

      </head>
      <body>

      </body>
    </html>
  )
}

export default {
  fetch(request: Request) {
    const html = renderToString(<Page />)
    return new Response(html, {
      headers: {
        'Content-Type': 'text/html'
      }
    })
  }
}
