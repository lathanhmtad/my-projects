import { useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import { Button, Flex, Space, Typography, Divider } from "antd"
import { PlusCircleOutlined } from '@ant-design/icons'

// import components
// import DrawerDetailsBrand from "../../../Components/Admin/Users/DrawerDetailsBrand";
import { setOpenModal } from "../../../redux/slices/brands/brandSlice";
import TableBrand from "../../../Components/Admin/Brands/TableBrand";
import { resetIsActionSuccess } from "../../../redux/slices/brands/brandSlice";
import ModalBrand from "../../../Components/Admin/Brands/ModalBrand";


const BrandPage = () => {
    const dispatch = useDispatch()

    const {
        isActionSuccess,
        message
    } = useSelector(state => state.brand)

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
        <div>
            <Flex align="center" justify="space-between">
                <Space
                    direction="vertical"
                    size="small"
                >
                    <Typography.Title style={{ marginBottom: 0 }} level={2}>Brands</Typography.Title>
                    <Typography.Title level={5}>Brands management</Typography.Title>
                </Space>
                <div>
                    <Button
                        type="primary"
                        icon={<PlusCircleOutlined />}
                        onClick={() => dispatch(setOpenModal(true))}
                        size="large">
                        Add brand
                    </Button>
                </div>
            </Flex>
            <Divider />

            <TableBrand />

            {/* <DrawerDetailsBrand /> */}

            <ModalBrand />
        </div>
    )
}

export default BrandPage