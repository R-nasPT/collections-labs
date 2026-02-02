import { TimePicker } from './TimePicker';

<TimePicker
  value={time}
  onChange={setTime}
  interval={15}
  placeholder="เลือกเวลา"
  className="w-32"
/>

// With form validation for react-hook-form
<TimePicker
  value={time}
  onChange={setTime}
  aria-invalid={!!errors.time}
/>
