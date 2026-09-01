import './styles.css'
import Logo from '../../assets/LogoSquadFlow.png'
import {
  LuUsers,
  LuChartPie,
  LuFileText,
  LuFolder,
  LuSettings
} from 'react-icons/lu'

export function SideBar() {
  return (
    <>
      <div className="container">
        <div className="header">
          <img src={Logo} alt="" />
        </div>
        <div className="options">
          <button className="option">
            <LuUsers size={22} /> Squads
          </button>
          <button className="option">
            <LuFolder size={22} /> Projects
          </button>
          <button className="option">
            <LuChartPie size={22} /> Allocations
          </button>
          <button className="option">
            <LuFileText size={22} /> Reports
          </button>
          <button className="option">
            <LuSettings size={22} /> Settings
          </button>
        </div>
      </div>
    </>
  )
}
