import React from 'react'
import { Link } from 'react-router-dom'
import RoutingService from '../services/RoutingService'
import { Settings, Plus } from 'react-feather'

export const Navbar: React.FC = () => {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <Link className="navbar-brand" to={RoutingService.list()}>Sjungis.se</Link>
      <div className="navbar-nav flex-row">
        <Link to={RoutingService.newSong()} className="mr-3">
          <Plus></Plus>
        </Link>
        <Link to={RoutingService.settings()}>
          <Settings></Settings>
        </Link>
      </div>
    </nav>
  )
}
