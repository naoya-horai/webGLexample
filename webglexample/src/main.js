import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'
import { three_render } from './three_canvas.js'


document.querySelector('#app').innerHTML = `
  <div>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
  </div>
`
three_render();
//setupCounter(document.querySelector('#counter'))
