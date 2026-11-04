function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  // Validation
  if (!email || !password) {
    alert("Please enter both email and password");
    return;
  }

  // Email validation - only @gmail.com allowed
  if (!email.endsWith("@gmail.com")) {
    alert("Invalid email: Only @gmail.com email addresses are allowed");
    return;
  }

  fetch("http://localhost:5000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  })
  .then(res => {
    if (!res.ok) {
      return res.text().then(text => {
        throw new Error("Server error: " + res.status + " - " + text);
      });
    }
    return res.json();
  })
  .then(data => {
    if (data && data.success) {
      // Store user info in localStorage
      localStorage.setItem('currentUser', JSON.stringify({
        name: data.name || email.split('@')[0],
        email: email
      }));
      localStorage.setItem('loginDate', new Date().toLocaleDateString());
      alert("Login successful");
      window.location.href = "dashboard.html";
    } else {
      alert("Invalid login: " + (data && data.message ? data.message : "Please check your credentials"));
    }
  })
  .catch(error => {
    console.error("Full error:", error);
    alert("Error: " + error.message);
  });
}

function register() {
  const name = document.getElementById("regName").value.trim();
  const email = document.getElementById("regEmail").value.trim();
  const phone = document.getElementById("regPhone").value.trim();
  const password = document.getElementById("regPassword").value;
  const confirmPassword = document.getElementById("regConfirmPassword").value;

  // Validation
  if (!name || !email || !phone || !password || !confirmPassword) {
    alert("Please fill in all fields");
    return;
  }

  // Email validation - only @gmail.com allowed
  if (!email.endsWith("@gmail.com")) {
    alert("Invalid email: Only @gmail.com email addresses are allowed");
    return;
  }

  // Phone validation - only 10 digits allowed
  if (!/^\d{10}$/.test(phone)) {
    alert("Invalid phone: Phone number must be exactly 10 digits");
    return;
  }

  if (password.length < 6) {
    alert("Password must be at least 6 characters long");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  fetch("http://localhost:5000/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, email, phone, password })
  })
  .then(res => {
    if (!res.ok) {
      return res.text().then(text => {
        throw new Error("Server error: " + res.status + " - " + text);
      });
    }
    return res.json();
  })
  .then(data => {
    if (data && data.success) {
      document.getElementById("regName").value = "";
      document.getElementById("regEmail").value = "";
      document.getElementById("regPhone").value = "";
      document.getElementById("regPassword").value = "";
      document.getElementById("regConfirmPassword").value = "";
      window.location.href = "login.html";
    } else {
      alert("Registration failed: " + (data && data.message ? data.message : "Unknown error"));
    }
  })
  .catch(error => {
    console.error("Full error:", error);
    alert("Error: " + error.message);
  });
}

function loadBooks() {
  fetch("http://localhost:5000/books")
    .then(res => {
      if (!res.ok) {
        throw new Error("Server error: " + res.status);
      }
      return res.json();
    })
    .then(data => {
      const booksDiv = document.getElementById("books");
      if (booksDiv && Array.isArray(data)) {
        booksDiv.innerHTML = "";
        data.forEach(book => {
          booksDiv.innerHTML += `
            <p>${book.title} - ${book.author}</p>
          `;
        });
      }
    })
    .catch(error => {
      console.error("Error loading books:", error);
    });
}

// Auto load books
if (window.location.pathname.includes("dashboard.html")) {
  loadBooks();
}

function logout() {
  localStorage.removeItem('currentUser');
  localStorage.removeItem('loginDate');
  window.location.href = "login.html";
}