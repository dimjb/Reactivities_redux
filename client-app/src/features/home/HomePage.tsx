import React, { Fragment, useEffect } from 'react';
import { Container, Segment, Header, Button, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { openModal } from '../../app/redux/modal/modal.actions';
import { checkUserSession } from '../../app/redux/user/user.actions';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser, selectCurrentUserDisplayName } from '../../app/redux/user/user.selectors';
import { resetActivities } from '../../app/redux/activities/activities.actions';

const HomePage: React.FC<any> = ({openModal, user, currentUserDisplayName, checkUserSession, resetActivities}) => {
    const token = localStorage.getItem('jwt');
    useEffect(() => {
		if (token) {
            checkUserSession();
        }   
      return () => resetActivities();

	}, [checkUserSession, resetActivities, token]);

    return (
        <Segment inverted textAlign='center' vertical className='masthead' >
            <Container text>
                <Header as='h1' inverted>
                    <Image size='massive' src='/assets/logo.png' alt='logo' style={{ marginBottom: 12 }} />
                    Reactivities
                </Header>
                {user ? (
                    <Fragment>
                        <Header as='h2' inverted content={`Welcome back ${currentUserDisplayName}`} />
                        <Button as={Link} to='/activities' size='huge' inverted>
                            Go to activities!
                        </Button>
                    </Fragment>
                ) :
                    (
                        <Fragment>
                            <Header as='h2' inverted content='Welcome to Reactivities' />

                            <Button onClick={() => openModal('LoginForm')} size='huge' inverted>
                                Login
                        </Button>
                            <Button onClick={() => openModal('RegisterForm')} size='huge' inverted>
                                Register
                        </Button>
                        </Fragment>
                    )}      
            </Container>
        </Segment>
    );
}

const mapDispatchToProps = (dispatch: any) => ({
    openModal: (modalBody: string) => dispatch(openModal(modalBody)),
    checkUserSession: () => dispatch(checkUserSession()),
    resetActivities: () => dispatch(resetActivities())
})
const mapStateToProps = createStructuredSelector<any, any>({
    user: selectCurrentUser,
    currentUserDisplayName: selectCurrentUserDisplayName
  });

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
