import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { Button, Flex, Space, Typography, Divider } from "antd"
import { PlusCircleOutlined } from '@ant-design/icons'

// import components
import ModalCategory from "../../../Components/Admin/Categories/ModalCategory";
import TableCategory from "../../../Components/Admin/Categories/TableCategory";
import DrawerDetailsCategory from "../../../Components/Admin/Categories/DrawerDetailsCategory";

import { resetIsActionSuccess, setOpenModal } from "../../../redux/slices/categories/categorySlice";

const CategoryPage = () => {
    const dispatch = useDispatch()

    const {
        isActionSuccess,
        message
    } = useSelector(state => state.category)

    useEffect(() => {
        if (isActionSuccess) {
            toast.success(message)
            dispatch(setOpenModal(false))
            dispatch(resetIsActionSuccess())
        }
        else if (isActionSuccess === false) {
            toast.error(message, {
                autoClose: 7000
            })
        }
        dispatch(resetIsActionSuccess())
    }, [isActionSuccess])

    return (
        <div>
            <Flex align="center" justify="space-between">
                <Space
                    direction="vertical"
                    size="small"
                >
                    <Typography.Title style={{ marginBottom: 0 }} level={2}>Categories</Typography.Title>
                    <Typography.Title level={5}>Categories management</Typography.Title>
                </Space>
                <div>
                    <Button
                        type="primary"
                        icon={<PlusCircleOutlined />}
                        onClick={() => dispatch(setOpenModal(true))}
                        size="large">
                        Add category
                    </Button>
                </div>
            </Flex>
            <Divider />

            <TableCategory />

            <DrawerDetailsCategory />

            <ModalCategory />
        </div>
    )
}

export default CategoryPage