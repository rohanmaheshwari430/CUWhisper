import Button from '@material-ui/core/Button';
import React from 'react';
//import Post from "./Post";

type Post = {title: string, body: string, date: string, type: string, email?: string | null};

type Props = {
    type: String,
    list: Post[],
    email: string | null
}

const AllPosts = ({type, list, email}: Props) =>{
    return(
        <div>
            {list.map(post => (post.type===type) 
            && <p key={post.title}> 
            -----------------------------------------------------<br/>
            Title: {post.title} <br/>
            Date: {post.date} <br/>
            Body: {post.body} <br/>
            {email === post.email ? <div><Button>Delete</Button> <br/></div>: <span></span>}
            ----------------------------------------------------- <br/>
            </p>
            )}
        </div>
    )
}

export default AllPosts;