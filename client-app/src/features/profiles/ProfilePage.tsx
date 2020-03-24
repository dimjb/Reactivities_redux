import React, { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import ProfileHeader from './ProfileHeader';
import ProfileContent from './ProfileContent';
import { RouteComponentProps } from 'react-router-dom';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectProfileLoading, selectProfile, selectLoading } from '../../app/redux/profile/profile.selectors';
import { loadProfile, follow, unfollow, setActiveTab } from '../../app/redux/profile/profile.actions';
import { selectCurrentUser } from '../../app/redux/user/user.selectors';
import { updateUser } from '../../app/redux/user/user.actions';
import { resetActivities } from '../../app/redux/activities/activities.actions';

interface RouteParams {
    username: string;
}

const ProfilePage: React.FC<RouteComponentProps<RouteParams> | any> = ({ match, loadProfile, loadingProfile, profile, loading,
    currentUser, follow, unfollow, setActiveTab, updateUser, resetActivities }) => {

    useEffect(() => {
        loadProfile(match.params.username);
        return () => { updateUser(); resetActivities(); }
    }, [loadProfile, match, updateUser, resetActivities]);

    if (loadingProfile) return <LoadingComponent content='Loading profile...' />

    return (
        <Grid>
            <Grid.Column width={16}>
                {profile && <ProfileHeader
                    profile={profile!}
                    isCurrentUser={currentUser.username === profile.username}
                    follow={follow}
                    unfollow={unfollow}
                    loading={loading}
                />}
                <ProfileContent setActiveTab={setActiveTab} />
            </Grid.Column>
        </Grid>
    )
}
const mapStateToProps = createStructuredSelector<any, any>({
    loadingProfile: selectProfileLoading,
    loading: selectLoading,
    profile: selectProfile,
    currentUser: selectCurrentUser
});

const mapDispatchToProps = (dispatch: any) => ({
    loadProfile: (username: string) => dispatch(loadProfile(username)),
    follow: (username: string) => dispatch(follow(username)),
    unfollow: (username: string) => dispatch(unfollow(username)),
    setActiveTab: (tab: number) => dispatch(setActiveTab(tab)),
    updateUser: () => dispatch(updateUser()),
    resetActivities: () => dispatch(resetActivities())

});

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
