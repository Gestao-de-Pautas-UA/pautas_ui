import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Overview from '../../pages/overview/Overview';

const Sidebar = () => {
  return (
    <div style={{ display: 'flex', height: '89vh', overflow: 'scroll initial' }}>
      <CDBSidebar textColor="#fff" backgroundColor="#333">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          {/* <a href="" className="text-decoration-none" style={{ color: 'inherit' }}>
            
          </a> */}

        {/* <Link to="/Overview">Ir para outra página</Link> */}
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>

            <NavLink exact to="/Overview" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="table">Gestão de Pautas</CDBSidebarMenuItem>
            </NavLink>

          </CDBSidebarMenu>
        </CDBSidebarContent>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;