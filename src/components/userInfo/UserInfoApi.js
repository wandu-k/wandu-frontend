const userInfoApi = {
  getUserInfo: async () => {
    try {
      const response = await fetch("http://api.example.com/userInfo");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const userInfo = await response.json();
      return userInfo;
    } catch (error) {
      console.error("Error fetching user info:", error);
      return null;
    }
  },
};

export default userInfoApi;
