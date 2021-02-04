import { useMutation } from "@apollo/react-hooks"
import React, { useEffect, useState } from "react"
import { Button, Icon, Label } from "semantic-ui-react"
import gql from "graphql-tag"
import { useHistory } from "react-router-dom"


const LIKEPOST = gql`
mutation likepost($postId: ID!){ 
    likePost(postId: $postId){
        id
        likes {
          id
          username
        }
        countLikes
    }
}
`

//remember likes is an array!
function LikeButton({ post: { id, countLikes, likes }, user }) {
    const history = useHistory()
    const [like, setLike] = useState(false)
    const [LikePost] = useMutation(LIKEPOST, {
        variables: {
            postId: id
        }
    })

    useEffect(()=>{
        user && likes.find(like=>user.username === like.username) ? 
            setLike(true) : setLike(false)
    }, [likes, user])  // update based on likes not like variable

    function handleOnClick() {
        user ? LikePost() : history.push('/login')
    }
    
    return (
        <div style={{marginBottom: "4px"}}>
            <Button as='div' labelPosition="left">
                <Button color='teal' basic={like? false:true} onClick={handleOnClick}>
                    <Icon name={like?'thumbs down':'thumbs up'} />
                    {like? 'unlike': 'like'}
                </Button>

                <Label color='teal' basic pointing='left' >
                {countLikes}
                </Label>
            </Button>
        </div>
    )
}

export default LikeButton
