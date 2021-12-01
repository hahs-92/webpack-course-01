import Template from './templates/Template.js';
//styles
import './styles/main.css'
//styles with stylus
import './styles/vars.styl'

(async function App() {
  const main = null || document.getElementById('main');
  main.innerHTML = await Template();
})();
