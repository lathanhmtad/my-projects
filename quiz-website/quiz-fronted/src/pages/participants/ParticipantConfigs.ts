import ManagerPath from "../../constants/ManagerPath"
import ResourceUrl from "../../constants/ResourceUrl"
import { Configs } from "../../types/Configs"

class ParticipantConfigs extends Configs {
    static managerPath = ManagerPath.PARTICIPANT
    static resourceUrl = ResourceUrl.PARTICIPANT
    static resourceKey = 'participants'
    static manageTitle = 'Quản lý người dùng'
    static createTitle = 'Thêm người dùng'
    static updateTitle = 'Cập nhật người dùng'
}

export default ParticipantConfigs