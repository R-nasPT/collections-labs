<SearchSelectField
  name="example"
  placeholder="Select an option"
  options={[
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
  ]}
  defaultValue={{ value: 'option1', label: 'Option 1' }}
/>

const [selectedOption, setSelectedOption] = useState(null);

<SearchSelectField
  name="controlledField"
  placeholder="Select an option"
  options={options} // หรือใช้ loadOptions={loadOptionsFunction}
  value={selectedOption}
  onChange={(option) => setSelectedOption(option)}
/>

const options = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];

<SearchSelectField
  name="staticField"
  placeholder="Select a static option"
  control={control}
  errors={errors}
  options={options}
/>

// ถ้าคุณต้องการจัดการกับการสร้างตัวเลือกใหม่แบบพิเศษ (เช่น ส่งข้อมูลไปยัง API หรือทำการตรวจสอบก่อนสร้าง) ให้ใช้ onCreateOption
// ถ้าคุณต้องการจัดการกับทุกการเปลี่ยนแปลง (ทั้งการเลือกและการสร้างใหม่) ในที่เดียว ให้ใช้ onChange 
// คุณสามารถใช้ทั้งสองอย่างร่วมกันได้ โดย onCreateOption จะทำงานก่อน แล้วตามด้วย onChange
// หากคุณไม่ได้กำหนด onCreateOption ตัวเลือกใหม่จะถูกสร้างโดยอัตโนมัติและส่งไปยัง onChange
// สรุปคือ คุณไม่จำเป็นต้องใช้ onCreateOption ก็ได้ แต่การใช้มันอาจช่วยให้คุณจัดการกับการสร้างตัวเลือกใหม่ได้ละเอียดและยืดหยุ่นมากขึ้น
  
<AsyncCreatableSelect
  // ...other props
  onChange={(newValue) => {
    // ทำงานทั้งกับตัวเลือกที่มีอยู่แล้วและตัวเลือกที่สร้างใหม่
    console.log('Selected or created:', newValue);
    // อัปเดต state หรือทำอย่างอื่นตามต้องการ
  }}
  onCreateOption={(inputValue) => {
    // ทำงานเฉพาะเมื่อสร้างตัวเลือกใหม่
    console.log('Creating new option:', inputValue);
    // อาจจะทำการตรวจสอบหรือปรับแต่งค่าก่อนที่จะสร้างตัวเลือกใหม่
    // หรือส่งค่าไปยัง API เพื่อบันทึกตัวเลือกใหม่
  }}
/>
