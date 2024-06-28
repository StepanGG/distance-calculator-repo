/**
 * 
 * @param {*} deltaX Delta X
 * @param {*} deltaY Delta Y
 * @param {*} cameraModel Model with all device/camera parameters needed in calculation 
 * @returns Delta X, Y in meters
 */
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
    constructor(ResolutionWidth, ResolutionHeight, FocusLengthInMilimeters, MatrixWidthInMilimeters, MatrixHeightInMilimeters, Tilt, CameraAzimuth, CameraHeight) {
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
/**
 * 
 * @param {*} imgW Image resolution width
 * @param {*} imgH Image resolution height
 * @param {*} pointX Point X on image
 * @param {*} pointY Point Y on image
 * @returns Delta X, Y 
 */
function getDeltasByPoint(imgW, imgH, pointX, pointY) {
    var centerX = imgW / 2;
    var centerY = imgH / 2;

    var vectorX = pointX - centerX;
    var vectorY = pointY - centerY;
    vectorY = vectorY * -1;
    vectorX = vectorX.toFixed(0);
    vectorY = vectorY.toFixed(0);
    return [vectorX, vectorY];
}

/**
 * 
 * @param {*} realCaleDiagonal The diagonal of the device is taken from the select
 * @param {*} resolutionWidth Device resolution width
 * @param {*} resolutionHeight  Device resolution height
 * @returns 
 */
function getMatrixSize(realCaleDiagonal, resolutionWidth, resolutionHeight) {
    let formatTypeDiagonal = realCaleDiagonal / 1.5875;
    if (realCaleDiagonal < 25.4 / 2) {
        formatTypeDiagonal = realCaleDiagonal / 1.41111;
    }

    let matrixAlphaAngle = Math.atan(resolutionHeight / resolutionWidth);

    let matrixWidthInMilimeters = formatTypeDiagonal * Math.cos(matrixAlphaAngle);
    let matrixHeightInMilimeters = formatTypeDiagonal * Math.sin(matrixAlphaAngle);

    return { matrixWidthInMilimeters, matrixHeightInMilimeters };
}