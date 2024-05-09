var selectedVoucherId = null;
var discount = null;
let checkedIds = []; // Khởi tạo mảng để lưu trữ các ID được chọn
var originalPriceInput = document.getElementById("originalPriceInput").value;
var priceCheckbox = 0;
var totalPriceRoom = Number(originalPriceInput); // Lưu trữ giá trị ban đầu của tổng giá phòng
var confirmedPrice = 0;
var voucherId = 0;
var totalDefault = 0;

function handleCheckboxChange(checkbox) {
    const facilityId = Number(checkbox.value);
    const facilityPriceInput = checkbox.parentNode.querySelector(
        "#facilityPriceInput"
    );
    const facilityPrice = Number(facilityPriceInput.value);

    if (checkbox.checked) {
        checkedIds.push(facilityId);
        totalPriceRoom += facilityPrice;
        priceCheckbox += facilityPrice;
        totalDefault += facilityPrice;
        calculateTotal();
    } else {
        const index = checkedIds.indexOf(facilityId);
        if (index !== -1) {
            checkedIds.splice(index, 1);
            totalPriceRoom -= facilityPrice;
            priceCheckbox -= facilityPrice;
            totalDefault_ = facilityPrice;
            calculateTotal();
        }
    }

    var formattedTotalPrice = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    }).format(totalPriceRoom);

    console.log("TotalPriceRoom: " + totalPriceRoom);

    document.getElementById("totalpriceRoom").innerHTML = formattedTotalPrice;
    document.getElementById("discountedPriceInput").value = totalPriceRoom;
    document.getElementById("originalPriceInput").value = totalPriceRoom;
    if (selectedVoucherId) {
        use(this.selectedVoucherId);
    }
    calculateTotal();
}

function booking(action) {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1;
    let day = currentDate.getDate();
    month = (month < 10 ? "0" : "") + month;
    day = (day < 10 ? "0" : "") + day;
    const formattedDate = `${year}-${month}-${day}`;

    const requestData = {
        paymentMethod: action,
        checkInAt: document.getElementById("checkInDate").value,
        checkOutAt: document.getElementById("checkOutDate").value,
        createAt: formattedDate,
        roomId: document.getElementById("room_id").value,
        userId: 4,
        total: confirmedPrice,
        facilityId: checkedIds,
    };

    if (selectedVoucherId !== null && discount != 0 && discount) {
        requestData.voucherId = selectedVoucherId;
    }

    if (discount != 0 && discount) {
        requestData.discount = discount;
    }
    console.log(requestData);
    axios
        .post("/booking", requestData)
        .then((response) => {
            window.location.href = response.data;

            console.log("Success:", response.data);
        })
        .catch((error) => {
            var message;
            if (error.response) {
                message = error.response.data.message;
            } else {
                message = "Lỗi vui lòng kiểm tra lại!";
            }

            Swal.fire({
                title: "Thông báo!",
                text: message,
                icon: "error",
            });
        });
}

