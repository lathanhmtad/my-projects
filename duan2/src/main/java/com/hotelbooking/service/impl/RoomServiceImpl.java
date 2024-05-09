package com.hotelbooking.service.impl;

import com.hotelbooking.entity.*;
import com.hotelbooking.enums.RoomStatus;
import com.hotelbooking.enums.RoomType;
import com.hotelbooking.exception.common.EntityNotFoundException;
import com.hotelbooking.exception.common.ParamInvalidException;
import com.hotelbooking.exception.core.ApplicationException;
import com.hotelbooking.mapper.RoomMapper;
import com.hotelbooking.model.dto.AmenitiesDto;
import com.hotelbooking.model.dto.RoomDto;
import com.hotelbooking.repository.RoomAmenitiesRepository;
import com.hotelbooking.repository.RoomImageRepository;
import com.hotelbooking.repository.RoomRepository;
import com.hotelbooking.service.RoomService;
import com.hotelbooking.service.UploadImageService;
import com.hotelbooking.utils.ValidatorUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RoomServiceImpl implements RoomService {
    private final RoomRepository roomRepository;
    private final RoomMapper roomMapper;
    private final RoomAmenitiesRepository roomAmenitiesRepository;
    private final RoomImageRepository roomImageRepository;
    private final UploadImageService uploadImageService;


    @Override
    public RoomDto findById(Long id) throws EntityNotFoundException {
        return roomRepository.findById(id).map(roomMapper).orElseThrow(() -> new EntityNotFoundException("Room not found"));
    }

    @Override
    public Page<RoomDto> findAllRoomAvailable(RoomType type, int capacity, List<Long> excludedIds, Pageable pageable) {
        if (excludedIds.isEmpty()) {
            System.err.println("List id null và page =  " + pageable.getPageNumber() + " type " + type + "sức chứa : " + capacity);
        }
        return excludedIds.isEmpty()
                ? roomRepository.findAllByStatusAndTypeAndCapacityAndIsDelete(RoomStatus.ACTIVE, type, capacity, false, pageable).map(roomMapper)
                : roomRepository.findAllByStatusAndTypeAndCapacityAndIsDeleteAndIdNotIn(RoomStatus.ACTIVE, type, capacity, false, excludedIds, pageable).map(roomMapper);
    }

    @Override
    public Page<RoomDto> getAll(Pageable pageable) {
        return roomRepository.findAll(pageable).map(roomMapper);
    }


    @Override
    public void delete(Long id) throws ApplicationException {
        ValidatorUtils.checkNullParam(id);
        Room room = roomRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Không tìm thấy phòng!"));

        if(isRoomDeletable(id)){
            throw new ApplicationException("Phòng này đã có khách đặt không thể xóa !");
        }

        room.setDelete(true);
        roomRepository.save(room);
    }

    @Override

    public void createOrUpdate(RoomDto roomDto) throws ParamInvalidException {
        Room existingRoom = null;

        if (roomDto.getId() != null) {
            existingRoom = roomRepository.findById(roomDto.getId()).orElse(null);
        }

        if (existingRoom == null) {
            // Nếu phòng chưa tồn tại, tạo mới phòng
            Room newRoom = new Room();
            newRoom.setDelete(false);

            BeanUtils.copyProperties(roomDto, newRoom);
            newRoom.setStatus(RoomStatus.ACTIVE);
            System.out.println(newRoom.getStatus());
            roomRepository.save(newRoom);
            saveRoomAmenities(newRoom, roomDto.getAmenities());
            saveRoomImages(newRoom, roomDto.getImages());
        } else {

            BeanUtils.copyProperties(roomDto, existingRoom);
            roomRepository.save(existingRoom);
            // Xóa tất cả các amenities của phòng cũ
            List<RoomAmenities> existingRoomAmenities = roomAmenitiesRepository.findAllByRoomId(existingRoom.getId());
            roomAmenitiesRepository.deleteAll(existingRoomAmenities);

            List<RoomImage> roomImageList = roomImageRepository.getAllByRoom(existingRoom.getId());

            if (roomDto.getImages() != null) {
                roomImageRepository.deleteAll(roomImageList);
            }

            saveRoomAmenities(existingRoom, roomDto.getAmenities());
            saveRoomImages(existingRoom, roomDto.getImages());
        }
    }

    private void saveRoomImages(Room room, List<MultipartFile> images) {
        if (images != null && !images.isEmpty()) {
            images.forEach(roomImageDto -> {
                RoomImage roomImage = new RoomImage();
                roomImage.setRoom(room);
                roomImage.setImageUrl(roomImageDto.getOriginalFilename());
                roomImageRepository.save(roomImage);
                try {
                    uploadImageService.uploadImages(Collections.singletonList(roomImageDto));
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            });
        }
    }

    private void saveRoomAmenities(Room room, List<AmenitiesDto> amenitiesList) {
        if (amenitiesList != null && !amenitiesList.isEmpty()) {
            amenitiesList.forEach(item -> {
                Amenities amenities = new Amenities();
                amenities.setId(item.getId());
                RoomAmenities roomAmenities = new RoomAmenities();
                roomAmenities.setRoom(room);
                roomAmenities.setAmenities(amenities);
                roomAmenitiesRepository.save(roomAmenities);
            });
        }
    }

    @Override
    public Page<RoomDto> findAllByDelete(Boolean isDelete, Pageable pageable) {
        return roomRepository.findAllByDelete(isDelete, pageable).map(roomMapper);
    }

//    @Override
//    public Page<RoomDto> findAllByStatus(RoomStatus status, List<Long> ids, Pageable pageable) {
//        return roomRepository.findAllByStatusAndIdNotIn(status, ids, pageable).map(roomMapper);
//    }

    @Override
    public Page<RoomDto> findAllByStatus(RoomStatus roomStatus, Pageable pageable) {
        return roomRepository.findAllByStatus(roomStatus, pageable).map(roomMapper);
    }

    @Override
    public Room getById(Long id) {
        return roomRepository.findById(id).orElse(null);
    }


    @Override
    public void checkRoomAvailable(Long roomId, LocalDate from, LocalDate to) throws ApplicationException {
        boolean check =  roomRepository.checkRoomAvailable(roomId, from, to);

        if(!check){
            throw new ApplicationException("Phòng này k còn trống vui lòng kiểm tra lại!");
        }
    }

    private boolean isRoomDeletable(Long roomId){
        LocalDate now = LocalDate.now();

        List<Booking> list = roomRepository.findByDateAndRoom(now,roomId);

        if(list.size() > 0){
            return true;
        }

        return false;
    }

}
