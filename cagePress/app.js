function process() {
  const file = document.querySelector("#upload").files[0];

  if (!file) return;

  const reader = new FileReader();

  reader.readAsDataURL(file);

  reader.onload = function (event) {
    const imgElement = document.createElement("img");
    imgElement.src = event.target.result;
    document.querySelector("#input").src = event.target.result;

    imgElement.onload = function (e) {
      const canvas = document.createElement("canvas");
      const MAX_WIDTH = 320;
      const MAX_HEIGHT = 180;
      const QUALITY = 0.7;

      const scaleSize = MAX_WIDTH / e.target.width;
      canvas.width = MAX_WIDTH;
      canvas.height = e.target.height * scaleSize;

      const ctx = canvas.getContext("2d");

      ctx.drawImage(e.target, 0, 0, canvas.width, canvas.height);

      const srcEncoded = ctx.canvas.toDataURL(e.target, "image/jpeg");


     // document.querySelector("#output").src = srcEncoded;
      
      
       
    };
  };
  
}
function downloadURI(uri, name) {
  if (HTMLElement.prototype.click) {
      var link = document.createElement("canvas");
      link.download = name;
      link.href = uri;
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      setTimeout(function() { link.remove(); }, 500);
  } else {
      window.location.href = uri;
  }
}


