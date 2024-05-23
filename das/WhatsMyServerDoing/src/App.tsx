
import "./App.css";
import { Window } from '@tauri-apps/api/window';
const appWindow = Window.getCurrent();
import deleteicon from "./assets/delete.png";

function App() {
 



  return (
    <div className="container"><div className="titlebar">
      <div data-tauri-drag-region className="dragarea">WhatsMyServerDoing</div>
 
 
  <div className="new">
    <div className="titlebar-button" >
    <button style={{all:"unset"}} onClick={() => appWindow.minimize()}> <img
      src="https://api.iconify.design/mdi:window-minimize.svg"
      alt="minimize"
    /></button>
   
  </div>
  <div className="titlebar-button">
  <button style={{all:"unset"}} onClick={() => appWindow.maximize()}><img
      src="https://api.iconify.design/mdi:window-maximize.svg"
      alt="maximize"
    /></button>
  </div>
  <div className="titlebar-button" >
  <button style={{all:"unset"}} onClick={() => appWindow.close()}>
    <img src={deleteicon} alt="close" width={20}/>
  </button></div>
</div></div>
</div>
    
  );
}

export default App;
