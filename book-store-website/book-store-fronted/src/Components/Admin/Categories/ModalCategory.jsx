import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { Modal, Divider, Typography } from 'antd';

import _ from 'lodash'

import { setOpenModal, resetIsActionSuccess } from '../../../redux/slices/categories/categorySlice';

import FormCategory from './FormCategory';

const ModalCategory = () => {
    const {
        openModal: show,
        isActionSuccess,
        message,
        categoryDetailsWithId: editableCategory
    } = useSelector(state => state.category)

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
            width={1000}
            title={<Typography.Title level={4}>{_.isEmpty(editableCategory) ? 'Add category' : 'Edit category'}</Typography.Title>}
            centered={true}
            closeIcon={true}
            open={show}
            okButtonProps={{ style: { display: 'none' } }}
            onCancel={showCloseConfirmation}
            destroyOnClose={true}
        >
            {contextHolder}
            <Divider />

            <FormCategory />
        </Modal>
    );
};
export default ModalCategory;