import React, { Fragment } from 'react';
import { Item, Label } from 'semantic-ui-react';
import ActivityListItem from './ActivityListItem';
import { format } from 'date-fns';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectActivitiesByDate } from '../../../app/redux/activities/activities.selectors';
import { IActivity } from '../../../app/models/activity';


const ActivityList: React.FC<any> = ({activitiesByDate}) => {
    
    return (
        <Fragment>
            {activitiesByDate.map(([group, activities]: [string, IActivity[]]) => (
                <Fragment key={group}>
                    <Label size='large' color='blue'>
                        {format(Date.parse(group), 'eeee do MMMM')}
                    </Label>
                    <Item.Group divided>
                        {activities.map(activity => (
                            <ActivityListItem key={activity.id} activity={activity} />
                        ))}
                    </Item.Group>
                </Fragment>
            ))}
        </Fragment>
    )
}

const mapStateToProps = createStructuredSelector<any, any>({
    activitiesByDate: selectActivitiesByDate
  });

export default connect(mapStateToProps)(ActivityList);
