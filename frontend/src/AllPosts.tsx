import React from 'react';
//import Post from "./Post";

type Post = {title: string, body: string, date: string, type: string};

type Props = {
    type: String,
    list: Post[],
}

const AllPosts = ({type, list}: Props) =>{
    return(
        <div>
            {list.map(post => (post.type===type) 
            && <p key={post.title}> 
            -----------------------------------------------------<br/>
            Title: {post.title} <br/>
            Date: {post.date} <br/>
            Body: {post.body} <br/>
            ----------------------------------------------------- <br/>
            </p>
            )}
        </div>
    )
}

export default AllPosts;