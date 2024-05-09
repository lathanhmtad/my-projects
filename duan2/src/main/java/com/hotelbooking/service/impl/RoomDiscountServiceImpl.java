package com.hotelbooking.service.impl;

import com.hotelbooking.entity.Discount;
import com.hotelbooking.entity.Room;
import com.hotelbooking.entity.RoomDiscount;
import com.hotelbooking.enums.RoomType;
import com.hotelbooking.exception.common.EntityNotFoundException;
import com.hotelbooking.exception.common.ParamInvalidException;
import com.hotelbooking.repository.RoomDiscountRepository;
import com.hotelbooking.repository.RoomRepository;
import com.hotelbooking.service.RoomDiscountService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RoomDiscountServiceImpl implements RoomDiscountService {

    private final RoomDiscountRepository roomDiscountRepository;

    private final RoomRepository roomRepository;

    @Override
    public void addDiscountForAllRoom(Long discountId) throws EntityNotFoundException {

        Discount discount = new Discount();

        discount.setId(discountId);

        List<Room> roomNotDiscount = roomDiscountRepository.findRoomNotDiscount();
        System.out.println(roomNotDiscount.size());
        if (roomNotDiscount.isEmpty()){
            throw new EntityNotFoundException("Tất cả các loại phòng đều được áp dụng giảm giá");
        }

        for(Room room : roomNotDiscount){
            RoomDiscount roomDiscount = new RoomDiscount();

            roomDiscount.setDiscount(discount);
            roomDiscount.setRoom(room);

            roomDiscountRepository.save(roomDiscount);
        }
    }

    @Override
    public void addDiscountForRoom(RoomType roomType, Long discountId) throws ParamInvalidException, EntityNotFoundException {

        List<Room> rooms = roomRepository.findByType(roomType);

        RoomDiscount checkRoomDiscount = roomDiscountRepository.findByRoomId(roomType);

        if (rooms.isEmpty()) {
            throw new EntityNotFoundException("Loại phòng này hiện tại chưa có phòng nào!");
        }

        if (checkRoomDiscount != null){
            throw new ParamInvalidException("Loại phòng này hiện tại đã có giảm giá");
        }


        Discount discount = new Discount();
        discount.setId(discountId);

        for (Room room: rooms) {
            RoomDiscount roomDiscount = RoomDiscount.builder()
                    .discount(discount)
                    .room(room)
                    .build();
            roomDiscountRepository.save(roomDiscount);
        }
    }

    @Override
    public void removeDiscountForRoom(Long id) throws EntityNotFoundException {

        List<RoomDiscount> roomDiscounts = roomDiscountRepository.findByDiscountId(id);

        if (roomDiscounts.isEmpty()){
            throw new EntityNotFoundException("Mã giảm giá hiện tại chưa được áp dụng!");
        }

        for (RoomDiscount roomDiscount:roomDiscounts) {
            roomDiscountRepository.delete(roomDiscount);
        }
    }
}
