import React from 'react';
import { RouteProps, RouteComponentProps, Route, Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';


interface IProps extends RouteProps {
    component: React.ComponentType<RouteComponentProps<any>>;
}

const PrivateRoute: React.FC<IProps> = ({component: Component, exact, ...rest}) => {
    if (!localStorage.getItem('jwt'))
        toast.error('Authentication error');
    return (
        <Route
            {...rest}
            render={props => localStorage.getItem('jwt') ? <Component {...props} /> : <Redirect to='/' />}
        />
    )
}

export default PrivateRoute;
