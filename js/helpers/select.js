const sensorData = {
  "35mmFullFrame": { realCaleDiag: "N/A", "4:3": { width: 34.64, height: 25.98 }, "3:2": { width: 36.03, height: 24.02 }, "16:10": { width: 36.72, height: 22.95 }, "16:9": { width: 37.74, height: 21.23 } },
  "APS-C": { realCaleDiag: "N/A", "4:3": { width: 24.08, height: 18.06 }, "3:2": { width: 25.04, height: 16.70 }, "16:10": { width: 25.52, height: 15.95 }, "16:9": { width: 26.23, height: 14.76 } },
  "4/3": { realCaleDiag: 33.87, "4:3": { width: 17.07, height: 12.80 }, "3:2": { width: 17.75, height: 11.83 }, "16:10": { width: 18.09, height: 11.30 }, "16:9": { width: 18.59, height: 10.46 } },
  "1.1": { realCaleDiag: 27.94, "4:3": { width: 14.08, height: 10.56 }, "3:2": { width: 14.64, height: 9.76 }, "16:10": { width: 14.92, height: 9.33 }, "16:9": { width: 15.34, height: 8.63 } },
  "1": { realCaleDiag: 25.40, "4:3": { width: 12.80, height: 9.60 }, "3:2": { width: 13.31, height: 8.88 }, "16:10": { width: 13.57, height: 8.47 }, "16:9": { width: 13.83, height: 7.84 } },
  "1/1.1": { realCaleDiag: 23.09, "4:3": { width: 11.64, height: 8.73 }, "3:2": { width: 12.10, height: 8.10 }, "16:10": { width: 12.33, height: 7.71 }, "16:9": { width: 12.68, height: 7.13 } },
  "1/1.2": { realCaleDiag: 21.17, "4:3": { width: 10.67, height: 8.00 }, "3:2": { width: 11.09, height: 7.40 }, "16:10": { width: 11.31, height: 7.07 }, "16:9": { width: 11.62, height: 6.54 } },
  "2/3": { realCaleDiag: 16.93, "4:3": { width: 8.53, height: 6.40 }, "3:2": { width: 8.88, height: 5.92 }, "16:10": { width: 9.05, height: 5.66 }, "16:9": { width: 9.30, height: 5.23 } },
  "1/1.6": { realCaleDiag: 15.88, "4:3": { width: 8.00, height: 6.00 }, "3:2": { width: 8.32, height: 5.55 }, "16:10": { width: 8.48, height: 5.30 }, "16:9": { width: 8.72, height: 4.90 } },
  "1/1.7": { realCaleDiag: 14.94, "4:3": { width: 7.53, height: 5.65 }, "3:2": { width: 7.83, height: 5.22 }, "16:10": { width: 7.98, height: 4.99 }, "16:9": { width: 8.20, height: 4.61 } },
  "1/1.8": { realCaleDiag: 14.11, "4:3": { width: 7.11, height: 5.33 }, "3:2": { width: 7.40, height: 4.93 }, "16:10": { width: 7.54, height: 4.71 }, "16:9": { width: 7.75, height: 4.36 } },
  "1/1.9": { realCaleDiag: 13.37, "4:3": { width: 6.74, height: 5.05 }, "3:2": { width: 7.01, height: 4.67 }, "16:10": { width: 7.14, height: 4.46 }, "16:9": { width: 7.34, height: 4.13 } },
  "1/2.0": { realCaleDiag: 12.70, "4:3": { width: 6.40, height: 4.80 }, "3:2": { width: 6.66, height: 4.44 }, "16:10": { width: 6.78, height: 4.24 }, "16:9": { width: 6.97, height: 3.92 } },
  "1/2.3": { realCaleDiag: 11.04, "4:3": { width: 5.60, height: 4.20 }, "3:2": { width: 5.99, height: 3.99 }, "16:10": { width: 6.11, height: 3.80 }, "16:9": { width: 6.28, height: 3.53 } },
  "1/2.5": { realCaleDiag: 10.41, "4:3": { width: 5.76, height: 4.32 }, "3:2": { width: 5.99, height: 3.99 }, "16:10": { width: 6.11, height: 3.80 }, "16:9": { width: 6.28, height: 3.53 } },
  "1/2.7": { realCaleDiag: 9.41, "4:3": { width: 5.33, height: 4.00 }, "3:2": { width: 5.55, height: 3.70 }, "16:10": { width: 5.65, height: 3.53 }, "16:9": { width: 5.81, height: 3.27 } },
  "1/2.8": { realCaleDiag: 9.07, "4:3": { width: 5.14, height: 3.86 }, "3:2": { width: 5.35, height: 3.57 }, "16:10": { width: 5.45, height: 3.41 }, "16:9": { width: 5.60, height: 3.15 } },
  "1/2.9": { realCaleDiag: 8.76, "4:3": { width: 4.97, height: 3.72 }, "3:2": { width: 5.16, height: 3.44 }, "16:10": { width: 5.26, height: 3.29 }, "16:9": { width: 5.41, height: 3.04 } },
  "1/3.0": { realCaleDiag: 8.47, "4:3": { width: 4.80, height: 3.60 }, "3:2": { width: 4.99, height: 3.33 }, "16:10": { width: 5.09, height: 3.18 }, "16:9": { width: 5.23, height: 2.94 } },
  "1/3.2": { realCaleDiag: 7.94, "4:3": { width: 4.50, height: 3.38 }, "3:2": { width: 4.68, height: 3.12 }, "16:10": { width: 4.77, height: 2.99 }, "16:9": { width: 4.90, height: 2.76 } },
  "1/3.4": { realCaleDiag: 7.47, "4:3": { width: 4.24, height: 3.18 }, "3:2": { width: 4.41, height: 2.94 }, "16:10": { width: 4.49, height: 2.81 }, "16:9": { width: 4.61, height: 2.60 } },
  "1/3.6": { realCaleDiag: 7.06, "4:3": { width: 4.00, height: 3.00 }, "3:2": { width: 4.16, height: 2.77 }, "16:10": { width: 4.24, height: 2.65 }, "16:9": { width: 4.36, height: 2.45 } },
  "1/4.0": { realCaleDiag: 6.35, "4:3": { width: 3.60, height: 2.70 }, "3:2": { width: 3.74, height: 2.50 }, "16:10": { width: 3.82, height: 2.39 }, "16:9": { width: 3.92, height: 2.21 } },
  "1/5.0": { realCaleDiag: 5.08, "4:3": { width: 2.88, height: 2.16 }, "3:2": { width: 3.00, height: 2.00 }, "16:10": { width: 3.05, height: 1.91 }, "16:9": { width: 3.14, height: 1.76 } },
  "1/6.0": { realCaleDiag: 4.23, "4:3": { width: 2.40, height: 1.80 }, "3:2": { width: 2.50, height: 1.66 }, "16:10": { width: 2.54, height: 1.59 }, "16:9": { width: 2.61, height: 1.47 } },
  "1/7.5": { realCaleDiag: 3.39, "4:3": { width: 1.92, height: 1.44 }, "3:2": { width: 2.00, height: 1.33 }, "16:10": { width: 2.04, height: 1.27 }, "16:9": { width: 2.09, height: 1.18 } },
  "1/9.0": { realCaleDiag: 2.82, "4:3": { width: 1.60, height: 1.20 }, "3:2": { width: 1.66, height: 1.11 }, "16:10": { width: 1.69, height: 1.06 }, "16:9": { width: 1.74, height: 0.98 } }
};

function updateMatrixMeasurements() {
  const sensorFormatType = document.getElementById('sensorFormatType').value;
  const aspectRatio = document.getElementById('aspectRatio').value;

  const realCaleDiag = sensorData[sensorFormatType].realCaleDiag;
  const matrixDimensions = sensorData[sensorFormatType][aspectRatio];

  var { matrixWidthInMilimeters, matrixHeightInMilimeters } = getMatrixSize(realCaleDiag, imgInstance.width, imgInstance.height);

  document.getElementById('MatrixWidthInMilimetersInpt').value = matrixWidthInMilimeters.toFixed(2);
  document.getElementById('MatrixHeightInMilimetersInpt').value = matrixHeightInMilimeters.toFixed(2);
}
