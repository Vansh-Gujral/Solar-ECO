document.addEventListener("DOMContentLoaded", function () {

    const authBtn = document.getElementById("authBtn");
const userGreeting = document.getElementById("userGreeting");

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // Show greeting, hide login
    const username = user.displayName || user.email || "User";
    userGreeting.textContent = `Hello, ${username}`;
    userGreeting.classList.remove("hidden");

    // Replace login button with logout
    authBtn.innerHTML = `
      <button id="logoutBtn"
        class="bg-green-600 text-white px-4 py-2 rounded-md font-medium transition cursor-pointer hover:bg-green-700">
        Logout
      </button>
    `;

    document.getElementById("logoutBtn").addEventListener("click", () => {
      firebase.auth().signOut().then(() => {
        window.location.reload();
      });
    });

  } else {
    // Hide greeting, show login
    userGreeting.classList.add("hidden");

    authBtn.innerHTML = `
      <button id="loginBtn"
    class="bg-green-600 text-white px-4 py-2 rounded-md font-medium transition cursor-pointer hover:bg-green-700">
    Login
  </button>
  `;
  }
});



    const heroSection = document.querySelector(".hero-section .flex");

    if (heroSection) {
        // Remove the Solar Savings Calculator, Panel Recommendation, and Efficiency Analysis buttons
        const btnTextsToRemove = [
            "Solar Savings Calculator",
            "Panel Recommendation",
            "Efficiency Analysis"
        ];

        heroSection.querySelectorAll("a").forEach((link) => {
            if (btnTextsToRemove.includes(link.textContent.trim())) {
                link.remove();
            }
        });

        // If no buttons are left, remove the entire container to avoid space
        if (heroSection.children.length === 0) {
            heroSection.remove();
        }
    }
});
