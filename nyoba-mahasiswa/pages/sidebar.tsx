import 'bootstrap/dist/css/bootstrap.min.css';
import SidebarMenu from 'react-bootstrap-sidebar-menu';

export default function CustomSidebarMenu() {
  return (
    <div className="flex">
      <div className="sidebar-menu">
        <SidebarMenu>
          <SidebarMenu.Header>
            <SidebarMenu.Brand>
              <img
                src="path/logo_transparan.png"
                width="45"
                height="35"
                className="d-inline-block align-top"
                alt="Logo"
              />
            </SidebarMenu.Brand>
            <SidebarMenu.Toggle />
          </SidebarMenu.Header>
          <SidebarMenu.Body>
            <SidebarMenu.Nav>
              <SidebarMenu.Nav.Link>
                <SidebarMenu.Nav.Icon>Menu 1</SidebarMenu.Nav.Icon>
                <SidebarMenu.Nav.Title>Menu 2</SidebarMenu.Nav.Title>
              </SidebarMenu.Nav.Link>
            </SidebarMenu.Nav>
            <SidebarMenu.Sub>
              <SidebarMenu.Sub.Toggle>
                <SidebarMenu.Nav.Icon />
                <SidebarMenu.Nav.Title>Menu 3</SidebarMenu.Nav.Title>
              </SidebarMenu.Sub.Toggle>
              <SidebarMenu.Sub.Collapse>
                <SidebarMenu.Nav>
                  <SidebarMenu.Nav.Link>
                    <SidebarMenu.Nav.Icon>Menu 4</SidebarMenu.Nav.Icon>
                    <SidebarMenu.Nav.Title>Menu 5</SidebarMenu.Nav.Title>
                  </SidebarMenu.Nav.Link>
                </SidebarMenu.Nav>
              </SidebarMenu.Sub.Collapse>
            </SidebarMenu.Sub>
          </SidebarMenu.Body>
        </SidebarMenu>
      </div>
    </div>
  );
}
