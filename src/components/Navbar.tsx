import React from 'react'
import { Link } from 'react-router-dom'
import RoutingService from '../services/RoutingService'

const iconSize: React.CSSProperties = {
  width: '25px',
  height: '25px',
}

export const Navbar: React.FC = () => {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <Link className="navbar-brand" to={RoutingService.list()}>Sjungis.se</Link>
      <div className="navbar-nav flex-row">
        <Link to={RoutingService.newSong()} className="mr-3">
          <img style={iconSize} src={process.env.PUBLIC_URL + '/plus.svg'} alt="Add song"></img>
        </Link>
        <Link to={RoutingService.settings()}>
          <img style={iconSize} src={process.env.PUBLIC_URL + '/gear.svg'} alt="Edit settings"></img>
        </Link>
      </div>
    </nav>
  )
}
