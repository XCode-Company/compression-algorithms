# Cage Press
Javascript ile compression-algorithms uygulaması<br>

<b> Kullanılan Teknolojiler: </b>

Javascript  ile geliştirilmiştir.<br>
MVC mimari deseni kullanılmıştır.<br>

<b>Proje hakkında yapılan sunumlar : https://youtu.be/d-_QBKvZX00
  
<b>Proje kodları içinden Görüntüler</b>

<b>Dosya İndirme</b>

```jsx
async function downloadImage()
 {
  const image = await fetch(img)
  const imageBlog = await image.blob()
  const imageURL = URL.createObjectURL(imageBlog)

  const link = document.createElement('a')
  link.href = imageURL
  link.download = 'image file name here'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
```

<b>Sıkıştırma Algoritması </b>

```jsx
imgElement.onload = function (e) {
      const canvas = document.createElement("canvas");
      const MAX_WIDTH = 320;
      const MAX_HEIGHT = 180;
      const QUALITY = 0.7;

      const scaleSize = MAX_WIDTH / e.target.width;
      canvas.width = MAX_WIDTH;
      canvas.height = e.target.height * scaleSize;
```
<b>Sıkıştırma ve şifreleme</b>

```jsx
const ctx = canvas.getContext("2d");

      ctx.drawImage(e.target, 0, 0, canvas.width, canvas.height);

      const srcEncoded = ctx.canvas.toDataURL(e.target, "image/jpeg");


      document.querySelector("#output").src = srcEncoded;
```

<b>Ana Gövde 2</b>

<img src="https://github.com/eminsaygi/OtobusBiletiRezervasyon/blob/main/img/ekran2.jpg"></a>

