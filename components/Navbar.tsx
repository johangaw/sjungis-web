import React from "react";
import Link from "next/link";
import RoutingService from "../services/RoutingService";

const iconSize: React.CSSProperties = {
  width: "25px",
  height: "25px",
};

export const Navbar: React.FC = () => {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <Link href={RoutingService.list()}>
        <a className="navbar-brand">Sjungis.se</a>
      </Link>
      <div className="navbar-nav flex-row">
        <div className="mr-3">
          <Link href={RoutingService.newSong()}>
            <img style={iconSize} src="/plus.svg" alt="Add song"></img>
          </Link>
        </div>
        <Link href={RoutingService.settings()}>
          <img style={iconSize} src="/gear.svg" alt="Edit settings"></img>
        </Link>
      </div>
    </nav>
  );
};
