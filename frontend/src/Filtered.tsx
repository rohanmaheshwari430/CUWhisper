import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import React, { useEffect } from 'react';
import {useState} from 'react'
import CSS from 'csstype';



type Props = {
    type: String,
    search: string,
    email: string | null
}



const Filtered = ({type, search, email}: Props) =>{

    type Post = {title: string, body: string, date: string, type: string, email?: string, id: string};


    const [posts, setPosts] = useState<Post[]>([]);


    const getPosts = () => {
        fetch('/getPosts')
            .then(res => res.json())
            .then(json => setPosts(json));
        

        fetch('/getPosts')
            .then(res => res.text())
            .then(text => console.log(text))

        /*
        const res: readonly Post[] = await axios.get('/getPosts');
        setPosts(res);
        */
        
    };

    useEffect(() => getPosts(), []);

    const deletePost = async (id: string) => {
        await axios.delete<string>('/deletePost', {data: {id: id}});
        
    }

    const postStyle: CSS.Properties = {
        border: '1px solid red'
    }

    return(
        <div>

            <Grid container spacing={3}>
                <Grid item xs={4}> 
                    <div style={postStyle}>
                        {posts.map(post => 
                        ((post.type===type) && 
                        (post.title.toLowerCase().includes(search.toLowerCase()) || post.body.toLowerCase().includes(search.toLowerCase()))) 
                        && <p key={post.title}> 
                            Title: {post.title} <br/>
                            Date: {post.date} <br/>
                            Body: {post.body} <br/>                    
                            {email === post.email ? <div><Button onClick={() => deletePost(post.id)}>Delete</Button></div>: <span></span>}
                        </p>
                        )}
                    </div>
                </Grid>
                
                <Grid item xs={4}>
                    <div style={postStyle}>
                        Title: Title <br/>
                        Date: Date <br/>
                        Body: Body <br/>                    
                        <div><Button >Delete</Button></div>
                    </div>
                </Grid>


            </Grid>
            
            


               
        </div>
    )
}

export default Filtered;