var canvas = new fabric.Canvas('canvas');
var imgInstance;
var focalLength;
function resizeCanvas() {
    var container = document.getElementById('imageContainer');
    canvas.setWidth(container.clientWidth);
    canvas.setHeight(container.clientHeight);
    canvas.renderAll();
}

window.addEventListener('resize', resizeCanvas);
document.getElementById('imageInput').addEventListener('change', function (event) {
    var file = event.target.files[0];
    if (file) {
        var reader = new FileReader();
        reader.onload = function (e) {
            fabric.Image.fromURL(e.target.result, function (img) {
                imgInstance = img;

                var container = document.getElementById('imageContainer');
                var maxWidth = container.clientWidth;
                var maxHeight = container.clientHeight;
                var imgAspectRatio = img.width / img.height;
                var containerAspectRatio = maxWidth / maxHeight;

                if (imgAspectRatio > containerAspectRatio) {
                    img.scaleToWidth(maxWidth);
                } else {
                    img.scaleToHeight(maxHeight);
                }

                canvas.clear();
                img.selectable = false;
                container.style = "border: 1px solid black;";
                canvas.add(img);
                canvas.renderAll();

                resizeCanvas();

                document.getElementById('imageName').textContent = file.name;
                document.getElementById('imageSize').textContent = (file.size / 1024).toFixed(2);
                document.getElementById('imageDimensions').textContent = img.width + ' x ' + img.height;
                document.getElementById('imageProperties').classList.remove('d-none');
                document.getElementById('inputs').classList.remove('d-none');

                EXIF.getData(file, function () {
                    focalLength = EXIF.getTag(this, "FocalLength");
                    var digitalZoom = EXIF.getTag(this, "DigitalZoomRatio");

                    document.getElementById('imageFocalLength').textContent = focalLength ? focalLength.numerator / focalLength.denominator + ' mm' : 'N/A';
                    document.getElementById('imageDigitalZoom').textContent = digitalZoom ? digitalZoom : 'N/A';
                });
            });
        };
        reader.readAsDataURL(file);
    }
});

canvas.on('mouse:move', function (event) {
    var pointer = canvas.getPointer(event.e);
    var coordinates = document.getElementById('coordinates');
    var canvasConteinerBounds = document.querySelector("#imageContainer").getBoundingClientRect();
    var zoom = canvas.getZoom();
    var realX = (pointer.x / imgInstance.scaleX) / zoom;
    var realY = (pointer.y / imgInstance.scaleY) / zoom;

    if (pointer.x >= imgInstance.left && pointer.x <= imgInstance.left + imgInstance.getScaledWidth() && pointer.y >= imgInstance.top && pointer.y <= imgInstance.top + imgInstance.getScaledHeight()) {
        coordinates.style.left = Math.round(canvasConteinerBounds.width) - 90 + 'px';
        coordinates.style.top = Math.round(canvasConteinerBounds.top) + 'px';
        coordinates.textContent = 'X: ' + Math.round(realX) + ', Y: ' + Math.round(realY);
        coordinates.style.display = 'block';
    } else {
        coordinates.style.display = 'none';
    }
    if (this.isDragging) {
        var e = event.e;
        var vpt = this.viewportTransform;
        vpt[4] += e.clientX - this.lastPosX;
        vpt[5] += e.clientY - this.lastPosY;
        this.requestRenderAll();
        this.lastPosX = e.clientX;
        this.lastPosY = e.clientY;
    }
});

canvas.on('mouse:out', function () {
    var coordinates = document.getElementById('coordinates');
    coordinates.style.display = 'none';
});

