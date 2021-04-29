var XLSX = require('xlsx')
var multer = require('multer');
const uploadModel = require("../model/uploadModel");
const config = require("../config.js");

//saves file in temp dir
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, config.tempDir)
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

var upload = multer({
    storage: storage
}).single('file');

// read  file from temp dir
exports.fileRead = async (req, res) => {
    try {

        upload(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                return res.status(501).json(err)
            } else if (err) {
                return res.status(501).json(err)
            }
            var filename = req.file.filename.toString().split('-');
            console.log(filename);
            console.log(filename[1]);
            createEntry(req.file.path, filename[1],res)

        })
    } catch (err) {
        res.status(500).send({
            status: true,
            message: err.message,
        })
    }
};
//creating an entry
async function createEntry(path, filename,res) {

    try {

        var read = await XLSX.readFile(path);
        var sheet_name_list = read.SheetNames;
        rows = XLSX.utils.sheet_to_row_object_array(read.Sheets[sheet_name_list[0]], {
            header: 1
        });
        var exception = "mail id empty";
        var fileData = [];
        
        if (rows.length) {

            for (let i = 1; i < rows.length; i++) {
                if (rows[i][4] === null || rows[i][4] === '') {

                    fileData.push({
                        nationality: rows[i][0],
                        address: rows[i][1],
                        country: rows[i][2],
                        postal: rows[i][3],
                        email: rows[i][4],
                        mobile: rows[i][5],
                        exception: exception,
                        status: 0
                    })

                } else {

                    fileData.push({
                        nationality: rows[i][0],
                        address: rows[i][1],
                        country: rows[i][2],
                        postal: rows[i][3],
                        email: rows[i][4],
                        mobile: rows[i][5],
                        exception: '',
                        status: 1
                    })

                }
            }

            uploadModel.insertMany(fileData,
            function (err,data) {
                          if (err) {
                              return res.status(500).send({
                                  status: false,
                                  message: "There is a problem in creating the entry."
                              });
                          } else {
                              res.status(200).send({
                                  status: true,
                                  message: "Data entered created successfully"
                              });
                          }
                      }
                  );
        }

    } catch (err) {
        console.log(err.message)
    }
};