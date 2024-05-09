import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button, Flex, Space, Typography, Divider, message } from "antd"
import { PlusCircleOutlined } from '@ant-design/icons'

// import components
import ModalUser from "../../../Components/Admin/Users/ModalUser";
import TableUser from "../../../Components/Admin/Users/TableUser";
import DrawerDetailsUser from "../../../Components/Admin/Users/DrawerDetailsUser";

import { resetIsActionSuccess, setOpenModal } from "../../../redux/slices/users/userSlice";
import { toast } from "react-toastify";

const UserPage = () => {
    const dispatch = useDispatch()

    const {
        isActionSuccess,
        message
    } = useSelector(state => state.user)

    useEffect(() => {
        if (isActionSuccess) {
            toast.success(message)
            dispatch(setOpenModal(false))
        }
        else if (isActionSuccess === false) {
            toast.error(message)
        }
        dispatch(resetIsActionSuccess())
    }, [isActionSuccess])

    return (
        <div className="user-page">
            <Flex align="center" justify="space-between">
                <Space
                    direction="vertical"
                    size="small"
                >
                    <Typography.Title style={{ marginBottom: 0 }} level={2}>Users</Typography.Title>
                    <Typography.Title level={5}>Users management</Typography.Title>
                </Space>
                <div>
                    <Button
                        type="primary"
                        icon={<PlusCircleOutlined />}
                        onClick={() => dispatch(setOpenModal(true))}
                        size="large">
                        Add user
                    </Button>
                </div>
            </Flex>
            <Divider />

            <TableUser />

            <DrawerDetailsUser />

            <ModalUser />
        </div>
    )
}

export default UserPage