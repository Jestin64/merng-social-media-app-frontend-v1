import React from "react"
import { useHistory } from "react-router-dom"
import { Button, Icon, Label } from "semantic-ui-react"


function CommentPart({post: {countComments, id}, user}) {
    const history = useHistory()

    function commentOnPost(){ 
        user ? (
            history.push(`/posts/${id}`)
        ) :(
            history.push('/login')
        )
    }
    
    return (

        <Button as="div" labelPosition="right" >
            <Button color="teal" basic onClick={commentOnPost} >
                <Icon name="comments outline" />
            </Button>
            <Label basic color="teal" pointing="left">
                {countComments}
            </Label>
        </Button>

    )
}

export default CommentPart
