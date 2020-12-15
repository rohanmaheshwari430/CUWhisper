import admin from 'firebase-admin';
import express from 'express';
import cors from 'cors';
import path from 'path';

const serviceAccount = require("./cuwhisper-firebase-adminsdk-edbp7-291d992bfa.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://cuwhisper.firebaseio.com"
});


const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, '../frontend/build')));
app.use(express.json());
const db = admin.firestore();

/*
Post object that will contain user-defined information 
Only the title, body, date, and comments should be public
Id will be used to show latest posts, delete posts, etc.
*/
type Post = {
    "title": string,
    "body": string,
    "date": string,
    "type": string, //academic, club, campus life
   // "comments": string[],
    "email": string,
    "id": string
};

const posts = db.collection('posts');

let postCounter = 0; //stores posts collection size

app.get('/getPosts', async (req,res) => { 
    const allPosts = await posts.get(); 
    const localPosts: Post[] = [];
    
    for(const doc of allPosts.docs) { 
        let post:Post = doc.data() as Post; //converting each post from firebase doc format to local post format
        localPosts.push(post);
    }

    res.send(localPosts);

    /*
    To display the posts, the component calling this endpoint will filter out the posts related to that category using a tagging feature.
    For example, if the academic component is calling this endpoint, it will retrieve all posts, filter the academic posts by the key "academic"
    and then sort it by highest to lowest id (representing latest to oldest posts)
    */

});

//delete
app.delete('/deletePost', async (req, res) => { //how to use firebase authentication to validate delete priviledge
    
    const id = req.body.id; //this id will be passed by the post component to the update/delete button component. There, a request will be a made to this endpoint
    if((await posts.doc(id).get()).exists) {
        posts.doc(id.toString()).delete();
        res.send(true)
    }
    /*
    admin.auth()
    .verifyIdToken(req.headers.idtoken as string)
    .then(async() => {
        const id = req.body.id; //this id will be passed by the post component to the update/delete button component. There, a request will be a made to this endpoint
        if((await posts.doc(id.toString()).get()).exists) {
            posts.doc(id.toString()).delete();
            res.send(true)
        }
        
    })
    .catch(() => {
        res.send('Not Authenticated.');
    })
    */
    
    postCounter -= 1;
}); 

app.post('/createPost', (req, res) => {
    const post: Post = req.body;
    if(post.title == null || post.body == null || post.date == null || post.type == null || post.email == null) { //checking if any fields are empty
        res.send(false);
    }
    postCounter += 1;
    post.id = postCounter.toString();
    const newPost = posts.doc(postCounter.toString()); //creating an empty document in posts collection
   
    newPost.set(post); //filling in the posts fields 
    res.send(true); //sendi ng true for confirmation that post was created
    
});

app.post('/updatePost', async (req, res) => { //need use firebase authentication to validate update priviledge
    //compare email of post author with email of logged in user
    
    admin.auth()
    .verifyIdToken(req.headers.idtoken as string)
    .then(async() => {
        const content: string = req.body.content;
        const id = req.body.id; //this id will be passed by the post component to the update/delete button component. There, a request will be made to this endpoint
        if(content == null) {
            res.send(false);
        }
        posts.doc(id.toString()).update({"body": content})
        res.send(true);
    })
    .catch(() => {
        res.send('Not Authenticated');
    });
   

    
});

app.listen(8080, () => console.log("Server started"));