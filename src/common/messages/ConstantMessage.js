
class Message{
    static FIND_PRODUCT = "Danh sách sản phẩm.";
    static FIND_CATEGORY = "Danh sách danh mục.";
    static FIND_BRAND = "Danh sách thương hiệu.";
    static FIND_ORDER = "Danh sách đặt hàng.";
    static FIND_CUSTOMER = "Danh sách khách hàng.";

    static NOT_FOUND_ORDER = "Không tìm thấy đơn đặt hàng!";
    static ADD_ORDER_FAIL = "Đặt hàng thất bại!";
    static ADD_ORDER_SUCCESS = "Đặt hàng thành công.";
    static NOT_FOUND_PRODUCT_CART = "Giỏ hàng không có sản phẩm nào!";
    static UPDATE_STATUS_ORDER_FAIL = "Cập nhật trạng thái đơn đặt hàng thất bại!";
    static UPDATE_STATUS_ORDER_SUCCESS = "Cập nhật trạng thái đơn đặt hàng thành công.";

    static ADD_ITEM_FAIL = "Thêm sản phẩm vào giỏ hàng thất bại!";
    static ADD_ITEM_SUCCESS = "Thêm sản phẩm vào giỏ hàng thành công.";
    static NOT_FOUND_CART = "Không tìm thấy sản phẩm này trong giỏ hàng!";
    static DELETE_CART_FAIL = "Xóa sản phẩm khỏi giỏ hàng thất bại!";
    static DELETE_CART_SUCCESS = "Xóa sản phẩm khỏi giỏ hàng thành công.";
    static CHANGE_QUANTITY_FAIL = "Cập nhật số lượng sản phẩm thất bại!";
    static CHANGE_QUANTITY_SUCCESS = "Cập nhật số lượng sản phẩm thành công.";
    static PRODUCT_OVER = "Sản phẩm đã hết hàng!";
    static QUANTITY_MUCH = "Số lượng sản phẩm không đủ để đáp ứng!";
    static PRODUCT_EXIST = "Sản phẩm đã có trong giỏ hàng!";

    static CREATE_CUSTOMER_SUCCESS = "Tạo tài khoản khách hàng thành công.";
    static CREATE_CUSTOMER_FAIL = "Tạo tài khoản khách hàng thất bại!";
    static UPDATE_CUSTOMER_SUCCESS = "Cập nhật thông tin người dùng thành công.";
    static UPDATE_CUSTOMER_FAIL = "Cập nhật thông tin người dùng thất bại!";
    static NOT_FOUND_CUSTOMER = "Không tìm thấy tài khoản người dùng!";
    static FOUND_CUSTOMER_SUCCESS = "Tìm thấy tài khoản thành công.";
    static CHANGE_PASSWORD_FAIL = "Thay đổi mật khẩu thất bại!";
    static CHANGE_PASSWORD_SUCCESS = "Thay đổi mật khẩu thành công.";

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

    static EMAIL_EXIST = "Email đã tồn tại!";
    static PHONE_EXIST = "Số điện thoại đã tồn tại!";

    static UNAUTHORIZED = "Không có quyền truy cập!";
    static TOKEN_EXPIRED = "Tài khoản đã hết hạn đăng nhập!";
}

module.exports = Message;