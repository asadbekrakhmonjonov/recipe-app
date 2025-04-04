import logo from '../images/—Pngtree—cute little boy chef holding_19783105.png'
import './Header.css'

export default function Header() {
  return (
    <main>
      <div className="headerContainer">
        <div className="headerPicture">
          <img src={logo} alt="cheff logo"/>
        </div>
        <div className="appTitle">
          <h1>AI Recipe Generator</h1>
        </div>
      </div>
    </main>
  )
}