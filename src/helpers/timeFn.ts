// เมื่อหลังจาก 1 สัปดาห์ ลบค่า 'seller-portal-onboarding' ออกจาก localStorage
setTimeout(function() {
    localStorage.removeItem('seller-portal-onboarding');
}, 7 * 24 * 60 * 60 * 1000); // 1 สัปดาห์มี 7 วัน, 1 วันมี 24 ชั่วโมง, 1 ชั่วโมงมี 60 นาที, 1 นาทีมี 60 วินาที, 1 วินาทีมี 1000 มิลลิวินาที



useEffect(() => {
    const timeout = setTimeout(
      () => {
        localStorage.removeItem('seller-centre')
      },
      1000,
    )

    // เมื่อ Component ถูก Unmount ให้ลบ timeout เพื่อป้องกันการเกิด memory leak
    return () => clearTimeout(timeout)
  }, []) // ให้ useEffect ทำงานเมื่อ Component ถูกโหลดครั้งแรกเท่านั้น
