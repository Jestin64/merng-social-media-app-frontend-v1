import React,{useState} from "react"
import { useMutation } from "@apollo/react-hooks"
import { Button, Confirm, Input } from 'semantic-ui-react'
import gql from "graphql-tag"

const EDIT_POST = gql`
mutation editPost($postId: ID!, $body: String!){
    editPost(postId: $postId, body: $body){
        id
        body
        username
    }
}
`
const EDIT_COMMENT = gql`
mutation editComment($postId:ID!, $commentId: ID!, $body: String!){
    editComment(postId: $postId, commentId: $commentId, body: $body){
        id
        username
        comments{
            id 
            body
            username
        }
    }
}
`


export default function EditButton({post: {id}, postOrComment, commentId='default_placeholder'}){

    const [open, setOpen] = useState(false)
    const [body, setBody] = useState('')
    const [editPost, {loading: postloading, error: posterror}] = useMutation(EDIT_POST, {
        variables:{
            postId: id,
            body: body
        },
        onError(posterror){
            console.log(posterror)
        },
    })

    const [editComment, {loading: commentloading, error: commenterror}] = useMutation(EDIT_COMMENT, {
        variables:{
            postId: id,
            commentId: commentId,
            body: body
        },
        onError(commenterror){
            console.log(commenterror)
        },
    })


    function handleOnChange(e) {
        e.preventDefault()
        setBody(e.target.value)
    }

    function handlePostEditClick(e){
        e.preventDefault()
        editPost()
        setOpen(false)
    }
    function handleCommentEditClick(e){
        e.preventDefault()
        editComment()
        setOpen(false)
    }

    function textField(){
       return (
        <Input 
            focus
            placeholder="enter here"
            loading={postloading || commentloading}
            onChange={handleOnChange} 
            style={{width: '100%'}}
        />
       ) 
    }
    
    return(
        <div className="edit-post">

            <Button 
                color="facebook"
                floated="left"
                onClick = {()=>setOpen(true)}
                style={{marginTop: "4px", marginBottom: "4px",}}
            > {postOrComment ? 'Edit post': 'edit comment'}
            </Button>

            <Confirm
                content={textField}
                header='Edit your post'
                open={open}
                onCancel={()=>setOpen(false)}
                onConfirm={postOrComment ? handlePostEditClick : handleCommentEditClick}
            />

        </div>
    )
}