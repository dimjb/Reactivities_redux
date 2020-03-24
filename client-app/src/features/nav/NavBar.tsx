import React from 'react';
import { Menu, Container, Button, Dropdown, Image } from 'semantic-ui-react';
import { NavLink, Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser, selectCurrentUserDisplayName, selectCurrentUserImage } from '../../app/redux/user/user.selectors';
import { connect } from 'react-redux';
import { logoutOutStart } from '../../app/redux/user/user.actions';

const NavBar: React.FC<any> = ({user, logout, displayName, userImage}) => {
  
    return (
        <Menu fixed='top' inverted>
            <Container>
                <Menu.Item header as={Link} exact={`${true}`} to='/'>
                    <img src="/assets/logo.png" alt="logo" style={{marginRight: '10px'}}/>
                    Reactivities
                </Menu.Item>
                <Menu.Item name='Activities' as={NavLink} to='/activities' />
                <Menu.Item>
                    <Button as={NavLink} to='/createActivity' positive content='Create Activity' />
                </Menu.Item>
                {user &&
					<Menu.Item position='right'>
						<Image avatar spaced='right' src={userImage && process.env.REACT_APP_API_ROOT_URL+userImage || '/assets/user.png'} />
						<Dropdown pointing='top left' text={displayName}>
							<Dropdown.Menu>
								<Dropdown.Item as={Link} to={`/profile/${user.username}`} text='My profile' icon='user' />
								<Dropdown.Item onClick={() =>logout()} text='Logout' icon='power' />
							</Dropdown.Menu>
						</Dropdown>
					</Menu.Item>
				}
            </Container>
        </Menu>
    )
}

const mapStateToProps = createStructuredSelector<any, any>({
    user: selectCurrentUser,
    displayName: selectCurrentUserDisplayName,
    userImage: selectCurrentUserImage
});

const mapDispatchToProps = (dispatch: any) => ({
    logout: () => dispatch(logoutOutStart())
  })
  
export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
