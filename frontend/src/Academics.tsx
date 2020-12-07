import React, {useState} from 'react';
import Filtered from "./Filtered";
import AllPosts from "./AllPosts";
import 'firebase/auth';
import firebase from 'firebase/app';
import Button from '@material-ui/core/Button';

type Post = {title: string, body: string, date: string, type: string, email?: string};

function Academics() {
    const posts:Post[]=[
        {title: "title1 - apple", body: "body1", date: "12/01/20", type: "Academics"},
        {title: "title2", body: "body2 - apple, banana", date: "12/02/20", type: "Academics"},
        {title: "title3 - banana", body: "body3", date: "12/03/20", type: "Academics"},
        {title: "title4 - cat, dog", body: "body4", date: "12/04/20", type: "Academics"},
        {title: "title5 - apple", body: "body5 - cat, dog", date: "12/05/20", type: "Academics"},
        {title: "title6 - cat", body: "body6 - banana", date: "12/06/20", type: "Academics"},
        {title: "title7 - dog", body: "body7 - apple", date: "12/07/20", type: "Career"},
        {title: "title8", body: "body8 - dog, banana, cat, apple", date: "12/08/20", type: "Career"},
        {title: "title9 - apple", body: "body9 - banana", date: "12/09/20", type: "Career"},
        {title: "title10 - cat", body: "body10 - dog", date: "12/10/20", type: "Clubs"},
        {title: "title11 - apple, banana", body: "body11 - cat", date: "12/11/20", type: "Clubs"},
        {title: "title12 - dog", body: "body12 - apple", date: "12/12/20", type: "Clubs"}
    ]

    const [search, setSearch] = useState("");

    const updateSearch=(event: React.ChangeEvent<HTMLInputElement>) => {
        const newSearch = event.currentTarget.value;
        setSearch(newSearch);
    }

    return (
        
        <div>
            <Button>Sign in</Button>
            <Button onClick={() => firebase.auth().signOut()}>Sign Out</Button> <br/>
            --Academics-- <br/>
            <input type="text" placeholder="Search..." value={search} onChange={updateSearch}></input>
            <label><br/> Mathcing results: "{search}" </label> 
                <Filtered 
                type = "Academics"
                search = {search}
                list = {posts}
                />
            <br/>
            <label>All posts for Academics: </label>
                <AllPosts 
                type = "Academics"
                list = {posts}
                />
        </div>
    );
}

export default Academics;