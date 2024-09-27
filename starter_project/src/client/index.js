// import { handleSubmit } from "./js/formHandler"; // Remove this line

// Keep the handleSubmit function as is
document.getElementById("form").addEventListener("submit", handleSubmit);

async function handleSubmit(event) {
  event.preventDefault();

  const url = document.getElementById("url").value;
  if (!url || !isValidUrl(url)) {
    alert("Please enter a valid URL");
    return;
  }

  const response = await fetch("http://localhost:8081/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  });

  try {
    const data = await response.json();
    document.getElementById("results").innerHTML = `
            <p>Polarity: ${data.score_tag}</p>
            <p>Subjectivity: ${data.subjectivity}</p>
            <p>Text Snippet: ${
              data.sentence_list[0]?.text || "No snippet available"
            }</p>
        `;
  } catch (error) {
    console.error("Error:", error);
  }
}

function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}
