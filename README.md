# Cage Press
Javascript ile <b>Compression Algorithms</b> uygulaması<br>

---

[Click to see the Project]https://xcode-company.github.io/compression-algorithms/)

---
<b> Kullanılan Teknolojiler: </b>

Javascript  ile geliştirilmiştir.<br>
MVC mimari deseni kullanılmıştır.<br>

<b>Proje hakkında yapılan sunumlar:<b/> https://www.youtube.com/channel/UCqtFvqx1E8xUir16CNdkosQ <br>
<b>Projenin çalışır sürümü:</b> https://xcode-company.github.io/compression-algorithms/ <br>
  
<b>Proje Ekibi</b> <br>
<b>M.Emin Saygı:</b> https://www.linkedin.com/in/eminsaygı/ <br>
<b>Gürkan Şentürk:</b> https://www.linkedin.com/in/gurkansenturk/ <br>
<b>Can Balaman:</b> https://www.linkedin.com/in/can-balaman-8714b1181/ <br>
  
<b>Proje kodları içinden Görüntüler</b>


<b>Sıkıştırma Algoritması </b>

```jsx
imgElement.onload = function (e) {
      if (app1Start) {
	    var exifIDCode = app1Start + 4;
	    var tiffOffset = app1Start + 10;

	    if (getStringFromCharCode(dataView, exifIDCode, 4) === 'Exif') {
	      var endianness = dataView.getUint16(tiffOffset);

	      littleEndian = endianness === 0x4949;

	      if (littleEndian || endianness === 0x4D4D /* bigEndian */) {
	          if (dataView.getUint16(tiffOffset + 2, littleEndian) === 0x002A) {
	            var firstIFDOffset = dataView.getUint32(tiffOffset + 4, littleEndian);

	            if (firstIFDOffset >= 0x00000008) {
	              ifdStart = tiffOffset + firstIFDOffset;
	            }
	          }
	        }
	    }
	  }
```
<b>Sıkıştırma ve şifreleme</b>

```jsx
if (ifdStart) {
	    var _length = dataView.getUint16(ifdStart, littleEndian);
	    var _offset = void 0;
	    var i = void 0;

	    for (i = 0; i < _length; i += 1) {
	      _offset = ifdStart + i * 12 + 2;

	      if (dataView.getUint16(_offset, littleEndian) === 0x0112 /* Orientation */) {
	          // 8 is the offset of the current tag's value
	          _offset += 8;

	          // Get the original orientation value
	          orientation = dataView.getUint16(_offset, littleEndian);

	          // Override the orientation with its default value
	          dataView.setUint16(_offset, 1, littleEndian);
	          break;
	        }
	    }
	  }
```
<b>Dosya İndirme</b>

```jsx
if (app1Start) {
	    var exifIDCode = app1Start + 4;
	    var tiffOffset = app1Start + 10;

	    if (getStringFromCharCode(dataView, exifIDCode, 4) === 'Exif') {
	      var endianness = dataView.getUint16(tiffOffset);

	      littleEndian = endianness === 0x4949;

	      if (littleEndian || endianness === 0x4D4D /* bigEndian */) {
	          if (dataView.getUint16(tiffOffset + 2, littleEndian) === 0x002A) {
	            var firstIFDOffset = dataView.getUint32(tiffOffset + 4, littleEndian);

	            if (firstIFDOffset >= 0x00000008) {
	              ifdStart = tiffOffset + firstIFDOffset;
	            }
	          }
	        }
	    }
	  }
```
<br> <br>



