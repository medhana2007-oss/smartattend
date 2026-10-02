const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    themeBtn.textContent = "☀️";
    document.body.style.background = "#0f172a";
    document.body.style.color = "#f8fafc";
  } else {
    themeBtn.textContent = "🌙";
    document.body.style.background = "#f5f7fb";
    document.body.style.color = "#172033";
  }
});

const languageBtn = document.getElementById("languageBtn");

languageBtn.addEventListener("click", () => {
  if (languageBtn.textContent === "தமிழ்") {
    languageBtn.textContent = "English";
    alert("தமிழ் மொழி support அடுத்த கட்டத்தில் முழுமையாக சேர்க்கப்படும்.");
  } else {
    languageBtn.textContent = "தமிழ்";
    alert("English language selected.");
  }
});
