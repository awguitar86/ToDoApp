import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './Home';
import Task from './Task';

export default (
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/task/:id' component={Task} />
    </Switch>
)