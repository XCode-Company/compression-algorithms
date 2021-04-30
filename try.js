/*
Fullscreen Drag'n'Drop Image Upload written in vanilla javascript.
No external libraries required.
*/
(function() {

    // FormData or FileReader not available
    if (!('FormData' in window && 'FileReader' in window)) return;

    // declare private variables and/or functions
    var d = document;
    var overlay = d.querySelector('#overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'overlay';
        overlay.innerHTML = '<div class="inneroverlay" style="width:30%;"><p>Drag\'n\'Drop a file here</p></div>';
        d.body.appendChild(overlay);
    }
    var uploadButton = d.querySelector('#upload');
    var fileReq = d.querySelector('#file');
    var validMimeTypes = ['image/gif','image/png','image/jpeg','image/svg+xml'];
    var output = d.querySelector('#output');

    /**
     * Displays thumbnail of uploaded image in browser
     *
     * @param  string   filename The name of the file uploaded
     * @param  string   file The data of the file uploaded
     *
     * @return void
     */
    var uploadFile = function(filename, file) {

  var li = document.createElement('li');
        li.setAttribute('title', 'Click to remove element from list');
        var img = document.createElement('img');
        img.setAttribute('src', file);
        img.setAttribute('title', filename);
  li.appendChild(img);
  var txt = document.createElement('span');
  txt.textContent = filename;
  li.appendChild(txt);
        output.appendChild(li);

  setTimeout(function() {
      this.classList.add('show');
  }.bind(li), 10)

        //uploadFileToServer(filename, file);
    }

    /**
     * Upload file to server
     *
     * @param  string   filename The name of the file uploaded
     * @param  string   file The data of the file uploaded
     *
     * @return void
     */
    var uploadFileToServer = function(filename, file) {
        var formdata = new FormData();
        formdata.append('name', filename);
        formdata.append('file', file);

        var xhr = new XMLHttpRequest();
        xhr.open('POST','upload.php', true);
        xhr.onprogress = function(e) {
            if (e.lengthComputable) {
                var percentage = Math.round((e.loaded/e.total)*100);
                //console.log("percent " + percentage + '%' );
            }
        }
        xhr.send(formdata);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                // get result back
                var result = xhr.responseText;
                try {
                    result = JSON.parse(result)
                    //alert(result['msg']);
                }
                catch(err) {
                    console.log(err, result);
                    return false;
                }
            }
        }
    }

    /**
     * Simulate mouseclick on element
     *
     * @param  object   el DOM element
     *
     * @return void
     */
    var simulateClick = function(el) {
        el.dispatchEvent(new MouseEvent('click', {
            'view': window,
            'bubbles': true,
            'cancelable': true
        }));
    }

    /**
     * Drag handler attached to document
     *
     * @param  object   e the event
     *
     * @return void
     */
    var documentDragHandler = function(e) {

        e.preventDefault();
        switch (e.type) {
            case 'dragenter':
                overlay.classList.add('active');
                break;
            case 'dragleave':
                overlay.classList.remove('active');
                break;
        }
    }

    /**
     * Drag handler attached to overlay
     *
     * @param  object   e the event
     *
     * @return void
     */
    var overlayDragHandler = function(e) {

        e.preventDefault();
        e.stopPropagation();
        switch (e.type) {
            case 'dragenter':
                d.removeEventListener('dragleave', documentDragHandler);
                break;
            case 'dragleave': {
                overlay.classList.remove('active');
                d.addEventListener('dragleave', documentDragHandler);
                break;
            }
            case 'drop': {
                overlay.classList.remove('active');
                d.addEventListener('dragleave', documentDragHandler);
                uploadHandler(e);
                break;
            }
        }
    }

    /**
     * Upload handler
     *
     * @param  object   e The DOM object
     *
     * @return void
     */
    var uploadHandler = function(e) {
        var l, i, files = e.target.files || e.dataTransfer.files;
        if (l = files.length) {
            for (i=0;i<l;i++) {
                var file = files[i];
                if (validMimeTypes.indexOf(file.type) !== -1) {
                    var reader = new FileReader();
                    reader.onload = function(e) {
                        uploadFile(e.target.filename, e.target.result);
                    }
                    reader.filename = file.name;
                    reader.readAsDataURL(file);
                    // For textfile uploads, use: reader.readAsText(file);
                }
                else {
                    // wrong file type
                    wrongFormat(file.name + ' is not an image!');
                }
            }
        }
    }

    /**
     * Display alert if format of uploaded file is not valid
     *
     * @param  string   text Error text to display
     *
     * @return void
     */
    var wrongFormat = function(text) {
        alert(text);
    }

    /**
 * Find and return the correct browser specific "transitionend"
 *
 * @return string
 */
    var whichTransitionEvent = function() {
        var t, el = document.createElement("fakeelement");
        var transitions = {
            "transition"      : "transitionend",
            "OTransition"     : "oTransitionEnd",
            "MozTransition"   : "transitionend",
            "WebkitTransition": "webkitTransitionEnd"
        }

        for (t in transitions) {
            if (el.style[t] !== undefined) {
                return transitions[t];
            }
        }
    }
    
    /**
 * remove element from list
 *
 * @return void
 */
var removeElementFromList = function(e) {
    var node = e.target;
    var myScript = function(e) {
        if (e.propertyName == 'opacity') {
            output.removeChild(node);
        }
    }

    while (node != d) {
        if (node.matches('li.show')) {
            var transitionEvent = whichTransitionEvent();
            node.addEventListener(transitionEvent, myScript);
            node.classList.remove('show');
            break;
        };
        node = node.parentNode;
    }

}
    
    // Attach events to document object
    d.addEventListener('dragstart', documentDragHandler, false); // Prevent local objects from being drag/dropped
    d.addEventListener('dragover', documentDragHandler, false);
    d.addEventListener('dragenter', documentDragHandler, false);
    d.addEventListener('dragleave', documentDragHandler, false);

    // Attach events to overlay object
    overlay.addEventListener('dragover', overlayDragHandler, false);
    overlay.addEventListener('dragenter', overlayDragHandler, false);
    overlay.addEventListener('dragleave', overlayDragHandler, false);
    overlay.addEventListener('drop', overlayDragHandler, false);

    output.addEventListener('click', removeElementFromList, false);   

    // If 'standard' input type="file" element is found, attach 'change' event to it
    // Also attach 'click' event to button if present.
    if (fileReq) {
        fileReq.addEventListener('change', uploadHandler, false);
        if (uploadButton) uploadButton.addEventListener('click', simulateClick.bind(null, fileReq), false);
    }

    return {
        // declare public variables and/or functions
    }

})();
