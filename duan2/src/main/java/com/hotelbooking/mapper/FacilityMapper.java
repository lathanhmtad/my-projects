package com.hotelbooking.mapper;

import com.hotelbooking.entity.Facility;
import com.hotelbooking.model.dto.FacilityDto;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class FacilityMapper implements Function<Facility, FacilityDto> {
    public FacilityDto apply(Facility facility){
        return FacilityDto.builder()
                .id(facility.getId())
                .price(facility.getPrice())
                .name(facility.getName())
                .notes(facility.getNotes())
                .isDelete(facility.getIsDelete())
                .build();
    }

    public Facility appToFacility(FacilityDto facilityDto){
        return Facility.builder()
                .id(facilityDto.getId())
                .notes(facilityDto.getNotes())
                .price(facilityDto.getPrice())
                .name(facilityDto.getName())
                .isDelete(facilityDto.getIsDelete())
                .build();
    }
}
