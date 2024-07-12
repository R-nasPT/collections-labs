export const fetchUserData = async (userId) => {
  try {
    const response = await fetch(`/api/users/${userId}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    throw error;
  }
};

// example
const [userState, updateUserState] = useUserState({ name: "", email: "" });

useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchUserData(1); // ตัวอย่างการดึงข้อมูลผู้ใช้ที่มี id 1
        updateUserState(data);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchData();
  }, []);

console.log('User State:', userState);
