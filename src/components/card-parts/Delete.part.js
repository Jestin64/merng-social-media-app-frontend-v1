// used in PostCard component

import { useMutation } from "@apollo/react-hooks"
import React, { useState } from "react"
import { Button, Icon, Confirm } from "semantic-ui-react"
import gql from "graphql-tag"


const DELETE_POST = gql`
mutation deletePost($postId: ID!){
    deletePost(postId: $postId)
}
`
const DELETE_COMMENT = gql`
mutation deleteComment($postId: ID!, $commentId: ID!){
    deleteComment(postId: $postId, commentId: $commentId) {
        id
        body
        username
        createdAt
        countLikes
        countComments
        likes { id createdAt username }
        comments { id createdAt username body }
    }
}
`

function DeleteButton({post: {id}, postOrComment, commentId='default_placeholder'}) {
    const [confirmDelete, setConfirmDelete] = useState(false)
    //delete post part
    const [deletePost] = useMutation(DELETE_POST,{
        update(proxy, result){
            window.location.reload()
        },
        onError(err){
            throw new Error(err)
        },
        variables:{
            postId: id
        }
    })
    function HandleDeletePost(e) {
        e.preventDefault()
        deletePost() 
    }

    // delete comment part
    const [deleteComment] = useMutation(DELETE_COMMENT,{
        update(proxy, result){
            setConfirmDelete(false)
        },
        onError(err){
            throw new Error(err)
        },
        variables:{
            postId: id,
            commentId: commentId
        }
    })
    function HandleDeleteComment(e){
        e.preventDefault()
        deleteComment() 
    }


    return (
        <div>
            <Button
                color="red"
                floated="left"
                onClick={()=>setConfirmDelete(true)}
                style={{marginTop: '5px'}}
            >
                <Icon name="trash" style={{ margin: "0" }} />
            </Button>
            <Confirm 
                open = {confirmDelete}
                onCancel= {()=>setConfirmDelete(false)}
                onConfirm= {postOrComment ? HandleDeletePost: HandleDeleteComment}
            />
        </div>
    )
}

export default DeleteButton
