const userInfoApi = {
  getUserInfo: async (userID) => {
    try {
      const response = await fetch(
        `http://localhost:7090/api/user/get?userID=${userID}`
      );

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
