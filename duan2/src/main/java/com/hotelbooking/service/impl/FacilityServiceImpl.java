package com.hotelbooking.service.impl;

import com.hotelbooking.entity.Facility;
import com.hotelbooking.exception.common.EntityNotFoundException;
import com.hotelbooking.exception.common.ParamInvalidException;
import com.hotelbooking.mapper.FacilityMapper;
import com.hotelbooking.model.dto.FacilityDto;
import com.hotelbooking.repository.FacilityRepository;
import com.hotelbooking.service.FacilityService;
import com.hotelbooking.utils.ValidatorUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FacilityServiceImpl implements FacilityService{

    private final FacilityMapper facilityMapper;
    private final FacilityRepository facilityRepository;

    @Override
    public Page<FacilityDto> finAll(Integer page, Integer size){
        Pageable pageable = PageRequest.of(page,size);
        Page<Facility> facilityPage = facilityRepository.findAllByDelete(false,pageable);
        return facilityPage.map(facilityMapper::apply);
    }

    @Override
    public FacilityDto findById(Long id) throws EntityNotFoundException {
        Optional<Facility> facility = facilityRepository.findById(id);
        if(facility.isEmpty()) throw new EntityNotFoundException("Not found Facility with id " + id);
        return facilityMapper.apply(facility.get());
    }

    @Override
    public Facility create(FacilityDto facilityDto) throws ParamInvalidException {
        ValidatorUtils.checkNullParam(facilityDto);
         Facility facility =  facilityMapper.appToFacility(facilityDto);
         facility.setIsDelete(false);

        return facilityRepository.save(facility);
    }

    @Override
    public Facility update(FacilityDto facilityDto, Long id) throws ParamInvalidException, EntityNotFoundException {
        ValidatorUtils.checkNullParam(facilityDto);
        Optional<Facility> facility = facilityRepository.findById(id);
        if(facility.isEmpty()) throw  new EntityNotFoundException("Not facility found");
        facilityDto.setId(id);
        return facilityRepository.save(facilityMapper.appToFacility(facilityDto));
    }

    @Override
    public void delete(Long id) throws EntityNotFoundException {

        Facility facility = facilityRepository.findById(id).orElseThrow(
                () ->  new EntityNotFoundException("Không tìm thấy dịch vụ!"));

        facility.setIsDelete(true);
        facilityRepository.save(facility);
    }

    @Override
    public List<Facility> getAll() {
        return facilityRepository.findAll();
    }
}
