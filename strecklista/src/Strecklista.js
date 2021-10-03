import React from 'react';
import UserDetailPage from './pages/UserDetailPage';
import AvatarPage from './pages/AvatarPage';
import Dragg from './components/DraggComponent';
import { BrowserRouter , Redirect, Route, Switch, useHistory} from 'react-router-dom';
import "./css/mainpage.css";
import LoginPage from './pages/LoginPage';

export default class Strecklista extends React.Component {

    constructor(props) {
        super(props);
        this.state = { loggedIn: false, userid: 0 }
    }

    componentDidMount() {
        fetch("/api/session").then(response => response.json()).then(response => {
            if (response.login !== true) {
                console.log("NOT LOGGED IN")
            }
            else {
                console.log("LOGGED IN")
                this.setState({ loggedIn: true, userid: response.id })
            }
        });
    }

    render() {
        return (
            <BrowserRouter forceRefresh={false}>
                {this.state.loggedIn ? 
                <div>
                <Switch>
                <div className="aaa">
                    <Redirect to={"/user/"+this.state.userid}/>
                    <Route exact path={"/user/"+this.state.userid} render={(props) => <UserDetailPage {...props} />} />
                    <Route exact path="/dragg" render={(props) => <Dragg {...props} />} />
                </div>
                </Switch>
                </div>
                : <LoginPage/>}
            </BrowserRouter>

        )
    };
}
