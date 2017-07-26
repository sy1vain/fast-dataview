var FastDataView = require("../src/FastDataView");

var testCount = 1000;
var littleEndian = false;

var bufferSize = 26 * 1024;

function testWrite(byteLength, fast) {
    var buffer = new ArrayBuffer(byteLength);
    var DataViewClass = fast ? FastDataView : DataView;
    var name = fast ? 'FastDataView' : 'DataView';

    var view = new DataViewClass(buffer);
    console.time(name + ' write');
    for (var c = 0; c < testCount; c++) {
        for (var i = 0; i < byteLength;) {
            view.setUint8(i, 255, littleEndian);
            i += 1;
            view.setInt8(i, 127, littleEndian);
            i += 1;
            view.setUint16(i, 65535, littleEndian);
            i += 2;
            view.setInt16(i, 32767, littleEndian);
            i += 2;
            view.setUint32(i, 4294967295, littleEndian);
            i += 4;
            view.setInt32(i, 2147483647, littleEndian);
            i += 4;
            view.setFloat32(i, 1.625, littleEndian);
            i += 4;
            view.setFloat64(i, Math.E, littleEndian);
            i += 8;
        }
    }
    console.timeEnd(name + ' write');
    return buffer;
}

function testRead(buffer, fast) {
    var byteLength = buffer.byteLength;
    var DataViewClass = fast ? FastDataView : DataView;
    var name = fast ? 'FastDataView' : 'DataView';

    var view = new DataViewClass(buffer);
    console.time(name + ' read');
    for (var c = 0; c < testCount; c++) {
        for (var i = 0; i < byteLength;) {
            view.getUint8(i, littleEndian);
            i += 1;
            view.getInt8(i, littleEndian);
            i += 1;
            view.getUint16(i, littleEndian);
            i += 2;
            view.getInt16(i, littleEndian);
            i += 2;
            view.getUint32(i, littleEndian);
            i += 4;
            view.getInt32(i, littleEndian);
            i += 4;
            view.getFloat32(i, littleEndian);
            i += 4;
            view.getFloat64(i, littleEndian);
            i += 8;
        }
    }
    console.timeEnd(name + ' read');
    return buffer;
}

function verify(buffer1, buffer2) {
    // var byteLength = buffer1.byteLength;
    var byteLength = 26;

    var bytes1 = new Uint8Array(buffer1);
    var bytes2 = new Uint8Array(buffer2);

    for (var i = 0; i < byteLength; i++) {
        if (bytes1[i] !== bytes2[i]) {
            console.log("write FAILED", i);
            return;
        }
    }
    console.log("==== write OK. ====");

    var view1 = new FastDataView(buffer1);
    var view2 = new DataView(buffer1);

    for (var i = 0; i < byteLength;) {
        if (view1.getUint8(i, littleEndian) !== view2.getUint8(i, littleEndian)) {
            console.log("read FAILED ", i);
            return;
        };
        console.log(view1.getUint8(i, littleEndian));
        i += 1;
        if (view1.getInt8(i, littleEndian) !== view2.getInt8(i, littleEndian)) {
            console.log("read FAILED ", i);
            return;
        };
        console.log(view1.getInt8(i, littleEndian));
        i += 1;
        if (view1.getUint16(i, littleEndian) !== view2.getUint16(i, littleEndian)) {
            console.log("read FAILED ", i);
            return;
        };
        console.log(view1.getUint16(i, littleEndian));
        i += 2;
        if (view1.getInt16(i, littleEndian) !== view2.getInt16(i, littleEndian)) {
            console.log("read FAILED ", i);
            return;
        };
        console.log(view1.getInt16(i, littleEndian));
        i += 2;
        if (view1.getUint32(i, littleEndian) !== view2.getUint32(i, littleEndian)) {
            console.log("read FAILED ", i, littleEndian);
            return;
        };
        console.log(view1.getUint32(i, littleEndian));
        i += 4;
        if (view1.getInt32(i, littleEndian) !== view2.getInt32(i, littleEndian)) {
            console.log("read FAILED ", i);
            return;
        };
        console.log(view1.getInt32(i, littleEndian));
        i += 4;
        if (view1.getFloat32(i, littleEndian) !== view2.getFloat32(i, littleEndian)) {
            console.log("read FAILED ", i);
            return;
        };
        console.log(view1.getFloat32(i, littleEndian));
        i += 4;
        if (view1.getFloat64(i, littleEndian) !== view2.getFloat64(i, littleEndian)) {
            console.log("read FAILED ", i);
            return;
        };
        console.log(view1.getFloat64(i, littleEndian));
        i += 8;
    }

    console.log("==== read OK. ====");

}


console.log("==== performance (x" + testCount + ") ====");

var buffer1 = testWrite(bufferSize, true);
testRead(buffer1, true);

var buffer2 = testWrite(bufferSize);
testRead(buffer2);

verify(buffer1, buffer2);
