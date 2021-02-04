// single post page with post , like, comments, comment-deletion

import React, { useState, useContext } from 'react'
import gql from "graphql-tag"
import { useMutation, useQuery } from "@apollo/react-hooks"
import moment from "moment"
import { Card, Image, Button, Comment, Form, Header } from 'semantic-ui-react'
import { useHistory } from "react-router-dom"

import { AuthContext } from "../../context/auth.context.js"
import DeleteButton from "../card-parts/Delete.part.js"
import EditButton from "../card-parts/Edit.part.js"


const GETPOST = gql`
query ($postId: ID!){
    getPost(postId: $postId) {
        id
        username
        body
        comments {
            id
            body
            username
            createdAt
        }
        likes {
            id
            createdAt
            username
        }
        countLikes
        countComments
    }
}
`

const POSTCOMMENT = gql`
mutation commentPost(
    $postId: ID!
    $body: String!
) {
    commentPost(postId: $postId, body: $body) {   
        id
        comments {
          id
          body
          username
          createdAt
        }
        countComments
    }
}
`

export default function Post(props) {
    const postId = props.match.params.postId
    const history = useHistory()
    const { user } = useContext(AuthContext)
    const { data, error: post_error } = useQuery(GETPOST, {
        variables: {
            postId
        }
    })
    if (data) {
        var { getPost } = data
    }
    if (post_error) {
        throw new Error(post_error)
    }


    const [commentBody, setCommentBody] = useState('')
    const [MakePost, { loading: comment_loading, error: comment_error }] = useMutation(POSTCOMMENT, {
        update(proxy, result) {
            setCommentBody('')  // reset body field after making the post
        },
        onError(comment_error){
            console.log(comment_error)
        },
        variables: {
            postId: postId,
            body: commentBody
        },
    })

    function handleOnChange(e) {
        e.preventDefault()
        setCommentBody(e.target.value)
    }
    function handleSubmit(e) {
        e.preventDefault()
        user ? MakePost() : history.push('/login')
    }

    if (getPost) {
        var { id, body, createdAt, username, countComments, comments } = getPost
    }

    return (
        <div className="single-post">
            {/* post body with meta data */}
            {getPost &&
                <>
                    <Card fluid style={{ margin: '3%' }}>
                        <Card.Content>
                            <Image floated='right' size='mini'
                                src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
                            />
                            <Card.Header>{username}</Card.Header>
                            <Card.Meta style={{color: "rgba(0,0,0,.4)"}}>{moment(createdAt).fromNow()}</Card.Meta>
                            <Card.Description > {body} </Card.Description>
                        </Card.Content>
                    </Card>

                    {/* form reply */}
                    <Comment.Group>
                        <Header as='h3' dividing style={{color:'white'}}>
                            Comments
                        </Header>
                    </Comment.Group>
                    <Form reply onSubmit={handleSubmit} className={comment_loading ? "loading" : ''}>
                        <Form.TextArea value={commentBody} onChange={handleOnChange} />
                        <Button content='Add Reply' labelPosition='left' icon='edit' primary />
                    </Form>

                    {/* list of comments */}
                    <Comment className="comment">
                        {countComments > 0 && comments.map((comment, index) => {
                            return (
                                <>
                                <Card fluid key={index} style={{ minWidth: "50%" }}>
                                    <Comment.Avatar 
                                        style={{ padding: "5px", }} 
                                        floated='right' 
                                        size='mini' 
                                        src='https://react.semantic-ui.com/images/avatar/small/steve.jpg' 
                                    />
                                    <Comment.Content>
                                        <Comment.Author >{comment.username}</Comment.Author>
                                        <Comment.Metadata>
                                            {moment(comment.createdAt).fromNow()}
                                        </Comment.Metadata>
                                        <Comment.Text>
                                            <p>{comment.body}</p>
                                        </Comment.Text>

                                        {user && user.username === comment.username && (
                                            <>
                                                <DeleteButton 
                                                    post={{id}}
                                                    postOrComment={false}
                                                    commentId={comment.id}
                                                />
                                                <EditButton 
                                                    post={{id}}
                                                    postOrComment={false}
                                                    commentId={comment.id}
                                                />
                                            </>
                                        )}
                                    </Comment.Content>
                                </Card>
                                </>
                            )
                        })}
                    </Comment>
                </>
            }
        </div>
    )
}
