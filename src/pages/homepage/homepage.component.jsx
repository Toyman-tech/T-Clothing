import React from "react";
import './homepage.styles.scss'
import Directory from "../../components/directory/directory.component";
import { HomePageContainer } from "./homepage.styles";



const HomePage = ({ history }) => (
    <HomePageContainer>
        <Directory history={history}/>
    </HomePageContainer>
)
    export default HomePage;