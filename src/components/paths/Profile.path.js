import React, { useContext, useState } from "react"
import { useHistory } from "react-router-dom"
import { useMutation } from "@apollo/react-hooks"
import gql from "graphql-tag"
import { Button, Form, Icon, Confirm } from "semantic-ui-react"
import { AuthContext } from "../../context/auth.context.js"

const DELETE_USER = gql`
mutation deleteUser($userId: ID!){
    deleteUser(userId: $userId)
}
`

const EDIT_USER = gql`
mutation editUser($userId:ID!, $username:String!, $email:String!, $password:String!, $confirmPassword:String!){
    editUser(editInput: {userId:$userId, username:$username, email:$email, password:$password, confirmPassword:$confirmPassword }){
        id 
        username
        email     
    }
}
`


export default function Profile() {
    const history = useHistory()
    const [confirmDelete, setConfirmDelete] = useState(false)

    const { user, logout } = useContext(AuthContext)
    const [editView, setEditView] = useState(false)
    const [userdata, setUserData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const [deleteUser] = useMutation(DELETE_USER, {
        update(proxy, result) {
            alert("Account deleted")
            history.push('/')       // push first and then logout else will get error since logout still in profile page
            logout()
        },
        variables: {
            userId: user.id
        }
    })

    const [editUser] = useMutation(EDIT_USER, {
        variables: {
            userId: user.id,
            username: userdata.username,
            email: userdata.email,
            password: userdata.password,
            confirmPassword: userdata.confirmPassword
        },
        update(proxy, result) {
            history.push('/')
            logout()         
        }
    })

    function handleOnSubmit(e) {
        e.preventDefault()
        console.log("submit triggered")
        editUser()
    }

    function handleEditView(e) {
        e.preventDefault()
        setEditView(!editView)
    }

    function handleDeleteAccount(e) {
        e.preventDefault()
        deleteUser()
    }

    function handleOnChange(e){
        e.preventDefault()
        setUserData({
            ...userdata, [e.target.name]: e.target.value
        })
    }

    return (

        <div className="profile"
            style={{
                color: 'white',
            }}
        >
            <h3> {user.username} </h3>
            {editView && (
                <div className="profile-edit">
                    <Form>

                        <Form.Field >
                            <Form.Input placeholder="enter your new username"
                                label="Username"
                                type="text"
                                name="username"
                                value={userdata.username}
                                onChange={handleOnChange}
                            />
                        </Form.Field>
                        <Form.Field >
                            <Form.Input placeholder="enter your new email"
                                label="Email"
                                type="text"
                                name="email"
                                value={userdata.email}
                                onChange={handleOnChange}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Form.Input placeholder="enter your new password"
                                label="Password"
                                type="password"
                                name="password"
                                value={userdata.password}
                                onChange={handleOnChange}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Form.Input placeholder="enter your new password again"
                                label="Confirm Password"
                                type="password"
                                name="confirmPassword"
                                value={userdata.confirmPassword}
                                onChange={handleOnChange}
                            />
                        </Form.Field>

                        <Button
                            color="blue"
                            onClick={handleOnSubmit}
                        ><Icon name="save" style={{ margin: "0" }} />
                            Submit
                        </Button>

                    </Form>
                </div>
            )}

            <Button
                color="teal"
                onClick={handleEditView}
            > <Icon name="edit" style={{ margin: "0" }} /> {editView ? "cancel" : "Edit Account"}
            </Button>

            <Button
                color="red"
                onClick={() => setConfirmDelete(true)}
            >
                <Icon name="user delete" style={{ margin: "0" }} /> Delete Account
            </Button>
            <Confirm
                content="Are you sure you want to proceed?"
                open={confirmDelete}
                onCancel={() => setConfirmDelete(false)}
                onConfirm={handleDeleteAccount}
            />

        </div>

    )
}
