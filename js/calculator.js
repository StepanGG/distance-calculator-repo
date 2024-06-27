function getDeltas(deltaX, deltaY, cameraModel) {
    const tiltInRadians = cameraModel.Tilt * Math.PI / 180;

    const additionalAngleToObject = Math.atan(cameraModel.MatrixHeightInMilimeters * (deltaY / cameraModel.ResolutionHeight) / cameraModel.FocusLengthInMilimeters);
    const commonAngleToObject = additionalAngleToObject + (Math.PI / 2 - tiltInRadians);

    const deltaYInMeters = cameraModel.CameraHeight * Math.tan(commonAngleToObject);

    const objectPyramidSideHeight = cameraModel.CameraHeight / Math.cos(commonAngleToObject);
    const gorizontalAngleToObject = Math.atan(cameraModel.MatrixWidthInMilimeters * (deltaX / cameraModel.ResolutionWidth) / cameraModel.FocusLengthInMilimeters);
    const deltaXInMeters = objectPyramidSideHeight * Math.tan(gorizontalAngleToObject);

    return { deltaXInMeters, deltaYInMeters };
}

class CameraModel {
    constructor(ResolutionWidth,ResolutionHeight,FocusLengthInMilimeters,MatrixWidthInMilimeters,MatrixHeightInMilimeters,Tilt,CameraAzimuth,CameraHeight) {
        this.ResolutionWidth = ResolutionWidth;
        this.ResolutionHeight = ResolutionHeight;
        this.FocusLengthInMilimeters = FocusLengthInMilimeters;
        this.MatrixWidthInMilimeters = MatrixWidthInMilimeters;
        this.MatrixHeightInMilimeters = MatrixHeightInMilimeters;
        this.Tilt = Tilt; // from 0 to 90 degrees
        this.CameraAzimuth = CameraAzimuth; // from 0 to 360 degrees, 0 - North, clockwise
        this.CameraHeight = CameraHeight; // absolute height below earth's surface
    }
}

function getDetlasByPoint(imgW, imgH, pointX, pointY) {
    var centerX = imgW / 2;
    var centerY = imgH / 2;

    var vectorX = pointX - centerX;
    var vectorY = pointY - centerY;
    vectorY = vectorY * -1;
    vectorX = vectorX.toFixed(0);
    vectorY = vectorY.toFixed(0);
    return [vectorX, vectorY];
}
