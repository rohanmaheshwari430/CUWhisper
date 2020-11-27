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
    "type": string //academic, club, campus life
   // "comments": string[],
   // "user": User
};

const posts = db.collection('academic');



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

app.delete('/deletePost', async (req, res) => { //how to use firebase authentication to validate delete priviledge
    const id = req.body; //this id will be passed by the post component to the update/delete button component. There, a request will be a made to this endpoint
    posts.doc(id.toString()).delete();
    postCounter -= 1;
}); 

app.post('/createPost', (req, res) => {
    const post: Post = req.body;
    if(post.title == null || post.body == null || post.date == null || post.type == null) { //checking if any fields are empty
        res.send(false);
    }

    const newPost = posts.doc(postCounter.toString()); //creating an empty document in posts collection
    newPost.set(post); //filling in the posts fields 
    res.send(true); //sending true for confirmation that post was created
    postCounter += 1;
});

app.post('/updatePost', async (req, res) => { //need use firebase authentication to validate update priviledge
    const content: string = req.body.content;
    const id = req.body.id; //this id will be passed by the post component to the update/delete button component. There, a request will be made to this endpoint
    if(content == null) {
        res.send(false);
    }

    posts.doc(id.toString()).update({"body": content})
    res.send(true);
})

app.listen(8080, () => console.log("Server started"));

/*
firebase rules


*/