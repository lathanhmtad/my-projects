import ManagerPath from "../../constants/ManagerPath"
import ResourceUrl from "../../constants/ResourceUrl"
import { Configs } from "../../types/Configs"

class CategoryConfigs extends Configs {
    static managerPath = ManagerPath.CATEGORY
    static resourceUrl = ResourceUrl.CATEGORY
    static resourceKey = 'categories'
    static createTitle = 'Thêm danh mục'
    static updateTitle = 'Cập nhập danh mục'
    static manageTitle = 'Quản lý danh mục'
}

export default CategoryConfigs