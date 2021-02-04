//simple footer component with  a popup
import React from 'react'
import { Menu, Popup, Button } from 'semantic-ui-react'


export default function Footer() {
    return (
        // use footer tag to eliminate the position hurdles when using div
        <footer className="footer">
            <Menu pointing secondary size="massive" color="teal" >
                <Popup
                    content={`This app was built by Jestin Jois following 
                            the MERN stack architecture with graphql and apollo client
                            for api data transactions`}
                    on='click'
                    pinned                   
                    trigger={<Button content='About' secondary/>} 
                />
            </Menu>
        </footer>
    )
}
