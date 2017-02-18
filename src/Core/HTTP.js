/*global Engine*/
/**
 * Make a simple HTTP request
 * @param {object} params - Options to include with ajax request
 * @param {string} params.url - The url to send the request to
 * @param {string} [params.method=GET] - The HTTP method
 * @param {boolean} [params.async=true] - Whether the call should be asynchronous
 * @param {Function} successCallback - Function to call with the response once it is completed successfully
 * @param {Function} [errorCallback] - Function to call with the response once it is complete and has failed
 */
Engine.HTTP = function(params, successCallback, failCallback){

    let opts = {
        method: 'GET',
        async: true,
    };

    Object.assign(opts, params);

    let xhr = new XMLHttpRequest();

    xhr.addEventListener("progress", function(){
        console.log('progress has been had');
    });
    xhr.addEventListener("error", function(){
        failCallback('error with request');
        // console.log('error with request');
    });
    xhr.addEventListener("abort", function(){
        failCallback('Request was aborted');
        // console.log('Request was aborted');
    });
    xhr.addEventListener('load', function(){

        successCallback(this);

    });

    xhr.open(opts.method, opts.url, opts.async);
    xhr.send();

};