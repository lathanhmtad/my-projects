import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { Modal, Divider, Typography } from 'antd';

import _ from 'lodash'

import { setOpenModal } from '../../../redux/slices/brands/brandSlice';

import FormBrand from './FormBrand';

const ModalBrand = () => {
    const {
        openModal: show,
        brandDetailsWithId: editableBrand
    } = useSelector(state => state.brand)

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
            title={<Typography.Title level={4}>{_.isEmpty(editableBrand) ? 'Add brand' : 'Edit brand'}</Typography.Title>}
            centered={true}
            closeIcon={true}
            open={show}
            okButtonProps={{ style: { display: 'none' } }}
            onCancel={showCloseConfirmation}
            destroyOnClose={true}
        >
            {contextHolder}
            <Divider />

            <FormBrand />
        </Modal>
    );
};
export default ModalBrand;