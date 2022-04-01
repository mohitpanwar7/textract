export const MAX_FILE_UPLOAD_SIZE = 262144000;

export function bytesToSize(bytes) {

    if(bytes == null || bytes == "" || bytes == undefined){
        return "";
    } else {
        var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes == 0) return '0 Byte';
        var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
    }
}