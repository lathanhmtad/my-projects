import React from 'react'
import { ListResponse } from "../../utils/FetchUtils"

interface ManageMainProps {
    listResponse: ListResponse
    isLoading: boolean
    children: React.ReactNode
}

function ManageMain({ listResponse, isLoading, children }: ManageMainProps) {
    return (
        <div
            style={{
                width: '100%',
            }}
        >
            {children}
        </div>
    )
}

export default ManageMain