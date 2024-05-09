import Title from "antd/es/typography/Title"

interface ManageHeaderTitleProps {
    title: string
}

function ManageHeaderTitle({title} : ManageHeaderTitleProps) {
    return (
        <Title level={2}>{title}</Title>
    )
}

export default ManageHeaderTitle