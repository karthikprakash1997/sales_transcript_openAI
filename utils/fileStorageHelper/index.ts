import fs from 'fs';
import path from 'path';

//store file in a directory
export const uploadContentToFile = (directory:string, filePath:string, content:string) => {
  try{
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory);
    } // AI Generated code

    const newFilePath = path.join(directory, filePath)
    fs.writeFileSync(newFilePath, content)
  }
  catch(er){
    console.error(er)
    throw new Error('Error: error writing content to file')
  }
};

//read data from a file in utc or text format
export const readFromFile = (filePath:string) => {
    try{
      const content = fs.readFileSync(filePath, 'utf-8');
      return content;
    }
    catch(er){
      console.error(er,'Error: error reading content to file')
      // throw new Error('Error: error reading content to file')
    }
  };

//delete file 
export const deleteFile = (filePath:string) => {
  try{
    const content = fs.unlinkSync(filePath);
    return content;
  }
  catch(er){
    console.error(er,'Error: error deleting a file')
    // throw new Error('Error: error reading content to file')
  }
};