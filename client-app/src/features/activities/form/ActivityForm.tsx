import React, { useEffect } from 'react';
import { Segment, Form, Button, Grid } from 'semantic-ui-react';
import { ActivityFormValues, IActivity } from '../../../app/models/activity';
import { v4 as uuid } from 'uuid';
import { RouteComponentProps } from 'react-router-dom';
import { Form as FinalForm, Field } from 'react-final-form';
import TextInput from '../../../app/common/form/TextInput';
import TextAreaInput from '../../../app/common/form/TextAreaInput';
import SelectInput from '../../../app/common/form/SelectInput';
import { categories } from '../../../app/common/options/categoryOptions';
import DateInput from '../../../app/common/form/DateInput';
import { combineDateAndTime } from '../../../app/common/util/util';
import { combineValidators, isRequired, composeValidators, hasLengthGreaterThan } from 'revalidate';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectActivity, selectSubmitting } from '../../../app/redux/activities/activities.selectors';
import { loadActivity, editActivity, createActivity } from '../../../app/redux/activities/activities.actions';

const validate = combineValidators({
    title: isRequired({ message: 'Event title is required!' }),
    category: isRequired('Category'),
    description: composeValidators(
        isRequired('Description'),
        hasLengthGreaterThan(4)({ message: 'Description needs to be at least 5 chars!' })
    )(),
    city: isRequired('City'),
    venue: isRequired('Venue'),
    date: isRequired('Date'),
    time: isRequired('Time')
});

interface RouteParams {
    id: string;
}

const ActivityForm: React.FC<RouteComponentProps<RouteParams> | any> = ({ match, history, submitting,
    loadActivity, activity, editActivity, createActivity }) => {

    useEffect(() => {
        if (match.params.id) {
            loadActivity(match.params.id);
        }
    }, [loadActivity, match]);

    const handleFinalFormSubmit = (values: any) => {
        const dateTime = combineDateAndTime(values.date, values.time);
        const { date, time, ...activity } = values;
        activity.date = dateTime;
        if (!activity.id) {
            let newActivity = {
                ...activity,
                id: uuid()
            }
            createActivity(newActivity);
        } else {
            editActivity(activity);
        }

    }
    
    const { id, title, description, category, date, time, city, venue } = activity && match.params.id ? activity : new ActivityFormValues() 
    let formActivity = new ActivityFormValues();
    if (activity && match.params.id)
        formActivity = new ActivityFormValues(activity);

    return (
        <Grid>
            <Grid.Column width={10}>
                <Segment clearing>
                    <FinalForm validate={validate}
                        initialValues={formActivity}
                        onSubmit={handleFinalFormSubmit}
                        render={({ handleSubmit, invalid, pristine }) => (
                            <Form onSubmit={handleSubmit}>
                                <Field name='title' component={TextInput}
                                    placeholder='Title' value={title} />

                                <Field name='description' component={TextAreaInput}
                                    placeholder='Description' value={description} />

                                <Field name='category' component={SelectInput}
                                    options={categories}
                                    placeholder='Category' value={category} />
                                <Form.Group widths='equal'>
                                    <Field name='date' component={DateInput}
                                        placeholder='Date' value={date} date={true} />
                                    <Field name='time' component={DateInput}
                                        placeholder='Time' value={time} time={true} />
                                </Form.Group>

                                <Field name='city' component={TextInput}
                                    placeholder='City' value={city} />

                                <Field name='venue' component={TextInput}
                                    placeholder='Venue' value={venue} />
                                <Button disabled={invalid || pristine}
                                    floated='right' positive type='submit' content='Submit' loading={submitting} />
                                <Button disabled={submitting}
                                    onClick={() => !id ?
                                        history.push('/activities') :
                                        history.push(`/activities/${id}`)} floated='right' type='button' content='Cancel' />
                            </Form>
                        )}
                    />

                </Segment>
            </Grid.Column>
        </Grid>

    )
}
const mapStateToProps = createStructuredSelector<any, any>({
    activity: selectActivity,
    submitting: selectSubmitting
})

const mapDispatchToProps = (dispatch: any) => ({
    loadActivity: (id: string) => dispatch(loadActivity(id)),
    editActivity: (activity: IActivity) => dispatch(editActivity(activity)),
    createActivity: (activity: IActivity) => dispatch(createActivity(activity))
})
export default connect(mapStateToProps, mapDispatchToProps)(ActivityForm);
