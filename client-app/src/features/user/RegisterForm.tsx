import React, { useEffect } from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import { Form, Button, Header } from 'semantic-ui-react';
import TextInput from '../../app/common/form/TextInput';
import { IUserFormValues } from '../../app/models/user';
import { combineValidators, isRequired } from 'revalidate';
import ErrorMessage from '../../app/common/form/ErrorMessage';
import { connect } from 'react-redux';
import { registerStart, resetError } from '../../app/redux/user/user.actions';
import { createStructuredSelector } from 'reselect';
import { authError } from '../../app/redux/user/user.selectors';

const validate = combineValidators({
	username: isRequired('Username'),
	displayName: isRequired('Display Name'),
	email: isRequired('Email'),
	password: isRequired('Password')
});

const RegisterForm: React.FC<any> = ({error, register, resetError}) => {
	useEffect(() => {
        return () => {
            resetError()
        };
    }, [resetError])
	return (
		<FinalForm
			onSubmit={register}
			validate={validate}
			render={({ handleSubmit, submitting, invalid, pristine, dirtySinceLastSubmit }) => (
				<Form onSubmit={handleSubmit} error>
					<Header as='h2' content='Register' color='teal' textAlign='center' />
					<Field
						name='username' component={TextInput} placeholder='Username'
					/>
					<Field
						name='displayName' component={TextInput} placeholder='Display Name'
					/>
					<Field
						name='email' component={TextInput} placeholder='Email'
					/>
					<Field
						name='password' component={TextInput} placeholder='Password' type='password'
					/>
					{error && !dirtySinceLastSubmit && (
                        <ErrorMessage error={error} text='Invalid email or password' />
                    )}
					<Button disabled={invalid && !dirtySinceLastSubmit || pristine} loading={submitting} color='teal' content='Register' fluid />
				</Form>
			)}
		/>
	)
}
const mapStateToProps = createStructuredSelector<any,any>({
    error: authError,
});

const mapDispatchToProps = (dispatch: any) => ({
	register: (values: IUserFormValues) => dispatch(registerStart(values)),
	resetError: () => dispatch(resetError())
})

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);