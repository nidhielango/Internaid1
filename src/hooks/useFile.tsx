import React, { useState } from 'react';

const useFile = () => {
    const [selectedFile, setSelectedFile] = useState<string>();
    const onSelectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader();
        const [selectedFile, setSelectedFile] = useState<string>();
        
        if (event.target.files?.[0]) {
          reader.readAsDataURL(event.target.files[0]);
        }
  
        reader.onload = (readerEvent) =>  {
          if (readerEvent.target?.result){
            setSelectedFile(readerEvent.target.result as string);
          }
        }
  
      };

    return {
        selectedFile, setSelectedFile, onSelectFile
    }
}
export default useFile;