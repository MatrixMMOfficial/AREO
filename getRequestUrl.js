import { prefix } from '/aero/config.js';

function getRequestUrl(url) {
    url = url.split(prefix)[1];
    
    return new URL(url);
}

export { getRequestUrl };