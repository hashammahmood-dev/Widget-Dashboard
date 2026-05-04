(function () {
  const script = document.currentScript;
  const widgetId = script.getAttribute("data-id");

  const API_URL = "http://localhost:8000";

  fetch(`${API_URL}/widget/${widgetId}`)
    .then(res => {
      if (!res.ok) throw new Error("Failed to fetch widget");
      return res.json();
    })
    .then(data => {
      const box = document.createElement("div");

      box.style.position = "fixed";
      box.style.bottom = "20px";
      box.style.right = "20px";
      box.style.width = data.width || "300px";
      box.style.height = data.height || "400px";
      box.style.background = data.color || "#4f46e5";
      box.style.color = "#fff";
      box.style.padding = "10px";
      box.style.borderRadius = "10px";
      box.style.zIndex = "9999";

      const p = document.createElement("p");
      p.textContent = data.knowledge_base;

      box.appendChild(p);
      document.body.appendChild(box);
    })
    .catch(err => {
      console.error("Widget error:", err);
    });
})();