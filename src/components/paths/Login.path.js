import React, {useContext, useState} from 'react'
import { Button, Form, Card, Icon} from 'semantic-ui-react'
import { Link, useHistory } from "react-router-dom"
import {AuthContext} from "../../context/auth.context"
import {useMutation} from "@apollo/react-hooks"
import gql from "graphql-tag"


const LOGIN_USER = gql`
mutation LoginUser(
    $username: String!
    $password: String!
) {
    login(username: $username, password: $password){
        id
        email
        username
        token 
        createdAt
    }
}
`

function Login() {
    const context = useContext(AuthContext)
    const history = useHistory()
    const [values, setValues] = useState({
        username:'',
        password:''
    })

    const [errors ,setErrors] = useState({})
    const [loginUser, {loading}] = useMutation(LOGIN_USER, {
        update(proxy, result){
            context.login(result.data.login) 
            history.push('/')
        },  
        onError(err){
            setErrors(err.graphQLErrors[0].extensions.exception.errors)
        },
        variables: {
            username: values.username,
            password: values.password
        }
    })

    const handleOnChange =(e)=>{
        e.preventDefault()
        setValues({
            ...values, [e.target.name]: e.target.value
        })
    }

    const handleSubmit =(e)=>{
        e.preventDefault()
        loginUser()
    }

    return (
        <div className="login">
            <div className="ui center aligned column grid" >
                <Card className="card-login">
                    <Card.Header className="card-login-header">Login</Card.Header>
                    <Card.Content>
                        <Form onSubmit={handleSubmit} className={loading ? 'loading': ''}>
                            <Form.Field >                           
                                <Form.Input placeholder="enter your username" 
                                    label="Username"
                                    name="username"
                                    type="text"                                             
                                    value={values.username}
                                    error={errors.username? true:false}
                                    onChange={handleOnChange}
                                />
                            </Form.Field>
                            <Form.Field >
                                <Form.Input placeholder="enter your password"
                                    label="Password"
                                    name="password"
                                    type="password"  
                                    error={errors.password? true:false}          
                                    value={values.password}
                                    onChange={handleOnChange}
                                />
                            </Form.Field>

                            <Button type="submit"> 
                                <Icon name="sign in" style={{ margin: "auto", padding:"0"}} /> Sign In
                            </Button>

                        </Form>

                    </Card.Content>

                    <Card.Description className="card-description" 
                        as={Link}
                        to = '/register'
                    > <Icon name="help"/>
                        no account? register here
                    </Card.Description>

                    {
                            Object.keys(errors).length > 0 && (
                                <div className="ui error message">
                                    <ul className="list">
                                        {
                                            Object.values(errors).map(e_val=>{
                                                return(
                                                    <li key={e_val}>{e_val}</li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                            )                  
                        }
                </Card>
            </div>
        </div>
    )
}

export default Login