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


export const convertToDataURL = (blob) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);  // Resolve the promise with the data URL on success
        reader.onerror = () => reject(reader.error);   // Reject the promise on error
        reader.readAsDataURL(blob);
    });
}

export const encodeArrayBuffer = (file) => {
    return Array.from(new Uint8Array(file));
}

export const getBinaryFileSizeFromBase64 = (base64String) => {
    // Remove any Data URL prefix (optional)
    const base64Data = base64String.replace(/^data:image\/[a-z]+;base64,/, '');

    // Calculate the file size in bytes
    const byteLength = (base64Data.length * 3) / 4; // Exclude padding characters from base64 ('=')
    
    // Adjust calculations for padding characters
    if (base64Data.endsWith('==')) {
        return byteLength - 2;
    } else if (base64Data.endsWith('=')) {
        return byteLength - 1;
    }

    return byteLength;
}

export const getReverseFileExtension = (type)=> {
    switch(Object.keys(type)[0]) {
      case 'jpeg':
        return  'image/jpeg';
      case 'gif':
        return  'image/gif'; 
      case 'jpg':
        return  'image/jpg';       
      case 'png':
        return  'image/png';
      case 'svg':
        return  'image/svg';
      case 'avi':
        return  'video/avi';
      case 'mp4':
        return  'video/mp4';
      case 'aac':
        return  'video/aac';
      case 'wav':
        return  'audio/wav';
      case 'mp3':
        return  'audio/mp3';                                                                                                              
      default :
      return "";
    }
  };
  
 export const getFileExtension = (type) => {
    switch(type) {
      case 'image/jpeg':
        return { 'jpeg' : null };
      case 'image/gif':
        return { 'gif' : null };
      case 'image/jpg':
        return { 'jpg' : null };
      case 'image/png':
        return { 'png' : null };          
      case 'image/svg':
        return { 'svg' : null };          
      case 'video/avi':
        return { 'avi' : null };                            
      case 'video/aac':
        return { 'aac' : null };
      case 'video/mp4':
        return { 'mp4' : null };        
      case 'audio/wav':
        return { 'wav' : null };                         
      case 'audio/mp3':
        return { 'mp3' : null };
      default :
      return null;
    }
  };