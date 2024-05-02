
class Message{
    static FIND_PRODUCT = "Danh sách sản phẩm.";

    static NOT_FOUND_PRODUCT = "Không tìm thấy sản phẩm!";
    static CREATE_PRODUCT_SUCCESS = "Tạo sản phẩm thành công.";
    static CREATE_PRODUCT_FAIL = "Tạo sản phẩm thất bại!";
    static DELETE_PRODUCT_SUCCESS = "Xóa sản phẩm thành công.";
    static DELETE_PRODUCT_FAIL = "Xóa sản phẩm thất bại!";
    static UPDATE_PRODUCT_SUCCESS = "Cập nhật sản phẩm thành công.";
    static UPDATE_PRODUCT_FAIL = "Cập nhật sản phẩm thất bại!";

    static NOT_FOUND_CATEGORY = "Không tìm thấy danh mục!";
    static CREATE_CATEGORY_SUCCESS = "Tạo danh mục thành công.";
    static CREATE_CATEGORY_FAIL = "Tạo danh mục thất bại!";
    static DELETE_CATEGORY_SUCCESS = "Xóa danh mục thành công.";
    static DELETE_CATEGORY_FAIL = "Xóa danh mục thất bại!";
    static UPDATE_CATEGORY_SUCCESS = "Cập nhật danh mục thành công.";
    static UPDATE_CATEGORY_FAIL = "Cập nhật danh mục thất bại!";

    static NOT_FOUND_BRAND = "Không tìm thấy thương hiệu!";
    static CREATE_BRAND_SUCCESS = "Tạo thương hiệu thành công.";
    static CREATE_BRAND_FAIL = "Tạo thương hiệu thất bại!";
    static DELETE_BRAND_SUCCESS = "Xóa thương hiệu thành công.";
    static DELETE_BRAND_FAIL = "Xóa thương hiệu thất bại!";
    static UPDATE_BRAND_SUCCESS = "Cập nhật thương hiệu thành công.";
    static UPDATE_BRAND_FAIL = "Cập nhật thương hiệu thất bại!";

    static LOGIN_SUCCESS = "Đăng nhập thành công.";
    static LOGIN_FAIL = "Đăng nhập thất bại!";
    
    static FILED_EMPTY = "Các trường dữ liệu không được trống!";

    static NOT_FOUND_STAFF = "Không tìm thấy tài khoản nhân viên!";
    static WRONG_PASSWORD = "Mật khẩu không chính xác!";

    static NOT_FOUND_FILE = "Không tìm thấy file ảnh có đuôi png, jpg và jpeg!";
    static UPLOAD_SUCCESS = "Tải ảnh lên thành công.";
}

module.exports = Message;