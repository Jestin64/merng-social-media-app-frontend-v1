import React,{ lazy, Suspense} from "react"
import 'semantic-ui-css/semantic.min.css'
import { Container, Loader } from 'semantic-ui-react'
import {BrowserRouter, Route, Switch} from "react-router-dom"

import './App.css'
import Navbar from "./components/Navbar.js"
import Footer from "./components/Footer.js"
import Post from "./components/paths/Post.path.js"
import {AuthProvider} from "./context/auth.context.js"
import AuthRoute from "./components/util/AuthRoute.js"


export default function App() {
    const Home = lazy(() => import("./components/paths/Home.path.js"))
    const Login = lazy(() => import("./components/paths/Login.path.js"))
    const Register = lazy(() => import("./components/paths/Register.path.js"))
    const Profile = lazy(() => import("./components/paths/Profile.path.js"))

    return(
        <div className="app">
            <AuthProvider > 
                <Container >
                    <BrowserRouter>
                    <Suspense fallback={<Loader content='Loading' />} >
                        <Navbar />
                        <Switch >
                            <Route exact path="/" component={Home} />
                            <AuthRoute exact path="/login" component={Login} />
                            <AuthRoute exact path="/register" component={Register} />
                            <Route exact path="/profile/" component={Profile} />
                            <Route exact path="/posts/:postId" component={Post} /> 
                            <Route path="*" component={()=><h1>404 error, page not found</h1>} />
                        </Switch> 
                        <Footer /> 
                    </Suspense>
                    </BrowserRouter>
                </Container>
            </AuthProvider>
        </div>
    )
}