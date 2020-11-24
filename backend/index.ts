import admin from 'firebase-admin';
import express from 'express';

const serviceAccount = require("./cuwhisper-firebase-adminsdk-edbp7-291d992bfa.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://cuwhisper.firebaseio.com"
});

const db = admin.firestore();
const app = express();
app.use(express.json());

/*
User object to provide posts with author information
Information in user object should be retrieved from firebase login authentication
*/
type User = {
    "name": string,
    "gradYear": number,
    "college": string,
}

/*
Post object that will contain user-defined information 
Only the title, body, date, and comments should be public
Id will be used to show latest posts, delete posts, etc.
*/
type Post = {
    "title": string,
    "body": string,
    "date": string,
   // "comments": string[],
    "id": number, //still need to figure out how to auto assign numerical id
   // "user": User
};

const posts = db.collection('posts');

let postCounter  = 0; //stores posts collection size

app.post('/createPost', (req, res) => {
    const post: Post = req.body;
    if(post.title == null || post.body == null || post.date == null) { //checking if any fields are empty
        res.send(false);
    }
    
    const newPost = posts.doc(postCounter.toString()); //creating an empty document in posts collection
    newPost.set(post); //filling in the posts fields 
    res.send(true); //sending true for confirmation that post was created
    postCounter += 1;
});

app.get('/getPosts', async (req,res) => {
    const allPosts = await posts.get(); 
    const localPosts: Post[] = [];
    
    for(const doc of allPosts.docs) { 
        let post:Post = doc.data() as Post; //converting each post from firebase doc format to local post format
        localPosts.push(post);
    }

    res.send(localPosts);

});



app.listen(8080, () => console.log("Server started"));

