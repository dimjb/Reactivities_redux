import React, { Fragment, useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react'
import NavBar from '../../features/nav/NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { Route, withRouter, Switch } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
import NotFound from './NotFound';
import { ToastContainer } from 'react-toastify';
import LoadingComponent from './LoadingComponent';
import ModalContainer from '../common/modals/ModalContainer';
import ProfilePage from '../../features/profiles/ProfilePage';
import PrivateRoute from './PrivateRoute';
import { connect } from 'react-redux';
import { checkUserSession } from '../redux/user/user.actions';
import { createStructuredSelector } from 'reselect';
import { selectModal } from '../redux/modal/modal.selectors';
import { selectCurrentUser } from '../redux/user/user.selectors';

const App: React.FC<any> = ({ modal: { open, body }, location, user, checkUserSession }) => {

  const [appLoaded, setAppLoaded] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('jwt')) {
      checkUserSession();
      if (user)
        setAppLoaded(true);
      else
        setAppLoaded(true);
    } else {
      setAppLoaded(true);
    }
  }, [checkUserSession, setAppLoaded, user]);

  if (!appLoaded) return <LoadingComponent content='Loading App' />
  return (
    <Fragment>
      <ModalContainer open={open} body={body} />
      <ToastContainer position='bottom-right' />
      <Route exact path='/' component={HomePage} />
      <Route path={'/(.+)'} render={() => (
        <Fragment>
          <NavBar />
          <Container style={{ marginTop: '7rem' }}>
            <Switch>
              <PrivateRoute exact path='/activities' component={ActivityDashboard} />
              <PrivateRoute path='/activities/:id' component={ActivityDetails} />
              {/* rerender when location.key changes(on navigating to path routes) */}
              <PrivateRoute key={location.key} path={['/createActivity', '/manage/:id']} component={ActivityForm} />
              <PrivateRoute path='/profile/:username' component={ProfilePage} />
              <Route component={NotFound} />
            </Switch>
          </Container>
        </Fragment>
      )} />
    </Fragment>
  );
}



const mapStateToProps = createStructuredSelector<any, any>({
  modal: selectModal,
  user: selectCurrentUser
});

const mapDispatchToProps = (dispatch: any) => ({
  checkUserSession: () => dispatch(checkUserSession())
})


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
