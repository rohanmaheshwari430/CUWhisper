import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import React, { useEffect } from 'react';
import {useState} from 'react'
import CSS from 'csstype';
import { makeStyles } from '@material-ui/core/styles';
import firebase from 'firebase';



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
        

    };

    useEffect(() => getPosts(), []);

    const deletePost = async (id: string) => {
        firebase
        .auth()
        .currentUser?.getIdToken(true)
        .then(async (idtoken) => {
            await axios.delete<string>('/deletePost', {data: {id: id}, headers: {'idtoken': idtoken}});
        })
        
        
    }

    const postStyle: CSS.Properties = {
        border: '1px solid red',
    }
    
    const gridStyle: CSS.Properties = {
        display: 'flex'
    }

    return(
            <div>
                {posts.map(post => 
                    ((post.type===type) && 
                    (post.title.toLowerCase().includes(search.toLowerCase()) || post.body.toLowerCase().includes(search.toLowerCase()))) 
                    && <p key={post.title}>
                        <div style={postStyle}>
                        Title: {post.title} <br/>
                        Date: {post.date} <br/>
                        Body: {post.body} <br/>                    
                        {email === post.email ? <div><Button onClick={() => deletePost(post.id)}>Delete</Button></div>: <span></span>}  
                        </div>    
                </p>        
                )}
            </div>
        
                        
                 
    
    )
}

export default Filtered;