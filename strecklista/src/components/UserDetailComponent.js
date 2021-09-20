import "../css/user-detail.css";
import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import StreckComponent from "./StreckComponent";
import HistoryComponent from "./HistoryComponent";
import PayComponent from "./PayComponent";

const UserDetailComponent = (props) => {
    var classNames = require('classnames');
    const location = useLocation()
    const [skuld, setSkuld] = useState([]);
    const [sumStreck, setSumstreck] = useState([]);
    const [user, setUser] = useState([]);
    const [view, setView] = useState('streck');
    const userId = /[^/]*$/.exec(location.pathname)[0];

    const fetchSkuld = async () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };

        await fetch("/api/skuld/"+userId, requestOptions).then((response : any) => response.json()).then((response) => {
        setSkuld(response);
        });

        await fetch("/api/totstreck/"+userId, requestOptions).then((response : any) => response.json()).then((response) => {
        setSumstreck(response);
        });

        await fetch("/api/users/"+userId, requestOptions).then((response : any) => response.json()).then((response) => {
        setUser(response);
        });   

    }

    useEffect(() => {
        fetchSkuld();
        console.log(props.id)
            }, []);

    var skuldClasses = classNames({
        'div4': true,
        'clicked': view === 'skuld',
        'unclicked': view !== 'skuld'
    });

    var historikClasses = classNames({
        'div5': true,
        'clicked': view === 'historik',
        'unclicked': view !== 'historik'
    });

    var streckClasses = classNames({
        'div6': true,
        'clicked': view === 'streck',
        'unclicked': view !== 'streck'
    });

    const skuldPay = skuld.map((s) => s.pay);

    const viewset = (string) => {
       setView(string); 
    }

    return (
        <div className="user">
            <div className="div1">
                {user.map((u) => {return u.login})}
            </div>
            <div className="div2">
                Balance: <div className={skuldPay<0 ? "negative" : "positive"}> {skuldPay} </div> 
            </div>
            <div className="div3">
                Totstreckat: {sumStreck.map((s) => {return (s.sum == parseInt(s.sum)) ? parseInt(s.sum) : s.sum })}
            </div>
            <div className="buttons">
                <div className={skuldClasses} onClick={ () => setView('skuld')}> betala skuld </div>
                <div className={historikClasses} onClick={ () => setView('historik')}> historik </div>
                <div className={streckClasses} onClick={ () => setView('streck')}> strecka </div>
            </div>
            <div className="div7">
                {view === 'streck' && <StreckComponent id={userId}/>}  
                {view === 'skuld' && <PayComponent id={userId}/>}
                {view === 'historik' && <HistoryComponent id={userId} />}
            </div>

        </div>
    )
}

export default UserDetailComponent;
