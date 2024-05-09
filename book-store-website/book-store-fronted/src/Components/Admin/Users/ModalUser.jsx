import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { Modal, Divider, Typography } from 'antd';

import _ from 'lodash'

import { setOpenModal } from '../../../redux/slices/users/userSlice';

import FormUser from './FormUser';

const ModalUser = () => {
    const {
        openModal: show,
        userDetailsWithId: editableUser
    } = useSelector(state => state.user)

    const [modal, contextHolder] = Modal.useModal();

    const dispatch = useDispatch()

    const showCloseConfirmation = () => {
        modal.confirm({
            title: 'Confirmation',
            content: 'Are you sure you want to close the modal?',
            onOk() {
                toast.dismiss()
                dispatch(setOpenModal(false))
            }
        })
    };

    return (
        <Modal
            className='modal-user'
            width={1000}
            title={<Typography.Title level={4}>{_.isEmpty(editableUser) ? 'Add user' : 'Edit user'}</Typography.Title>}
            centered={true}
            closeIcon={true}
            open={show}
            okButtonProps={{ style: { display: 'none' } }}
            onCancel={showCloseConfirmation}
            destroyOnClose={true}
        >
            {contextHolder}
            <Divider />

            <FormUser />
        </Modal>
    );
};
export default ModalUser;