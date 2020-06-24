const dir = process.argv[process.argv.length-1];
const fs = require('fs');
// const fsPromises = fs.promises;
const ExifImage = require('exif').ExifImage;

fs.readdir(dir, (err, files) => {
    for (let file of files) {
        try {
            const newpromise = new ExifImage({ image : dir + file }, (error, exifData) => {
                if (error){
                    // console.log('Error: '+error.message);
                    // console.log(file);
                }
                else{
                    if(exifData.exif.CreateDate){
                        // console.log(exifData.exif.CreateDate); // Do something with your data!
                        const extension = file.substring(file.lastIndexOf('.'));
                        let newFileName = exifData.exif.CreateDate + "__" + new Date().getTime() + extension;
                        // console.log(newFileName);
                        // fsPromises.copyFile(dir+file, '~/Downloads/vivienne/photosreorg/' + newFileName).catch((error) => {
                        //     console.log(error);
                        // });
                        fs.copyFile(dir+file, '~/Downloads/vivienne/photosreorg/' + newFileName, fs.constants.COPYFILE_EXCL, (err) => {
                            if(err){
                                console.log(err);
                            }
                        });
                    }
                }
            });
        } catch (error) {
            // console.log(file);
            // console.log('Error: ' + error.message);
        }
    }
})
