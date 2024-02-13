function decode_url()
{
    setTimeout("generate_decode_url()", 20);
}

function generate_decode_url()
{
    var link = document.getElementById("safelink").value;
    var url_parts = link.split("?")[1];
    var params = url_parts.split("&");
    var target_url = "Error:  couldn't find target URL.";
    for(n=0;n<params.length;n++)
    {
        namval = params[n].split("=");
        if(namval[0]=="url") target_url = namval[1];
    }
    
    decode_url = decodeURIComponent(target_url);
    document.getElementById("target_url").value = decode_url;
    
}

function clear()
{
    location.reload();
}



