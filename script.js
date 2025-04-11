// GSAP initialization
gsap.registerPlugin(ScrollTrigger);

// Dark mode with simple fade transition
document.addEventListener('DOMContentLoaded', function() {
  const modeToggle = document.getElementById('modeToggle');
  const modeIcon = document.getElementById('modeIcon');
  const html = document.documentElement;
  const header = document.querySelector('header');
  const main = document.querySelector('main');
  const aside = document.querySelector('aside');
  const footer = document.querySelector('footer');

  // Initial theme setup
  const savedMode = localStorage.getItem('darkMode');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedMode === 'dark' || (!savedMode && systemPrefersDark)) {
    html.classList.add('dark');
    modeIcon.classList.replace('fa-moon', 'fa-sun');
    setInitialThemeStyles(true, header, main, aside, footer);
  } else {
    html.classList.remove('dark');
    modeIcon.classList.replace('fa-sun', 'fa-moon');
    setInitialThemeStyles(false, header, main, aside, footer);
  }

  modeToggle.addEventListener('click', () => {
    console.log('Toggle clicked');
    const isDark = html.classList.contains('dark');
    const newMode = isDark ? 'light' : 'dark';
    const header = document.querySelector('header');
    const main = document.querySelector('main');
    const aside = document.querySelector('aside');
    const footer = document.querySelector('footer');

    // Animate theme transition
    gsap.to([html, header, main, aside, footer], {
      duration: 0.5,
      ease: 'power1.inOut',
      onStart: () => {
        console.log('Theme transition started');
        if (isDark) {
          html.classList.remove('dark');
          modeIcon.classList.replace('fa-sun', 'fa-moon');
          localStorage.setItem('darkMode', 'light');
          setThemeStyles(false, header, main, aside, footer);
        } else {
          html.classList.add('dark');
          modeIcon.classList.replace('fa-moon', 'fa-sun');
          localStorage.setItem('darkMode', 'dark');
          setThemeStyles(true, header, main, aside, footer);
        }
        console.log('Theme switched to:', newMode);
      },
      onComplete: () => console.log('Theme transition completed')
    });
  });

  // Fallback to ensure theme applies immediately
  modeToggle.addEventListener('click', () => {
    const isDark = html.classList.contains('dark');
    const header = document.querySelector('header');
    const main = document.querySelector('main');
    const aside = document.querySelector('aside');
    const footer = document.querySelector('footer');
    if (isDark) {
      html.classList.remove('dark');
      modeIcon.classList.replace('fa-sun', 'fa-moon');
      localStorage.setItem('darkMode', 'light');
      setThemeStyles(false, header, main, aside, footer);
    } else {
      html.classList.add('dark');
      modeIcon.classList.replace('fa-moon', 'fa-sun');
      localStorage.setItem('darkMode', 'dark');
      setThemeStyles(true, header, main, aside, footer);
    }
    console.log('Fallback theme applied');
  }, { once: true });

  // Function to set initial theme styles without animation
  function setInitialThemeStyles(isDark, header, main, aside, footer) {
    if (header) header.style.backgroundColor = isDark ? '#2d3748' : '#e0f2fe'; // Light blue for header
if (main) main.style.backgroundColor = isDark ? '#4a5568' : '#f0f9ff'; // Very light blue for main
if (aside) aside.style.backgroundColor = isDark ? '#718096' : '#bae6fd'; // Medium light blue for aside
if (footer) footer.style.backgroundColor = isDark ? '#2d3748' : '#e0f2fe'; // Light blue for footer
html.style.color = isDark ? '#e2e8f0' : '#1e40af'; // Dark blue text in light mode
document.body.style.backgroundColor = isDark ? '#1a202c' : '#f0f9ff'; // Very light blue bg
  }

  // Function to set theme styles with animation target values
  function setThemeStyles(isDark, header, main, aside, footer) {
    if (header) gsap.set(header, { backgroundColor: isDark ? '#2d3748' : '#e0f2fe' });
if (main) gsap.set(main, { backgroundColor: isDark ? '#4a5568' : '#f0f9ff' });
if (aside) gsap.set(aside, { backgroundColor: isDark ? '#718096' : '#bae6fd' });
if (footer) gsap.set(footer, { backgroundColor: isDark ? '#2d3748' : '#e0f2fe' });
gsap.set(html, { color: isDark ? '#e2e8f0' : '#1e40af' });
gsap.set(document.body, { backgroundColor: isDark ? '#1a202c' : '#f0f9ff' });
  }
});

