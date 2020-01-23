import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {Home} from "./Home"

const App: React.FC =() => {
return(
<BrowserRouter>
    <Switch>
        <Route path="/Home" exact/>
        <Route path="/" render={() => <div>404</div>} />
    </Switch>
</BrowserRouter>
    );
};
