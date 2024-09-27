export const handleSubmit = async (event) => {
  event.preventDefault();

  const url = document.getElementById("article-url").value;

  if (!url) {
    alert("Please enter a URL");
    return;
  }

  const response = await fetch("/analyze", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url }),
  });

  try {
    if (!response.ok) {
      // Log the error response
      console.error(`HTTP error! status: ${response.status}`);
      const errorText = await response.text(); // Read the response as text
      console.error("Error response body:", errorText);
      return;
    }

    const data = await response.json();
    document.getElementById("results").innerHTML = `
      <p>Polarity: ${data.polarity}</p>
      <p>Subjectivity: ${data.subjectivity}</p>
      <p>Text: ${data.text}</p>
    `;
  } catch (error) {
    console.error("Error parsing JSON:", error);
  }
};
