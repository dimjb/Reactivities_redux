import React from 'react';
import { Tab, Grid, Header, Card } from 'semantic-ui-react';
import ProfileCard from './ProfileCard';
import { selectProfile, selectProfileFollowings, selectLoading, selectActiveTab } from '../../app/redux/profile/profile.selectors';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

const ProfileFollowings: React.FC<any> = ({ profile, followings, loading, activeTab }) => {

  return (
    <Tab.Pane loading={loading}>
      <Grid>
        <Grid.Column width={16}>
          <Header
            floated='left'
            icon='user'
            content={
              activeTab === 3
                ? `People following ${profile!.displayName}`
                : `People ${profile!.displayName} is following`
            }
          />
        </Grid.Column>
        <Grid.Column width={16}>
          <Card.Group itemsPerRow={5}>
              {followings.map((profile: any) => (
                  <ProfileCard key={profile.username} profile={profile} />
              ))}
          </Card.Group>
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

const mapStateToProps = createStructuredSelector<any, any>({
  profile: selectProfile,
  loading: selectLoading,
  followings: selectProfileFollowings,
  activeTab: selectActiveTab
});

export default connect(mapStateToProps)(ProfileFollowings);
