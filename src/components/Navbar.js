import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Icon } from 'semantic-ui-react'
import { AuthContext } from "../context/auth.context"


export default function Navbar() {
    const context = useContext(AuthContext)
    const pathname = window.location.pathname
    const path = pathname === '/' ? 'home' : pathname.substr(1)
    const [activeItem, setActiveItem] = React.useState(path)

    function handleClick(e, { name }) {
        setActiveItem(name)
    }

    //render the home page as is, render the profile : login and the logout: register if logged in
    return (
        <div className="navbar">
            <Menu pointing secondary size="massive" color="teal">
                <Menu.Item
                    name="home"
                    onClick={handleClick}
                    active={activeItem === 'home'}
                    as={Link}
                    to="/"
                    style={{color:'white', }}
                > <Icon name="home" style={{ margin: "auto", padding:"0"}} />
                        Home
                </Menu.Item>
                <Menu.Menu position="right">
                    {context.user ? (
                        <>
                            <Menu.Item
                                name={context.user.username}
                                onClick={handleClick}
                                active={activeItem === 'profile'}
                                as={Link}
                                to="/profile"
                                style={{color:'white', }}
                            > <Icon name="user circle" style={{ margin: "auto", padding:"0"}} /> {context.user.username}
                            </Menu.Item>

                            <Menu.Item
                                name="logout"
                                onClick={context.logout}
                                active={activeItem === 'logout'}
                                as={Link}
                                to="/login"
                                style={{color:'white', }}
                            > <Icon name="log out" style={{ margin: "auto", padding:"0"}} /> Logout
                            </Menu.Item>
                        </>
                    ): (
                        <>
                            <Menu.Item
                                name="login"
                                onClick={handleClick}
                                active={activeItem === 'login'}
                                as={Link}
                                to="/login"
                                style={{color:'white', }}
                            > <Icon name="sign in" style={{ margin: "auto", padding:"0"}} /> Login
                            </Menu.Item>

                            <Menu.Item
                                name="register"
                                onClick={handleClick}
                                active={activeItem === 'register'}
                                as={Link}
                                to="/register"
                                style={{color:'white', }}
                            > <Icon name="signup" style={{ margin: "auto", padding:"0"}} /> Register
                            </Menu.Item>
                        </>
                    )}
                </Menu.Menu>
            </Menu>
        </div>
    )
}
