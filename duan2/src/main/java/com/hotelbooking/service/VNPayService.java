package com.hotelbooking.service;

import jakarta.servlet.http.HttpServletRequest;

import java.io.UnsupportedEncodingException;

public interface VNPayService {
    String createPayment(Long amount, HttpServletRequest req) throws UnsupportedEncodingException;
}
