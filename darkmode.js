// document.addEventListener("DOMContentLoaded", function () {
//     const toggleBtn = document.getElementById("modeToggle");
//     const isDarkMode = localStorage.getItem("darkMode") === "true";
  
//     // Set initial state
//     if (isDarkMode) {
//       document.documentElement.classList.add("dark");
//       updateChatbotTheme(true);
//       updateIcon(true);
//     }
  
//     toggleBtn.addEventListener("click", () => {
//       document.documentElement.classList.toggle("dark");
//       const darkModeEnabled = document.documentElement.classList.contains("dark");
//       localStorage.setItem("darkMode", darkModeEnabled);
//       updateChatbotTheme(darkModeEnabled);
//       updateIcon(darkModeEnabled);
//     });
  
//     function updateChatbotTheme(isDark) {
//       const chatbot = document.getElementById("chatbotContainer");
//       if (!chatbot) return;
  
//       if (isDark) {
//         chatbot.classList.add("bg-gray-800", "text-white", "border-gray-700");
//         chatbot.classList.remove("bg-white", "text-black", "border-gray-300");
//       } else {
//         chatbot.classList.add("bg-white", "text-black", "border-gray-300");
//         chatbot.classList.remove("bg-gray-800", "text-white", "border-gray-700");
//       }
//     }
  
//     function updateIcon(isDark) {
//       const icon = toggleBtn.querySelector("i");
//       if (isDark) {
//         icon.classList.replace("fa-moon", "fa-sun");
//       } else {
//         icon.classList.replace("fa-sun", "fa-moon");
//       }
//     }
// });
document.addEventListener("DOMContentLoaded", function () {
    const toggleBtn = document.getElementById("modeToggle");
    const isDarkMode = localStorage.getItem("darkMode") === "true";
  
    // Set initial state
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      updateIcon(true);
    }
  
    toggleBtn.addEventListener("click", () => {
      document.documentElement.classList.toggle("dark");
      const darkModeEnabled = document.documentElement.classList.contains("dark");
      localStorage.setItem("darkMode", darkModeEnabled);
      updateIcon(darkModeEnabled);
    });
  
    function updateIcon(isDark) {
      const icon = toggleBtn.querySelector("i");
      if (isDark) {
        icon.classList.replace("fa-moon", "fa-sun");
      } else {
        icon.classList.replace("fa-sun", "fa-moon");
      }
    }
});