// Solar calculator with dynamic animation
function calculateSolarSavings() {
  const rate = parseFloat(document.getElementById('electricityRate').value);
  const sunlight = parseFloat(document.getElementById('sunlightHours').value);
  const panel = parseFloat(document.getElementById('panelCapacity').value);
  const consumption = parseFloat(document.getElementById('dailyConsumption').value);

  if ([rate, sunlight, panel, consumption].some(isNaN)) {
    alert('Please enter all values correctly.');
    return;
  }

  const dailyOutput = panel * sunlight;
  const dailySavings = Math.min(consumption, dailyOutput) * rate;
  const monthlySavings = dailySavings * 30;
  const yearlySavings = monthlySavings * 12;

  const outputBox = document.getElementById('outputBox');
  outputBox.classList.remove('hidden');
  gsap.from(outputBox, {
    duration: 0.6,
    y: 50,
    opacity: 0,
    ease: 'elastic.out(1, 0.3)'
  });

  document.getElementById('solarOutput').innerText = dailyOutput.toFixed(2);
  document.getElementById('dailySavings').innerText = dailySavings.toFixed(2);
  document.getElementById('monthlySavings').innerText = monthlySavings.toFixed(2);
  document.getElementById('yearlySavings').innerText = yearlySavings.toFixed(2);
}

// User greeting functionality with fade
document.addEventListener('DOMContentLoaded', () => {
  const user = localStorage.getItem('userEmail');
  const greeting = document.getElementById('userGreeting');

  if (user && greeting) {
    const username = user.split('@')[0];
    greeting.textContent = `Hi, ${username}`;
    gsap.from(greeting, { duration: 0.5, opacity: 0, y: -10, onComplete: () => greeting.classList.remove('hidden') });
  } else if (greeting) {
    greeting.innerHTML = `<a href="login.html" class="text-white hover:text-gray-200">Login</a>`;
    gsap.from(greeting, { duration: 0.5, opacity: 0, y: -10, onComplete: () => greeting.classList.remove('hidden') });
  }
});

// Chatbot with Gemini API and dynamic effects
document.addEventListener('DOMContentLoaded', function() {
  const chatbotButton = document.getElementById('chatbotButton');
  const chatbotWindow = document.getElementById('chatbotWindow');
  const closeChatbot = document.getElementById('closeChatbot');
  const chatbotOverlay = document.getElementById('chatbotOverlay');

  chatbotButton.addEventListener('click', function() {
    if (chatbotWindow.classList.contains('hidden')) {
      chatbotWindow.classList.remove('hidden');
      chatbotOverlay.classList.remove('hidden');
      gsap.fromTo(chatbotWindow, 
        { x: 100, opacity: 0 },
        { duration: 0.5, x: 0, opacity: 1, ease: 'back.out(1.7)', clearProps: 'all' }
      );
    } else {
      gsap.to(chatbotWindow, {
        duration: 0.5,
        x: 100,
        opacity: 0,
        ease: 'back.in(1.7)',
        onComplete: () => {
          chatbotWindow.classList.add('hidden');
          chatbotOverlay.classList.add('hidden');
          chatbotWindow.style.transform = '';
          chatbotWindow.style.opacity = '';
        }
      });
    }
  });
  
  closeChatbot.addEventListener('click', function() {
    gsap.to(chatbotWindow, { duration: 0.5, x: 100, opacity: 0, ease: 'back.in(1.7)', onComplete: () => {
      chatbotWindow.classList.add('hidden');
      chatbotOverlay.classList.add('hidden');
    } });
  });

  chatbotOverlay.addEventListener('click', function() {
    gsap.to(chatbotWindow, { duration: 0.5, x: 100, opacity: 0, ease: 'back.in(1.7)', onComplete: () => {
      chatbotWindow.classList.add('hidden');
      chatbotOverlay.classList.add('hidden');
    } });
  });
  
  const sendButton = document.getElementById('sendMessage');
  const chatInput = document.getElementById('chatInput');
  const chatMessages = document.getElementById('chatMessages');
  
  sendButton.addEventListener('click', sendMessage);
  chatInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') sendMessage();
  });
  
  async function sendMessage() {
    const message = chatInput.value.trim();
    if (message === '') return;
    
    addMessage(message, 'user');
    chatInput.value = '';
    
    try {
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyBdyc5qoHvCw3-hgXgM0gc9faHjvRj1nMA', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Answer this question about solar panel efficiency: ${message}. Provide a concise response focused on efficiency factors like panel type, sunlight exposure, temperature, or installation angle. If the question is unrelated to solar panel efficiency, respond with: "Please ask about solar panel efficiency, such as panel types or installation factors."`
            }]
          }]
        })
      });
      
      const data = await response.json();
      const botResponse = data.candidates[0].content.parts[0].text || 'Sorry, I couldn\'t process that. Please ask about solar panel efficiency.';
      addMessage(botResponse, 'bot');
    } catch (error) {
      addMessage('Error connecting to the server. Please try again later.', 'bot');
    }
  }
  
  function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `mb-3 p-3 rounded-lg max-w-xs ${sender === 'user' ? 'bg-blue-100 dark:bg-blue-900 ml-auto' : 'bg-gray-100 dark:bg-gray-700 mr-auto'}`;
    messageDiv.textContent = text;
    chatMessages.appendChild(messageDiv);
    gsap.from(messageDiv, { duration: 0.4, x: sender === 'user' ? 50 : -50, opacity: 0, ease: 'power2.out' });
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
});

