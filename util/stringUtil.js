
export function getIdName(str){
    return str.replace(/\s+/g, '-').toLowerCase();
}

export function removeHTML(str){
    return isValidValue(str) ? str.replace(/(<([^>]+)>)/gi, "").replace('amp;', '') : "";
}

export function isValidValue(value){
    if(value == null)
        return false;

    if(value == "")
        return false;

    if(value == undefined)
        return false;
    
    return true;
}