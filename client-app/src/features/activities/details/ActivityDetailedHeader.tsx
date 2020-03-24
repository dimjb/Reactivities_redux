import React, { Fragment, useState } from 'react';
import { Segment, Item, Header, Button, Image } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/activity';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectLoading, selectSubmitting } from '../../../app/redux/activities/activities.selectors';
import { attendActivity, unattendActivity, deleteActivity } from '../../../app/redux/activities/activities.actions';

const activityImageStyle = {
    filter: 'brightness(30%)'
};

const activityImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};
interface IProps {
    activity: IActivity;
    loading?: any;
    submitting?: any;
    attendActivity?: any;
    unattendActivity?: any;
    deleteActivity?: any;
}
const ActivityDetailedHeader: React.FC<IProps> = (
    { activity: { id, title, category, date, isGoing, isHost, attendees },
        loading, submitting, attendActivity, unattendActivity, deleteActivity }
) => {
    
    const [target, setTarget] = useState<string | undefined>(undefined);
    const host = attendees.filter(x => x.isHost)[0];
    return (
        <Segment.Group>
            <Segment basic attached='top' style={{ padding: '0' }}>
                <Image src={`/assets/categoryImages/${category}.jpg`} fluid style={activityImageStyle} />
                <Segment basic style={activityImageTextStyle}>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={title}
                                    style={{ color: 'white' }}
                                />
                                <p>{format(date, 'eeee do MMMM')}</p>
                                <p>
                                    Hosted by <Link to={`/profile/${host.username}`}><strong>{host.displayName}</strong></Link>
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                {isHost ? (
                    <Fragment>
                        <Button as={Link} to={`/manage/${id}`} color='orange' floated='right'>
                            Manage Event
                    </Button>
                        <Button name={id} loading={target === id && submitting} color='red' floated='right'
                            onClick={e => {
                                setTarget(e.currentTarget.name)
                                deleteActivity(id)
                            }}>
                            Delete Event
                    </Button>
                    </Fragment>
                ) : isGoing ? (
                    <Button loading={loading} onClick={unattendActivity}>Cancel attendance</Button>
                ) : (
                            <Button loading={loading} onClick={attendActivity} color='teal'>Join Activity</Button>
                        )}
            </Segment>
        </Segment.Group>
    )
}
const mapStateToProps = createStructuredSelector<any, any>({
    loading: selectLoading,
    submitting: selectSubmitting
})

const mapDispatchToProps = (dispatch: any) => ({
    attendActivity: () => dispatch(attendActivity()),
    unattendActivity: () => dispatch(unattendActivity()),
    deleteActivity: (id: string) => dispatch(deleteActivity(id))
})
export default connect(mapStateToProps, mapDispatchToProps)(ActivityDetailedHeader);
