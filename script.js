function encodeImageFileAsURL(element) {
    var file = element.files[0];
    var reader = new FileReader();
    reader.onloadend = function() {
        var base64Img = reader.result.slice(23);
        console.log('RESULT', base64Img);

        // 接著寫 post 事件
        var imgData = JSON.stringify(
            {
                'payload': {
                    'image': {
                        'imageBytes': base64Img
                    }
                },
                'params': {
                    'scoreThreshold': '0.5',
                    'maxBoundingBoxCount': '100'
                }
            }
        )

        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: 'https://automl.googleapis.com/v1/projects/923293844511/locations/us-central1/models/IOD5545052643153412096:predict',
            contentType: 'application/json',
            data: imgData,
            success: function (msg) {
                console.log(msg);
            },

            error: function (msg) {
                console.log(msg.responseText);
            }
        });
    }
    reader.readAsDataURL(file);
}

function onSignIn(googleUser) {
    // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());

    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);
}