import React, {useState} from 'react';
import Filtered from "./Filtered";
import AllPosts from "./AllPosts";
import TextField from '@material-ui/core/TextField';

type Post = {title: string, body: string, date: string, type: string, email?: string};

type Props = {
    email: any
}

function Career({email}: Props) {
    const posts:Post[]=[
        {title: "title1 - apple", body: "body1", date: "12/01/20", type: "Academics", email: "rohanm@gmail.com"},
        {title: "title2", body: "body2 - apple, banana", date: "12/02/20", type: "Academics", email: "sj598@cornell.edu"},
        {title: "title3 - banana", body: "body3", date: "12/03/20", type: "Academics", email: "user3@gmail.com"},
        {title: "title4 - cat, dog", body: "body4", date: "12/04/20", type: "Academics", email: "user4@gmail.com"},
        {title: "title5 - apple", body: "body5 - cat, dog", date: "12/05/20", type: "Academics", email: "user5@gmail.com"},
        {title: "title6 - cat", body: "body6 - banana", date: "12/06/20", type: "Academics", email: "user6@gmail.com"},
        {title: "title7 - dog", body: "body7 - apple", date: "12/07/20", type: "Career", email: "sj598@cornell.edu"},
        {title: "title8", body: "body8 - dog, banana, cat, apple", date: "12/08/20", type: "Career", email: "user8@gmail.com"},
        {title: "title9 - apple", body: "body9 - banana", date: "12/09/20", type: "Career", email: "user9@gmail.com"},
        {title: "title10 - cat", body: "body10 - dog", date: "12/10/20", type: "Clubs", email: "user10@gmail.com"},
        {title: "title11 - apple, banana", body: "body11 - cat", date: "12/11/20", type: "Clubs", email: "user11@gmail.com"},
        {title: "title12 - dog", body: "body12 - apple", date: "12/12/20", type: "Clubs", email: "user12@gmail.com"}
    ]

    const [search, setSearch] = useState("");

    const updateSearch=(event: React.ChangeEvent<HTMLInputElement>) => {
        const newSearch = event.currentTarget.value;
        setSearch(newSearch);
    }

    return (
        <div>
            <h1>
            Career
            </h1>
             <br/>
            <TextField id="filled-basic" label="keyword" variant="filled" value={search} onChange={updateSearch}></TextField> <br/>
            <h2><br/> Matching results: "{search}" </h2> 
                <Filtered 
                email = {email}
                type = "Career"
                search = {search}
                list = {posts}
                />
            <br/>
            <h2>All posts for Career: </h2>
                <AllPosts 
                email = {email}
                type = "Career"
                list = {posts}
                />
        </div>
    );
}

export default Career;