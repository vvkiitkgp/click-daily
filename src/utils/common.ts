export const DEFAULT_USER_ID = '1a347fee'

export const getFileNameAndType = (uri: string) => {
    const fileName = uri.split('/').pop() || 'photo.jpg'; // Extract the file name
    const fileType = fileName.split('.').pop()?.toLowerCase(); // Extract the extension
  
    // Determine the MIME type based on the file extension
    const mimeType = fileType === 'jpg' || fileType === 'jpeg' ? 'image/jpeg' :
                     fileType === 'png' ? 'image/png' :
                     fileType === 'gif' ? 'image/gif' : 'application/octet-stream';
  
    return { fileName, mimeType };
  };