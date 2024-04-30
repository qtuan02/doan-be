
class Message{
    static LOGIN_SUCCESS = "Đăng nhập thành công.";
    static LOGIN_FAIL = "Đăng nhập thất bại!";
    
    static FILED_EMPTY = "Các trường dữ liệu không được trống!";

    static NOT_FOUND_STAFF = "Không tìm thấy tài khoản nhân viên!";
    static WRONG_PASSWORD = "Mật khẩu không chính xác!";

    static NOT_FOUND_FILE = "Không tìm thấy file ảnh có đuôi png, jpg và jpeg!";
    static UPLOAD_SUCCESS = "Tải ảnh lên thành công.";
}

module.exports = Message;