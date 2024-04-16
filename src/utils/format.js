export const formatDuration = (duration) => {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

export const stringToBlob = (text) => {
    const blob = new Blob([text], { type: 'text/plain' });
    return blob;
}

export const blobToString = (blob) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = function() {
            resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsText(blob);
    });
}

export const base64ToBlob = (base64, contentType = '', sliceSize = 512) => {
    const byteCharacters = atob(base64); // Decode base64 to binary string
    const byteArrays = [];

    // Create byte arrays from the binary string
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }

    // Create a blob from the byte arrays
    const blob = new Blob(byteArrays, {type: contentType});
    return blob;
}

export const encodeArrayBuffer = (file) => {
    return Array.from(new Uint8Array(file));
}