import React, { useContext, } from "react"
import { Card, Image } from 'semantic-ui-react'
import { Link } from "react-router-dom"
import moment from "moment"

import LikeButton from "./card-parts/Like.part.js"
import EditButton from "./card-parts/Edit.part.js"
import CommentButton from "./card-parts/Comment.part.js"
import DeleteButton from "./card-parts/Delete.part.js"
import { AuthContext } from "../context/auth.context.js"


function PostCard({ post: { id, body, username, likes, comments, createdAt, countLikes, countComments } }) {
    const { user } = useContext(AuthContext)

    return (
        <div className="postcard" >
            <Card fluid style={{ margin: '3%' }} >
                {/* post body */}
                <Card.Content>
                    <Image floated='right' size='mini'
                        src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
                    />
                    <Card.Header>{username}</Card.Header>
                    <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                    <Card.Description as={Link} to={`/posts/${id}`}>
                        {body}
                    </Card.Description>
                </Card.Content>
                    

                {/* LikeButton and CommentButton*/}
                <Card.Content className="card-extra" >
                    <LikeButton
                        user={user}
                        post={{ id, likes, countLikes }}
                    />
                    <CommentButton
                        user={user}
                        post={{ id, countComments }}
                    />

                    {user && user.username === username && (
                        <div>
                            <EditButton 
                                post={{id}}
                                postOrComment={true}
                            />

                            <DeleteButton
                                postOrComment={true}
                                post={{ id }}
                            />

                        </div>
                    )}
                </Card.Content>
            </Card>
        </div>
    )
}

export default PostCard