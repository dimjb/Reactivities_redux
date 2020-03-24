import React from 'react';
import { Modal } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { closeModal } from '../../redux/modal/modal.actions';
import LoginForm from '../../../features/user/LoginForm';
import RegisterForm from '../../../features/user/RegisterForm';


const ModalContainer: React.FC<IProps> = ({ open , body, closeModal }) => {
    return (
        <Modal open={open} onClose={closeModal} size='mini'>
            <Modal.Content>
                {body === 'LoginForm' ? <LoginForm /> : body === 'RegisterForm' ? <RegisterForm /> : null}
            </Modal.Content>
        </Modal>
    )
}


const mapDispatchToProps = {
    closeModal
}

interface IIntinsicProps {
    open: boolean;
    body: string;
}

type IProps = IIntinsicProps & typeof mapDispatchToProps;


export default connect(null, mapDispatchToProps)(ModalContainer);
