<InfoSection 
  title="ประวัติเอกสาร"
  icon={FaFileAlt}
  subtitle="3 ครั้ง"
  infoItems={[
    { label: 'สร้างเมื่อ', value: '15 พ.ย. 2566' },
    { label: 'แก้ไขล่าสุด', value: '16 พ.ย. 2566' },
    { label: 'จำนวนแก้ไข', value: '3 ครั้ง' }
  ]}
  onClickAction={() => console.log('Open document history')}
/>

// Attachments Usage
<InfoSection 
  title="แนบเอกสาร"
  icon={IoDocumentAttach}
  subtitle={`${attachments.length} ไฟล์`}
  infoItems={[
    // {
    //   label: "สร้างเมื่อ",
    //   value: "15 พ.ย. 2566 Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi,soluta.",
    //   valueClassName: "whitespace-nowrap",
    // },
    { label: 'ประเภท', value: 'เอกสารทั่วไป' },
    { 
      label: 'ขนาดรวม', 
      value: `${totalSize} KB`,
      valueClassName: 'text-blue-600'
    },
    { 
      label: 'สถานะ', 
      value: 'พร้อมใช้งาน', 
      valueClassName: 'text-green-600' 
    }
  ]}
  onClickAction={() => console.log('Open attachments')}
/>
