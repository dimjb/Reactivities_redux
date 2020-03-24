import React, { useEffect } from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import { Form, Button, Header } from 'semantic-ui-react';
import TextInput from '../../app/common/form/TextInput';
import { IUserFormValues } from '../../app/models/user';
import { combineValidators, isRequired } from 'revalidate';
import ErrorMessage from '../../app/common/form/ErrorMessage';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { authError } from '../../app/redux/user/user.selectors';
import { loginStart, resetError } from '../../app/redux/user/user.actions';

const validate = combineValidators({
    email: isRequired('email'),
    password: isRequired('password')
});

const LoginForm: React.FC<any> = ({error, login, resetError}) => {
    useEffect(() => {
        return () => {
            resetError()
        };
    }, [resetError])

    return (
        <FinalForm
            onSubmit={login}
            validate={validate}
            render={({ handleSubmit, invalid, pristine, dirtySinceLastSubmit }) => (
                <Form onSubmit={handleSubmit} error>
                    <Header as='h2' content='Login' color='teal' textAlign='center' />
                    <Field
                        name='email' component={TextInput} placeholder='Email'
                    />
                    <Field
                        name='password' component={TextInput} placeholder='Password' type='password'
                    />
                    {error && !dirtySinceLastSubmit && (
                        <ErrorMessage error={error} text='Invalid email or password' />
                    )}
                    <Button disabled={invalid && !dirtySinceLastSubmit || pristine} color='teal' content='Login' fluid />
                </Form>
            )}
        />
    )
}

const mapStateToProps = createStructuredSelector<any,any>({
    error: authError,
});

const mapDispatchToProps = (dispatch: any) => ({
    login: (values: IUserFormValues) => dispatch(loginStart(values)),
    resetError: () => dispatch(resetError())
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);