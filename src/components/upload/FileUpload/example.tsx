function MyComponent() {
  const handleFileSelect = (file: File) => {
    // จัดการกับไฟล์ที่ถูกเลือก
    console.log('Selected file:', file);
  };

  return (
    <FileUpload
      onFileSelect={handleFileSelect}
      maxSize={5} // ขนาดไฟล์สูงสุด (MB)
      acceptedTypes={['image/*', 'application/pdf']} // ประเภทไฟล์ที่ยอมรับ
      label="Upload Document" // ข้อความที่แสดง
    />
  );
}
