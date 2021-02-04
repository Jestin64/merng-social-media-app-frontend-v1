import React from 'react'
import { Button, Form, Card, Icon } from 'semantic-ui-react'
import { useHistory } from "react-router-dom"
import gql from 'graphql-tag'
import {useMutation} from "@apollo/react-hooks"


const REGISTER_USER = gql`
mutation RegisterUser(  
    $username : String!
    $email: String!
    $password: String!
    $confirmPassword: String!
) {
    registerUser(
        registerInput: {
            username: $username
            email: $email
            password: $password
            confirmPassword: $confirmPassword
        }
    ) {
        id
        email
        username
        token
        createdAt
    }
}
`

function Register() {
    const history = useHistory()
    const [values, setValues] = React.useState({
        username:'',
        email: '',
        password:'',
        confirmPassword: ''
    })

    const [errors, setErrors] = React.useState({})

    const [addUser, {loading}] = useMutation(REGISTER_USER,{
        update(proxy, result){
            history.push('/login')
        },
        onError(err){
            setErrors(err.graphQLErrors[0].extensions.exception.errors)
        },
        variables: {
            username: values.username,
            email: values.email,
            password: values.password,
            confirmPassword: values.confirmPassword
        }
    })

    const handleOnChange =(e)=>{    
        e.preventDefault()
        setValues({
            ...values, [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        addUser()
    }

    return (
        <div className="register">
            <div className="ui center aligned column grid" >
                <Card className="card-register">
                    <Card.Header className="card-register-header">
                        Register
                    </Card.Header>
                    <Card.Content>
                        <Form onSubmit={handleSubmit}  className={loading?'loading': ''}>
                            <Form.Field >
                                <Form.Input placeholder="enter your username" 
                                    label="Username"
                                    type="text"
                                    error={errors.username? true:false}
                                    name="username"
                                    value={values.username}
                                    onChange={handleOnChange}
                                />
                            </Form.Field>
                            
                            <Form.Field>                           
                                <Form.Input placeholder="enter your email" 
                                    label="Email"
                                    type="text"
                                    error = {errors.email?true:false}
                                    name="email"
                                    value={values.email}
                                    onChange={handleOnChange}
                                />
                            </Form.Field>
                            
                            <Form.Field>
                                <Form.Input placeholder="enter your password" 
                                    label="Password"
                                    type="password"
                                    error = {errors.password? true:false}
                                    name="password"
                                    value={values.password}
                                    onChange={handleOnChange}
                                />
                            </Form.Field>

                            <Form.Field>
                                <Form.Input placeholder="enter your password again" 
                                    label="Confirm Password"
                                    type="password"
                                    error = {errors.confirmPassword? true:false}
                                    name="confirmPassword"
                                    value={values.confirmPassword}
                                    onChange={handleOnChange}
                                />
                            </Form.Field>

                            <Button type="submit"> 
                                <Icon name="save" style={{ margin: "auto", padding:"0"}} /> Register
                            </Button>
                        </Form>

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
                    </Card.Content>
                </Card>
            </div>
        </div>
    )
}

export default Register