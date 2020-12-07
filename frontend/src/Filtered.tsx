import Button from '@material-ui/core/Button';
import firebase from 'firebase';
import React from 'react';
import Authenticated from './Authenticated';

type Post = {title: string, body: string, date: string, type: string};

type Props = {
    type: String,
    search: string,
    list: Post[]
}

const Filtered = ({type, search, list}: Props) =>{

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

                    
                    <Button>Edit</Button>
                    
                    ----------------------------------------------------- 
                    
                    <Button>Delete</Button>
                   
                    
                   
                </p>
            )}

        </div>
    )
}

export default Filtered;