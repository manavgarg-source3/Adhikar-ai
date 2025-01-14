// scripts.js

document.addEventListener('DOMContentLoaded', () => {
  const aboutUsSection = document.getElementById('about-us');
  
  const handleScroll = () => {
      const sectionTop = aboutUsSection.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      // Check if the section is in view
      if (sectionTop < windowHeight * 0.8) {
          aboutUsSection.classList.add('visible');
      } else {
          aboutUsSection.classList.remove('visible');
      }
  };
  
  // Initial check
  handleScroll();
  
  // Add scroll event listener
  window.addEventListener('scroll', handleScroll);
});
document.addEventListener('DOMContentLoaded', () => {
  // Scroll Animation for Sections
  const sections = document.querySelectorAll('.about-us, .blog-section, .decorative-divider');
  
  const handleScroll = () => {
      const windowHeight = window.innerHeight;
      
      sections.forEach(section => {
          const sectionTop = section.getBoundingClientRect().top;
          if (sectionTop < windowHeight * 0.8) {
              section.classList.add('visible');
          } else {
              section.classList.remove('visible');
          }
      });

      // Header and Button Effects
      const header = document.querySelector('.header-container');
      const buttonHeader = document.querySelector('.button-header');
      const scrollTop = window.scrollY;
      
      if (scrollTop > 100) {
          header.style.backgroundColor = 'rgba(0, 0, 0, 0.8)'; // Example color change
          buttonHeader.style.backgroundColor = '#DDA15E'; // Example color change
      } else {
          //header.style.backgroundColor = 'var(--primary-color)';
          //buttonHeader.style.backgroundColor = 'var(--secondary-color)';
      }
  };

  // Initial check
  handleScroll();
  
  // Add scroll event listener
  window.addEventListener('scroll', handleScroll);



  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
      const question = item.querySelector('.question');
      const answer = item.querySelector('.answer');
      
      question.addEventListener('click', () => {
          const isOpen = answer.style.display === 'block';
          faqItems.forEach(otherItem => {
              otherItem.querySelector('.answer').style.display = 'none';
          });
          answer.style.display = isOpen ? 'none' : 'block';
      });
  });
});
document.querySelectorAll('.side-nav a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();

    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});
const navToggle = document.querySelector('.nav-toggle');
const closeNav = document.querySelector('.close-nav');
const sideNav = document.querySelector('.side-nav');

navToggle.addEventListener('click', () => {
sideNav.classList.toggle('open');
});

closeNav.addEventListener('click', () => {
sideNav.classList.remove('open');
});
document.addEventListener('DOMContentLoaded', function () {
  const chatbotLink = document.getElementById('chatbot-link');
  const chatWindow = document.getElementById('chat-window');
  const closeButton = document.getElementById('close-button');

  chatbotLink.addEventListener('click', function (e) {
      e.preventDefault();
      chatWindow.style.display = 'flex'; // Show chat window
  });

  closeButton.addEventListener('click', function () {
      chatWindow.style.display = 'none'; // Hide chat window
  });// scripts.js

  // Detect clicks on the user profile link
  document.getElementById('user-profile-link').addEventListener('click', function(event) {
      event.preventDefault(); // Prevent default behavior of anchor tag
      
      // Load the profile page content
      window.location.href = 'profile.html'; // Redirect to the profile page
  });
  document.getElementById('case-status-link').addEventListener('click', function(event) {
      event.preventDefault(); // Prevent default behavior of anchor tag
      
      // Load the profile page content
      window.location.href = 'status.html'; // Redirect to the profile page
  });

  document.getElementById('divisions-of-DOJ-link').addEventListener('click', function(event) {
      event.preventDefault(); // Prevent default behavior of anchor tag
      
      // Load the profile page content
      window.location.href = 'https://doj.gov.in/organization-chart/'; // Redirect to the profile page
  });

  document.getElementById('live-streaming-link').addEventListener('click', function(event) {
      event.preventDefault(); // Prevent default behavior of anchor tag
      
      // Load the profile page content
      window.location.href = 'https://youtube.com/@highcourtatcalcutta?si=r7vMnHLHzdfBiq6j'; // Redirect to the profile page
  });
  document.getElementById('E-filling-link').addEventListener('click', function(event) {
      event.preventDefault(); // Prevent default behavior of anchor tag
      
      // Load the profile page content
      window.location.href = ' https://efiling.ecourts.gov.in/';
  
  
  });

});
document.addEventListener('DOMContentLoaded', () => {
  // Select elements
  const chatBotIcon = document.getElementById('chat-bot');
  const chatWindow = document.querySelector('.chat-window');
  const closeButton = document.querySelector('.close-button');
  const sendButton = document.getElementById('send-button');
  const userInput = document.getElementById('chat-input');
  const chatBody = document.querySelector('.chat-body');

  // Function to append messages to chat body
  const appendMessage = (message, sender) => {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender === 'bot' ? 'bot-message' : 'user-message');

    const messageContent = document.createElement('div');
    messageContent.classList.add('message-content');
    messageContent.textContent = message;

    messageElement.appendChild(messageContent);
    chatBody.appendChild(messageElement);

    // Scroll to the bottom
    chatBody.scrollTop = chatBody.scrollHeight;
  };

  // Function to open chat
  const openChat = () => {
    chatWindow.style.display = 'flex';
    chatWindow.setAttribute('aria-hidden', 'false');
    chatBotIcon.style.display = 'none';

    // Display welcome message if chat is empty
    if (chatBody.innerHTML.trim() === '') {
      appendMessage("Hello! I'm your friendly chatbot. How can I assist you today?", 'bot');
    }

    // Set focus to the input field
    userInput.focus();
  };

  // Function to close chat
  const closeChat = () => {
    chatWindow.style.display = 'none';
    chatWindow.setAttribute('aria-hidden', 'true');
    chatBotIcon.style.display = 'flex';
  };

  // Function to send message
  const sendMessage = async () => {
    const message = userInput.value.trim();
    if (message === '') return; // Do not send empty messages

    appendMessage(message, 'user');
    userInput.value = '';
    sendButton.disabled = true; // Disable send button to prevent multiple clicks

    // Append 'Typing...' indicator
    const typingIndicator = document.createElement('div');
    typingIndicator.classList.add('message', 'bot-message');
    
    const typingContent = document.createElement('div');
    typingContent.classList.add('message-content');
    typingContent.textContent = 'Typing...';
    
    typingIndicator.appendChild(typingContent);
    chatBody.appendChild(typingIndicator);

    // Scroll to the bottom
    chatBody.scrollTop = chatBody.scrollHeight;

    try {
      const response = await fetch('/chat', { // Ensure your backend endpoint is '/chat'
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message })
      });

      if (!response.ok) { // Handle HTTP errors
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      // Remove 'Typing...' indicator
      chatBody.removeChild(typingIndicator);

      // Append bot response
      appendMessage(data.reply, 'bot');
    } catch (error) {
      console.error('Error:', error);
      // Remove 'Typing...' indicator
      chatBody.removeChild(typingIndicator);
      appendMessage('An error occurred. Please try again.', 'bot');
    } finally {
      sendButton.disabled = false; // Re-enable send button
    }
  };

  // Event Listeners
  chatBotIcon.addEventListener('click', openChat);
  closeButton.addEventListener('click', closeChat);
  sendButton.addEventListener('click', sendMessage);
  userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });

  // Optional: Allow opening chat via keyboard (e.g., Enter or Space)
  chatBotIcon.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      openChat();
    }
  });
});


