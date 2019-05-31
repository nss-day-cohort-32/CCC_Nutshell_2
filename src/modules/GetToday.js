export default Object.create(null, {
  getToday: {
    value: function() {
      const now = new Date();
      const today =
        now.getFullYear() +
        "-" +
        ((now.getMonth() < 9 ? `0` : ``) + (now.getMonth() + 1)) +
        "-" +
        now.getDate();
        return today
    }
  }
});
