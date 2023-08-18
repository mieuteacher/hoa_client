import React, { useEffect } from 'react';

export default function LogoutPage() {
  useEffect(() => {
    // Xóa token từ localStorage
    localStorage.removeItem('token');
    // Chuyển người dùng đến trang đăng nhập sau khi xóa token
    window.location.href = "/login";
  }, []);

  return <div>Logging out...</div>;
}
