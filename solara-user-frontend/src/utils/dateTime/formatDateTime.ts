export function formatDateTime(dateTime: string): string {
    const date = new Date(dateTime);

    // Lấy các phần ngày, tháng, năm
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Tháng bắt đầu từ 0
    const year = date.getFullYear();

    // Lấy các phần giờ, phút, giây
    // let hours = date.getHours();
    // const minutes = date.getMinutes().toString().padStart(2, '0');
    // const seconds = date.getSeconds().toString().padStart(2, '0');

    // // Xác định AM hoặc PM
    // const ampm = hours >= 12 ? 'PM' : 'AM';
    // hours = hours % 12 || 12; // Đổi thành giờ 12 tiếng và đảm bảo 0 giờ thành 12

    // Trả về chuỗi đã định dạng
    return `Ngày ${day} tháng ${month} năm ${year}`;
}