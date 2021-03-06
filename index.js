const dir = process.argv[process.argv.length-1];
const fs = require('fs');

const ExifImage = require('exif').ExifImage;

fs.readdir(dir, (err, files) => {
    for (let file of files) {
        try {
            const newpromise = new ExifImage({ image : dir + file }, (error, exifData) => {
                if (error){
                    // console.log('Error: '+error.message);
                    // console.log(file);
                    fs.copyFile(dir+file, '/Users/matthuntington/Downloads/reorg/'+file, fs.constants.COPYFILE_EXCL, (err) => {
                        if(err){
                            console.log(err);
                        }
                    });
                }
                else{
                    if(exifData.exif.CreateDate){
                        const extension = file.substring(file.lastIndexOf('.'));
                        let newFileName = exifData.exif.CreateDate + "__" + new Date().getTime() + extension;
                        fs.copyFile(dir+file, '/Users/matthuntington/Downloads/reorg/'+newFileName, fs.constants.COPYFILE_EXCL, (err) => {
                            if(err){
                                console.log(err);
                            }
                        });
                    } else {
                        // console.log(exifData);
                        // console.log(file);
                        fs.copyFile(dir+file, '/Users/matthuntington/Downloads/reorg/'+file, fs.constants.COPYFILE_EXCL, (err) => {
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
