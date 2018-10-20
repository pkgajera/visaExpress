

switch (Meteor.absoluteUrl()) {
    case "http://localhost:3000/":
    fileUploadPath = 'C:/data/uploadGallery/';
    basePdfpath = 'C:/data/basePdf/';
    pdfUploadPath = 'C:/data/uploadPdf/';
        break;
    case "http://localhost:80/":
    fileUploadPath = '/var/trunck/upload/';
    basePdfpath = '/var/trunck/basePdf/';
    pdfUploadPath = '/var/trunck/uploadPdf/';
        break;
    default:
    fileUploadPath = '/mnt/data/tmp';
    basePdfpath = '/mnt/data/tmp';
    pdfUploadPath = '/mnt/data/tmp';
}



Uploads = new FS.Collection("Uploads", {
    stores: [new FS.Store.FileSystem("Uploads", { path: fileUploadPath })]
});

Uploads.allow({
    insert: function () {
        return true
    },
    update: function () {
        return true
    },
    remove: function () {
        return true
    },
    download: function () {
        return true
    }
});
