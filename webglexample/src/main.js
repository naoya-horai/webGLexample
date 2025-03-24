import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'
import { three_render } from './three_canvas.js'


document.querySelector('#app').innerHTML = `
  <div class="ui-container">
    <!-- ドロップダウンメニュー -->
    <select id="dropdown">
      <option value="option1">オプション 1</option>
      <option value="option2">オプション 2</option>
      <option value="option3">オプション 3</option>
    </select>
    <br><br>
    <!-- ボタン -->
    <button id="myButton">クリック</button>
  </div>
`
three_render();
//setupCounter(document.querySelector('#counter'))
