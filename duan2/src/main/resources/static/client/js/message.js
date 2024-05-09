$(document).ready(function () {
    const bookingResponse = JSON.parse(localStorage.getItem('bookingResponse'));
// Kiểm tra nếu bookingResponse không null hoặc undefined, và sau đó sử dụng dữ liệu đã lưu
    if (bookingResponse) {
        // Thực hiện xử lý với dữ liệu đã lưu
        console.log(bookingResponse);
        // Ví dụ: Hiển thị thông tin từ bookingResponse lên giao diện người dùng
    }

});