"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const express_1 = __importDefault(require("express"));
require("dns");
const serviceAccount = require("./cuwhisper-firebase-adminsdk-edbp7-291d992bfa.json");
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(serviceAccount),
    databaseURL: "https://cuwhisper.firebaseio.com"
});
const db = firebase_admin_1.default.firestore();
const app = express_1.default();
app.use(express_1.default.json());
const posts = db.collection('posts');
let postCounter = 0; //stores posts collection size
app.get('/getPosts', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allPosts = yield posts.get();
    const localPosts = [];
    for (const doc of allPosts.docs) {
        let post = doc.data(); //converting each post from firebase doc format to local post format
        localPosts.push(post);
    }
    res.send(localPosts);
    /*
    To display the posts, the component calling this endpoint will filter out the posts related to that category using a tagging feature.
    For example, if the academic component is calling this endpoint, it will retrieve all posts, filter the academic posts by the key "academic"
    and then sort it by highest to lowest id (representing latest to oldest posts)
    */
}));
//delete
app.delete('/deletePost', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.body.id; //this id will be passed by the post component to the update/delete button component. There, a request will be a made to this endpoint
    if ((yield posts.doc(id).get()).exists) {
        posts.doc(id.toString()).delete();
        res.send(true);
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
}));
app.post('/createPost', (req, res) => {
    const post = req.body;
    if (post.title == null || post.body == null || post.date == null || post.type == null || post.email == null) { //checking if any fields are empty
        res.send(false);
    }
    postCounter += 1;
    post.id = postCounter.toString();
    const newPost = posts.doc(postCounter.toString()); //creating an empty document in posts collection
    newPost.set(post); //filling in the posts fields 
    res.send(true); //sendi ng true for confirmation that post was created
});
app.post('/updatePost', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //compare email of post author with email of logged in user
    firebase_admin_1.default.auth()
        .verifyIdToken(req.headers.idtoken)
        .then(() => __awaiter(void 0, void 0, void 0, function* () {
        const content = req.body.content;
        const id = req.body.id; //this id will be passed by the post component to the update/delete button component. There, a request will be made to this endpoint
        if (content == null) {
            res.send(false);
        }
        posts.doc(id.toString()).update({ "body": content });
        res.send(true);
    }))
        .catch(() => {
        res.send('Not Authenticated');
    });
}));
app.listen(8080, () => console.log("Server started"));