// Responsive adjustments with smooth transition
function adjustLayout() {
  const chatbotWindow = document.getElementById('chatbotWindow');
  if (window.innerWidth <= 640) {
    gsap.to(chatbotWindow, {
      duration: 0.3,
      width: '100%',
      height: '85vh',
      right: '0',
      bottom: '0',
      borderRadius: '0',
      ease: 'power1.out'
    });
  } else {
    gsap.to(chatbotWindow, {
      duration: 0.3,
      width: '32rem',
      height: '32rem',
      right: '0',
      bottom: '5rem',
      borderRadius: '0.5rem',
      ease: 'power1.out'
    });
  }
}

window.addEventListener('resize', adjustLayout);
document.addEventListener('DOMContentLoaded', adjustLayout);

// Parallax effect for hero section
gsap.utils.toArray('.hero-section').forEach(section => {
  const bg = section.querySelector('.bg-gradient-to-b');
  gsap.to(bg, {
    y: 50,
    ease: 'none',
    scrollTrigger: {
      trigger: section,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    }
  });
});

// Feature card tap animation
document.querySelectorAll('.feature-card').forEach(card => {
  card.addEventListener('click', () => {
    gsap.to(card, {
      duration: 0.3,
      scale: 1.05,
      boxShadow: '0 15px 25px rgba(0, 0, 0, 0.3)',
      ease: 'back.out(1.7)',
      onComplete: () => {
        gsap.to(card, { duration: 0.3, scale: 1, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)', ease: 'back.in(1.7)' });
      }
    });
  });
});

// Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyC2yo7FueekHoNKbCAwxWqeIgax0f-K84A',
  authDomain: 'solareco-6f1f4.firebaseapp.com',
  projectId: 'solareco-6f1f4',
  appId: '1:647429122804:web:0eaf66c7842cf137bbcca1',
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

const authButton = document.getElementById('authBtn');

auth.onAuthStateChanged((user) => {
  if (user) {
    authButton.innerHTML = `
      <button onclick="logout()" class="text-red-500 hover:underline">Logout</button>
    `;
  } else {
    authButton.innerHTML = `
      <a href="login.html" class="text-blue-600 hover:underline">Login</a>
    `;
  }
});

function logout() {
  auth.signOut().then(() => {
    location.reload();
  });
}
document.getElementById('feedbackForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting normally
  
    const feedback = document.getElementById('feedback').value;
  
    if (feedback) {
      alert('Thank you for your feedback!'); // Show a message
      // Optionally, you can send this feedback to a server here using AJAX
      document.getElementById('feedback').value = ''; // Clear the text area
    } else {
      alert('Please provide your feedback!');
    }
  });
  