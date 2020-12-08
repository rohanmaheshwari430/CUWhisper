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

    // {list.length<=0 && <p> <br/>No matching results found</p>}

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
                    Email: {email} <br/>
                    
                    {email === post.email ? <div><Button>Delete</Button> <br/></div>: <span></span>}
                    
                    ----------------------------------------------------- <br/>
                </p>
            )}

        </div>
    )
}

export default Filtered;