// lấy danh sach vch còn hạn
function btnDiscounts() {
    axios
        .get("/booking/getCoupons")
        .then((response) => {
            console.log(response.data);
            voucherId = response.data.id;
            displayVoucher(response.data);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

function displayVoucher(data) {
    var labelContainer = $(".scrollable-container");
    labelContainer.empty();
    // labelContainer.append("<h5>Chọn voucher để giảm giá thanh toán</h5>");

    if (Array.isArray(data) && data.length > 0) {
        data.forEach(function (voucher, index) {
            var voucherHTML = `
             <label for="voucherRadio${index}" class="rounded shadow-lg" id="clickableLabel${index}">
                    <div class="voucherCt" id="clickableDiv${index}">
  <div class="">
  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-gs0gGCrML31yHfDPEXfRXulOXbjynqYnBg&usqp=CAU"  alt="">
  <p><b>Giảm <span>${voucher.discount} ${
                voucher.voucherType == 1 ? "%" : "đ"
            }</span> cho đơn hàng từ <span>${voucher.minApply + "đ"} 
   tối đa ${voucher.maxApply + "đ"}</b></p>
<input type="radio" name="voucher" id="voucherRadio${index}" onclick="use('${
                voucher.id
            }')" ${voucher.id == this.selectedVoucherId ? "checked" : ""}>
  </div>
                      </div>
                       <div style="background-color: white; border-radius: 0 0 5px 5px;" class="timeVoucher">
                        <img src="client/images/Lock.png" style="height: 20px; width: 20px;" alt="">
                           <h6>Voucher Sẽ Kết Thúc Ngày <br>   <b>${
                voucher.endAt
            }</b></h6>
                           <h6>Số Lượng <br>   <b>${voucher.quantity}</b></h6>
                           <h6>Mã Voucher <br>   <b>${
                voucher.voucherCode
            }</b></h6>

                     </div>
                                                    </label>
               `;
            labelContainer.append(voucherHTML);
        });
    }
}

function use(voucherId) {
    calculateTotal();

    localStorage.setItem("selectedVoucher", voucherId);
    var totalAmount = document.getElementById("originalPriceInput").value; // lấy giá gốc không thay đổi
    document.getElementById("totalpriceRoom").innerHTML = totalAmount;

    console.log("Total " + totalAmount);
    axios
        .get("/booking/findById?idVch=" + voucherId)
        .then((response) => {
            console.log(response.data);

            var voucher = response.data;
            if (voucher.minApply <= totalAmount) {
                var discountedAmount = totalDiscount(
                    totalAmount,
                    voucher.voucherType,
                    voucher.minApply,
                    voucher.maxApply,
                    voucher.discount
                );

                var formattedDiscountedPrice = new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                }).format(discountedAmount);

                var formattedTotalPrice = new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                }).format(totalAmount - discountedAmount);

                document.getElementById("totalpriceRoom").innerHTML =
                    formattedTotalPrice;

                document.getElementById("reduction").innerHTML =
                    "- " + formattedDiscountedPrice;

                document.getElementById("discountedPriceInput").value =
                    totalAmount - discountedAmount; // gán giá được giảm cho ô input để lưu

                discount = discountedAmount;

                this.selectedVoucherId = voucherId;

                calculateTotal();
            } else {
                Swal.fire({
                    title: "Thông báo",
                    text: "Số Tiền không đủ để sử dụng voucher này.",
                    icon: "error",
                });
            }
        })
        .catch((error) => {
            console.error("Error:", error);
            Swal.fire({
                title: "Lỗi",
                text: "Đã xảy ra lỗi khi xử lý yêu cầu.",
                icon: "error",
            });
        });
}

function totalDiscount(totalAmount, voucherType, minApply, maxApply, discount) {
    var discountedPrice = 0;

    if (voucherType == 1) {
        discount = discount / 100;
        var discountedPrice = totalAmount * discount;
    } else {
        discountedPrice = discount;
    }
    if (discountedPrice > maxApply) {
        discountedPrice = maxApply;
    }
    return discountedPrice;
}

// tính tổng cộng để lưu
function calculateTotal() {
    console.log(originalPriceInput + "gia goc");
    console.log(discount + "gia vch");
    console.log(priceCheckbox + "gia priceCheckbox");

    axios
        .get("/booking/calculateTotal", {
            params: {
                originalPriceInput: originalPriceInput,
                // discount: (discount == null) ? 0 : discount, // chuyển null thành số để tính
                voucherId: selectedVoucherId,
                priceCheckbox: priceCheckbox == null ? 0 : priceCheckbox,
            },
        })
        .then((response) => {
            confirmedPrice = response.data;

            var formattedTotalPrice = new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
            }).format(confirmedPrice);

            document.getElementById("totalpriceRoom").innerHTML = formattedTotalPrice;
            console.log(response.data);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

$(document).ready(function () {
    // totalDefault = document.getElementById("totalpriceRoom").v
    calculateTotal();
});
