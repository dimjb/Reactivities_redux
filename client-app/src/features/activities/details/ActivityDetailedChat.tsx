import React, { Fragment, useEffect } from 'react';
import { Segment, Header, Form, Button, Comment } from 'semantic-ui-react';
import { Form as FinalForm, Field } from 'react-final-form';
import { Link } from 'react-router-dom';
import TextAreaInput from '../../../app/common/form/TextAreaInput';
import { formatDistance } from 'date-fns';
import { connect } from 'react-redux';
import { addComment } from '../../../app/redux/activities/activities.actions';
import { IComment, IActivity } from '../../../app/models/activity';
import { hubConnection, createHubConnection, stopHubConnection } from '../../../app/common/util/util';


const ActivityDetailedChat: React.FC<{ activity: IActivity, addComment?: any }> = ({ activity, addComment }) => {
  useEffect(() => {
    createHubConnection(addComment);
    return () => stopHubConnection();
  }, [addComment])

  const pushComment = async (values: any) => {
    values.activityId = activity.id;
    try {
      await hubConnection!.invoke('SendComment', values);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Fragment>
      <Segment
        textAlign='center'
        attached='top'
        inverted
        color='teal'
        style={{ border: 'none' }}
      >
        <Header>Chat about this event</Header>
      </Segment>
      <Segment attached clearing>
        <Comment.Group>
          {activity && activity.comments && activity.comments.map((comment: IComment) => (
            <Comment key={comment.id}>
              <Comment.Avatar src={comment.image && process.env.REACT_APP_API_ROOT_URL + comment.image || '/assets/user.png'} />
              <Comment.Content>
                <Comment.Author as={Link} to={`/profile/${comment.username}`}>{comment.displayName}</Comment.Author>
                <Comment.Metadata>
                  <div>{formatDistance(new Date(comment.createdAt), new Date())}</div>
                </Comment.Metadata>
                <Comment.Text>{comment.body}</Comment.Text>
              </Comment.Content>
            </Comment>
          ))}
          <FinalForm
            onSubmit={pushComment}
            render={({ handleSubmit, submitting, form, pristine }) => (
              <Form onSubmit={() => handleSubmit()!.then(() => form.reset())}>
                <Field
                  name='body'
                  component={TextAreaInput}
                  rows={2}
                  placeholder='Add your comment...'
                />
                <Button
                  content='Add Reply'
                  labelPosition='left'
                  icon='edit'
                  primary
                  loading={submitting}
                  disabled={pristine}
                  floated='right'
                />
              </Form>
            )}
          />
        </Comment.Group>
      </Segment>
    </Fragment>
  )
}

const mapDispatchToProps = (dispatch: any) => ({
  addComment: (comment: IComment) => dispatch(addComment(comment))
})

export default connect(null, mapDispatchToProps)(ActivityDetailedChat);