canvas.on('mouse:wheel', function (event) {
    var delta = event.e.deltaY;
    var zoom = canvas.getZoom();
    zoom = zoom - delta / 100;
    if (zoom > 20) zoom = 20;
    if (zoom < 1) zoom = 1;
    canvas.zoomToPoint({ x: event.e.offsetX, y: event.e.offsetY }, zoom);
    event.e.preventDefault();
    event.e.stopPropagation();
});
var index = 0;
canvas.on('mouse:down', function (opt) {
    var evt = opt.e;
    if (evt.altKey === true) {
        this.isDragging = true;
        this.selection = false;
        this.lastPosX = evt.clientX;
        this.lastPosY = evt.clientY;
    }
    var pointer = canvas.getPointer(opt.e);
    if (pointer.x >= imgInstance.left && pointer.x <= imgInstance.left + imgInstance.getScaledWidth() && pointer.y >= imgInstance.top && pointer.y <= imgInstance.top + imgInstance.getScaledHeight() && evt.altKey === false) {
        var zoom = canvas.getZoom();
        var realX = (pointer.x / imgInstance.scaleX) / zoom;
        var realY = (pointer.y / imgInstance.scaleY) / zoom;
        var imgW = imgInstance.getScaledWidth();
        var imgH = imgInstance.getScaledHeight();
        var [vectorX, vectorY] = getDetlasByPoint(imgInstance.width, imgInstance.height, realX, realY);
        console.log(realX, realY, imgInstance.width, imgInstance.height, vectorX, vectorY);

        var circle = new fabric.Circle({
            radius: 2,
            fill: 'red',
            left: pointer.x,
            top: pointer.y,
            originX: 'center',
            originY: 'center',
            selectable: false,
            deleteble: true
        });
        var line = new fabric.Line([imgW / 2, imgH / 2, pointer.x, pointer.y], {
            strokeWidth: 1,
            stroke: 'red',
            selectable: false,
            deleteble: true
        });
        var text = new fabric.Text('(' + vectorX + ', ' + vectorY + ')', {
            fontSize: 14,
            stroke: 'red',
            left: pointer.x + 20,
            top: pointer.y - 20,
            selectable: false,
            originX: 'center',
            originY: 'center',
        });
        canvas.add(circle, line, text);
        canvas.requestRenderAll();

        // add to result table
        var FocusLengthInMilimeters =  focalLength ? focalLength.numerator / focalLength.denominator + ' mm' : 'N/A';
        pushDataToTable(
            index,
            vectorX,
            vectorY,
            imgInstance.width,
            imgInstance.height,
            FocusLengthInMilimeters,
            10,
            25.9,
            3.799,
            5.053
        );
        index++;
    } 

});

canvas.on('mouse:up', function (opt) {
    this.setViewportTransform(this.viewportTransform);
    this.isDragging = false;
    this.selection = true;
});

$(".custom-file-input").on("change", function () {
    var fileName = $(this).val().split("\\").pop();
    $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
});

function pushDataToTable(
    Index,
    DeltaXInPixel,
    DeltaYInPixel,
    ResolutionWidth,
    ResolutionHeight,
    FocusLengthInMilimeters,
    CameraHeight,
    Tilt,
    MatrixWidthInMilimeters,
    MatrixHeightInMilimeters
){
    var trElm = document.createElement("tr");
    var IndexTdElm = document.createElement("td");
    var DeltaXInPixelTdElm = document.createElement("td");
    var DeltaYInPixelTdElm = document.createElement("td");
    var ResolutionWidthTdElm = document.createElement("td");
    var ResolutionHeightTdElm = document.createElement("td");
    var FocusLengthInMilimetersTdElm = document.createElement("td");
    var CameraHeightTdElm = document.createElement("td");
    var TiltTdElm = document.createElement("td");
    var MatrixWidthInMilimetersTdElm = document.createElement("td");
    var MatrixHeightInMilimetersTdElm = document.createElement("td");
    IndexTdElm.innerText = Index;
    trElm.append(IndexTdElm);
    DeltaXInPixelTdElm.innerText = DeltaXInPixel;
    trElm.append(DeltaXInPixelTdElm);
    DeltaYInPixelTdElm.innerText = DeltaYInPixel;
    trElm.append(DeltaYInPixelTdElm);
    ResolutionWidthTdElm.innerText = ResolutionWidth;
    trElm.append(ResolutionWidthTdElm);
    ResolutionHeightTdElm.innerText = ResolutionHeight;
    trElm.append(ResolutionHeightTdElm);
    FocusLengthInMilimetersTdElm.innerText = FocusLengthInMilimeters;
    trElm.append(FocusLengthInMilimetersTdElm);
    CameraHeightTdElm.innerText = CameraHeight;
    trElm.append(CameraHeightTdElm);
    TiltTdElm.innerText = Tilt;
    trElm.append(TiltTdElm);
    MatrixWidthInMilimetersTdElm.innerText = MatrixWidthInMilimeters;
    trElm.append(MatrixWidthInMilimetersTdElm);
    MatrixHeightInMilimetersTdElm.innerText = MatrixHeightInMilimeters;
    trElm.append(MatrixHeightInMilimetersTdElm);
    var tbElm = document.getElementsByTagName('tbody');
    tbElm[0].append(trElm);
}