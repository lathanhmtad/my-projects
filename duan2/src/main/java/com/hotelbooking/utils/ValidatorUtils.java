package com.hotelbooking.utils;

import com.hotelbooking.exception.common.ParamInvalidException;

public class ValidatorUtils {

    public static void checkNullParam(Object... obj) throws ParamInvalidException {
        for (Object object : obj){
            if(object == null || object.equals("")){
                throw new ParamInvalidException("Vui lòng nhập đầy đủ thông tin!");
            }
        }
    }
}
