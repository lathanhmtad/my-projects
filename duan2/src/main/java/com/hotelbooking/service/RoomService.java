package com.hotelbooking.service;


import com.hotelbooking.entity.Room;
import com.hotelbooking.enums.RoomStatus;
import com.hotelbooking.enums.RoomType;
import com.hotelbooking.exception.common.EntityNotFoundException;
import com.hotelbooking.exception.common.ParamInvalidException;
import com.hotelbooking.exception.core.ApplicationException;
import com.hotelbooking.model.dto.RoomDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;

public interface RoomService {
    Page<RoomDto> findAllRoomAvailable(RoomType type, int capacity, List<Long> excludedIds, Pageable pageable);

    Page<RoomDto> getAll(Pageable pageable);

    RoomDto findById(Long id) throws EntityNotFoundException;

    void delete(Long id) throws ApplicationException;

    void createOrUpdate(RoomDto roomDto ) throws ParamInvalidException;

    Page<RoomDto> findAllByDelete(Boolean isDelete, Pageable pageable);

    Page<RoomDto> findAllByStatus(RoomStatus roomStatus, Pageable pageable);

    Room getById(Long id);

    void checkRoomAvailable(Long roomId, LocalDate from, LocalDate to) throws ApplicationException;
}
