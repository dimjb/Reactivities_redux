import React, { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import ActivityDetailedHeader from './ActivityDetailedHeader';
import ActivityDetailedInfo from './ActivityDetailedInfo';
import ActivityDetailedChat from './ActivityDetailedChat';
import ActivityDetailedSidebar from './ActivityDetailedSidebar';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectActivity, selectLoadingInitial } from '../../../app/redux/activities/activities.selectors';
import { loadActivity, resetActivities } from '../../../app/redux/activities/activities.actions';
import { RouteComponentProps } from 'react-router-dom';

interface RouteParams {
  id: string;
}

const ActivityDetails: React.FC<RouteComponentProps<RouteParams> | any> = ({ match, loadActivity, loadingInitial, activity, resetActivities }) => {

  useEffect(() => {
    loadActivity(match.params.id);
    return () => resetActivities()
  }, [loadActivity, match, resetActivities]);

  if (loadingInitial || !activity) return <LoadingComponent content='Loading Activity...' />

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityDetailedHeader activity={activity} />
        <ActivityDetailedInfo activity={activity} />
        <ActivityDetailedChat activity={activity} />
      </Grid.Column>
      <Grid.Column width={6}>
        <ActivityDetailedSidebar attendees={activity.attendees} />
      </Grid.Column>
    </Grid>
  )
}
const mapStateToProps = createStructuredSelector<any, any>({
  loadingInitial: selectLoadingInitial,
  activity: selectActivity,
})

const mapDispatchToProps = (dispatch: any) => ({
  loadActivity: (id: string) => dispatch(loadActivity(id)),
  resetActivities: () => dispatch(resetActivities())
})

export default connect(mapStateToProps, mapDispatchToProps)(ActivityDetails);