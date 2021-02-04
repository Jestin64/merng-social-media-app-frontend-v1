import React, { useState } from 'react'
import gql from "graphql-tag"
import { Form, Button, Icon } from 'semantic-ui-react'
import { useMutation } from "@apollo/react-hooks"


const POST = gql`
mutation createPost(
    $body: String!
) {
    createPost(body: $body) {   
        id
        body
        username
        createdAt
    }
}
`

export default function PostForm() {
    const [body, setBody] = useState('')

    const [MakePost, { loading, error }] = useMutation(POST, {
        update(proxy, result) {
            setBody('')  // reset body field after making the post
            window.location.reload()
        },
        onError(error){
            console.log(error)
        },
        variables: {
            body: body
        },
    })


    function handleOnChange(e) {
        e.preventDefault()
        setBody(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        MakePost()
    }


    return (
        <>
            <Form onSubmit={handleSubmit} className={loading ? 'loading' : ''}>
                <Form.Field >
                    <Form.Input placeholder="make a new post here"
                        name="body"
                        type="text"
                        value={body}
                        onChange={handleOnChange}
                        error={ error ? {
                            content: error.graphQLErrors[0].message==='Authorization header must be provided'
                            ? 'Please Login first': error.graphQLErrors[0].message
                            ,
                            pointing: 'below',
                          }: false }
                    />
                </Form.Field>
                <Button type="submit" color="teal">
                    <Icon name="paper plane" />Post
                </Button>
            </Form>
        </>
    )
}
