import React from 'react';
import { Tab, Grid, Header, Button } from 'semantic-ui-react';
import ProfileEditForm from './ProfileEditForm';
import { connect } from 'react-redux';
import { selectProfile, selectEditMode } from '../../app/redux/profile/profile.selectors';
import { selectCurrentUser } from '../../app/redux/user/user.selectors';
import { updateProfile, setEditMode } from '../../app/redux/profile/profile.actions';
import { createStructuredSelector } from 'reselect';
import { IProfile } from '../../app/models/profile';

const ProfileDescription: React.FC<any> = ({updateProfile, profile, currentUser, editMode, setEditMode}) => {

  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16}>
          <Header
            floated='left'
            icon='user'
            content={`About ${profile!.displayName}`}
          />
          {currentUser.username === profile.username && (
            <Button
              floated='right'
              basic
              content={editMode ? 'Cancel' : 'Edit Profile'}
              onClick={() => setEditMode(!editMode)}
            />
          )}
        </Grid.Column>
        <Grid.Column width={16}>
          {editMode ? (
            <ProfileEditForm updateProfile={updateProfile} profile={profile!} />
          ) : (
            <span>{profile!.bio}</span>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};
const mapStateToProps = createStructuredSelector<any, any>({
  profile: selectProfile,
  currentUser: selectCurrentUser,
  editMode: selectEditMode
});

const mapDispatchToProps = (dispatch: any) => ({
  updateProfile: (profile: Partial<IProfile>) => dispatch(updateProfile(profile)),
  setEditMode: (mode: boolean) => dispatch(setEditMode(mode))
});
export default connect(mapStateToProps, mapDispatchToProps)(ProfileDescription);
