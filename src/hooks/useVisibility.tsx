const useVisibility = (currentPath: string, routes: string[]) => {
  return routes.some(route => {
    // แปลง route pattern เป็น regex
    const pattern = route
      .replace(/\[.*?\]/g, '[^/]+')  // แปลง [id] เป็น pattern ที่รับได้ทุกค่าที่ไม่มี /
      .replace(/\*/g, '.*')          // แปลง * เป็น pattern ที่รับได้ทุกค่า
      .replace(/:\w+/g, '[^/]+');    // แปลง :id เป็น pattern ที่รับได้ทุกค่าที่ไม่มี /
    
    const regex = new RegExp(`^${pattern}$`);
    return regex.test(currentPath);
  });
};

export default useVisibility;
