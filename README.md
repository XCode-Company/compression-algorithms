# Cage Press
Javascript ile <b>Compression Algorithms</b> uygulaması<br>

<b> Kullanılan Teknolojiler: </b>

Javascript  ile geliştirilmiştir.<br>
MVC mimari deseni kullanılmıştır.<br>

<b>Proje hakkında yapılan sunumlar:<b/> https://www.youtube.com/channel/UCqtFvqx1E8xUir16CNdkosQ <br>
<b>Projenin çalışır sürümü:</b> http://eminsaygi.com/cagepress/ <br>
  
<b>Proje Ekibi</b>
<b>M.Emin Saygı:</b> https://www.linkedin.com/in/eminsaygı/ <br>
<b>Gürkan Şentürk:</b> https://www.linkedin.com/in/can-balaman-8714b1181/ <br>
<b>Can Balaman:</b> https://www.linkedin.com/in/gurkansenturk/ <br>
  
<b>Proje kodları içinden Görüntüler</b>


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


<b>Genel Görünüş</b>

<img src="https://github.com/XCode-Company/compression-algorithms/blob/main/img/anasayfa.png"></a>

