async function shorten() {
  const url = document.getElementById("url").value;
  const slug = document.getElementById("slug").value;
  const resultDiv = document.getElementById("result");

  if (!url) {
    resultDiv.innerText = "⚠️ Please enter a URL";
    return;
  }

  resultDiv.innerText = "⏳ Shortening...";

  try {
    const response = await fetch("https://jt-shortener.lovable.app/api/public/shorten", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        url: url,
        slug: slug || undefined
      })
    });

    const data = await response.json();

    if (data.error) {
      resultDiv.innerText = "❌ " + data.error;
    } else {
      resultDiv.innerHTML = `
        ✅ Short URL:<br>
        <a href="${data.url}" target="_blank">${data.url}</a>
        <br>
        <button class="copy-btn" onclick="copyLink('${data.url}')">Copy</button>
      `;
    }

  } catch (err) {
    resultDiv.innerText = "❌ Request failed";
  }
}

function copyLink(link) {
  navigator.clipboard.writeText(link);
  alert("Copied to clipboard!");
}
