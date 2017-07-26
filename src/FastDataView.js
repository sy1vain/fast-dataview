"use strict";

(function(exports) {

    var cacheBuffer = new ArrayBuffer(8);
    var uint8Array = new Uint8Array(cacheBuffer);
    var int8Array = new Int8Array(cacheBuffer);
    var uint16Array = new Uint16Array(cacheBuffer);
    var int16Array = new Int16Array(cacheBuffer);
    var uint32Array = new Uint32Array(cacheBuffer);
    var int32Array = new Int32Array(cacheBuffer);
    var float32Array = new Float32Array(cacheBuffer);
    var float64Array = new Float64Array(cacheBuffer);

    var FastDataView = function(buffer, byteOffset, byteLength) {
        this.buffer = buffer;
        this.byteOffset = byteOffset || 0;
        this.byteLength = byteLength || buffer.byteLength;

        // If buffer is an instance of Node Buffer , byteArray = buffer;
        this.byteArray = buffer.buffer ? buffer : new Uint8Array(buffer);

        this.initCacheArray();
    };

    FastDataView.prototype.initCacheArray = function() {
        this.uint8Array = uint8Array;
        this.int8Array = int8Array;
        // this.uint16Array = uint16Array;
        this.int16Array = int16Array;
        // this.uint32Array = uint32Array;
        this.int32Array = int32Array;
        this.float32Array = float32Array;
        this.float64Array = float64Array;
    };

    FastDataView.prototype.setUint8 = function(offset, value) {
        this.byteArray[offset] = value;
    };

    FastDataView.prototype.getUint8 = function(offset) {
        return this.byteArray[offset];
    };

    FastDataView.prototype.setInt8 = function(offset, value) {
        this.byteArray[offset] = value;
    };

    FastDataView.prototype.getInt8 = function(offset) {
        // Use TypedArray
        this.uint8Array[0] = this.byteArray[offset];
        return this.int8Array[0];
    };

    FastDataView.prototype.setUint16 = function(offset, value, littleEndian) {
        this.byteArray[offset + ((littleEndian)?1:0)] = value >>> 8;
        this.byteArray[offset + ((littleEndian)?0:1)] = value;
    };

    FastDataView.prototype.getUint16 = function(offset, littleEndian) {
        var a = this.byteArray[offset + ((littleEndian)?1:0)];
        var b = this.byteArray[offset + ((littleEndian)?0:1)];
        return (a << 8) | b;
    };

    FastDataView.prototype.setInt16 = function(offset, value, littleEndian) {
        this.byteArray[offset + ((littleEndian)?1:0)] = value >>> 8;
        this.byteArray[offset + ((littleEndian)?0:1)] = value;
    };

    FastDataView.prototype.getInt16 = function(offset, littleEndian) {
        // Use TypedArray
        this.uint8Array[0] = this.byteArray[offset + ((littleEndian)?0:1)];
        this.uint8Array[1] = this.byteArray[offset + ((littleEndian)?1:0)];
        return this.int16Array[0];
    };

    FastDataView.prototype.setUint32 = function(offset, value, littleEndian) {
        this.byteArray[offset + ((littleEndian)?3:0)] = value >>> 24;
        this.byteArray[offset + ((littleEndian)?2:1)] = (value >>> 16);
        this.byteArray[offset + ((littleEndian)?1:2)] = (value >>> 8);
        this.byteArray[offset + ((littleEndian)?0:3)] = value;
    };

    FastDataView.prototype.getUint32 = function(offset, littleEndian) {
        var a = this.byteArray[offset + ((littleEndian)?3:0)];
        var b = this.byteArray[offset + ((littleEndian)?2:1)];
        var c = this.byteArray[offset + ((littleEndian)?1:2)];
        var d = this.byteArray[offset + ((littleEndian)?0:3)];
        return ((a << 24) >>> 0) + ((b << 16) | (c << 8) | (d));
    };

    FastDataView.prototype.setInt32 = function(offset, value, littleEndian) {
        this.byteArray[offset + ((littleEndian)?3:0)] = value >>> 24;
        this.byteArray[offset + ((littleEndian)?2:1)] = (value >>> 16);
        this.byteArray[offset + ((littleEndian)?1:2)] = (value >>> 8);
        this.byteArray[offset + ((littleEndian)?0:3)] = value;
    };

    FastDataView.prototype.getInt32 = function(offset, littleEndian) {
        // Use TypedArray
        this.uint8Array[0] = this.byteArray[offset + ((littleEndian)?0:3)];
        this.uint8Array[1] = this.byteArray[offset + ((littleEndian)?1:2)];
        this.uint8Array[2] = this.byteArray[offset + ((littleEndian)?2:1)];
        this.uint8Array[3] = this.byteArray[offset + ((littleEndian)?3:0)];
        return this.int32Array[0];
    };

    FastDataView.prototype.setFloat32 = function(offset, value, littleEndian) {
        this.float32Array[0] = value;
        this.byteArray[offset + ((littleEndian)?3:0)] = this.uint8Array[3];
        this.byteArray[offset + ((littleEndian)?2:1)] = this.uint8Array[2];
        this.byteArray[offset + ((littleEndian)?1:2)] = this.uint8Array[1];
        this.byteArray[offset + ((littleEndian)?0:3)] = this.uint8Array[0];
    };

    FastDataView.prototype.getFloat32 = function(offset, littleEndian) {
        // Use TypedArray
        this.uint8Array[0] = this.byteArray[offset + ((littleEndian)?0:3)];
        this.uint8Array[1] = this.byteArray[offset + ((littleEndian)?1:2)];
        this.uint8Array[2] = this.byteArray[offset + ((littleEndian)?2:1)];
        this.uint8Array[3] = this.byteArray[offset + ((littleEndian)?3:0)];
        return this.float32Array[0];
    };

    FastDataView.prototype.setFloat64 = function(offset, value, littleEndian) {
        this.float64Array[0] = value;
        this.byteArray[offset + ((littleEndian)?7:0)] = this.uint8Array[7];
        this.byteArray[offset + ((littleEndian)?6:1)] = this.uint8Array[6];
        this.byteArray[offset + ((littleEndian)?5:2)] = this.uint8Array[5];
        this.byteArray[offset + ((littleEndian)?4:3)] = this.uint8Array[4];
        this.byteArray[offset + ((littleEndian)?3:4)] = this.uint8Array[3];
        this.byteArray[offset + ((littleEndian)?2:5)] = this.uint8Array[2];
        this.byteArray[offset + ((littleEndian)?1:6)] = this.uint8Array[1];
        this.byteArray[offset + ((littleEndian)?0:7)] = this.uint8Array[0];
    };

    FastDataView.prototype.getFloat64 = function(offset, littleEndian) {
        // Use TypedArray
        this.uint8Array[0] = this.byteArray[offset + ((littleEndian)?0:7)];
        this.uint8Array[1] = this.byteArray[offset + ((littleEndian)?1:6)];
        this.uint8Array[2] = this.byteArray[offset + ((littleEndian)?2:5)];
        this.uint8Array[3] = this.byteArray[offset + ((littleEndian)?3:4)];
        this.uint8Array[4] = this.byteArray[offset + ((littleEndian)?4:3)];
        this.uint8Array[5] = this.byteArray[offset + ((littleEndian)?5:2)];
        this.uint8Array[6] = this.byteArray[offset + ((littleEndian)?6:1)];
        this.uint8Array[7] = this.byteArray[offset + ((littleEndian)?7:0)];
        return this.float64Array[0];
    };

    if (exports) {
        exports.FastDataView = FastDataView;
    }

    if (typeof module != "undefined") {
        module.exports = FastDataView;
    }

})(typeof window !== "undefined" ? window : null);
