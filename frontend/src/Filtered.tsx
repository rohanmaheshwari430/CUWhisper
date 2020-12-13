import Button from '@material-ui/core/Button';
import React from 'react';

type Post = {title: string, body: string, date: string, type: string, email?: string};

type Props = {
    type: String,
    search: string,
    list: Post[],
    email: string | null
}

const Filtered = ({type, search, list, email}: Props) =>{

    //function calling get posts -> localPosts: Post[]

    const getPost = {

        //call get post as Post[] -> pass this list into html code below
    }

    // {list.length<=0 && <p> <br/>No matching results found</p>}

    const deletePost = {
        //call delete post via post.id
    }

    return(
        <div>
            {list.map(post => 
                ((post.type===type) && 
                (post.title.toLowerCase().includes(search.toLowerCase()) || post.body.toLowerCase().includes(search.toLowerCase()))) 
                && <p key={post.title}> 
                    -----------------------------------------------------<br/>
                    Title: {post.title} <br/>
                    Date: {post.date} <br/>
                    Body: {post.body} <br/>                    
                    {email === post.email ? <div><Button>Delete</Button></div>: <span></span>}
                    -----------------------------------------------------
                </p>
            )}

        </div>
    )
}

export default Filtered;