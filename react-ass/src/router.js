import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './Home';
import TodoItem from './TodoItem';

export default (
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/todoitem/:id' component={TodoItem} />
    </Switch>
)