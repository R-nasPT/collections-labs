export const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ' ' || e.keyCode === 32) { // ห้าม space bar ทั้งสองตัวมีค่าเท่ากัน
      e.preventDefault();
      
    }
  };