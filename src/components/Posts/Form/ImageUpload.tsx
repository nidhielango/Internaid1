import { Button, Flex, Image, Stack } from '@chakra-ui/react';
import React, { useRef } from 'react';

type ImageUploadProps = {
    selectedFile?: string;
    onSelectImage: (event:React.ChangeEvent<HTMLInputElement>) => void;
    setSelectedTab: (value: string) => void;
    setSelectedFile: (value: string) => void;
};

const ImageUpload:React.FC<ImageUploadProps> = ( {selectedFile, setSelectedFile,setSelectedTab, onSelectImage,}) => {

    const selectedFileRef = useRef<HTMLInputElement>(null);
    
    return (
        <Flex direction="column" justify="center" align="center" width="100%" height="400px">
         { selectedFile ? (
             <>
                <Image src={selectedFile} maxHeight="500px" maxWidth="500px"/>
                <Stack direction="row" mt={5}>
                    <Button height="30px" onClick={() => setSelectedTab("Post")}>
                    BACK TO POST
                    </Button>
                    <Button
                    variant="outline"
                    height="30px"
                    onClick={() => setSelectedFile("")}
                    >
                    REMOVE
                    </Button>
                </Stack>
             </>
         ) : (
            <Flex
                justify="center"
                align="center"
                p={20}
                border="1px dashed"
                borderColor="gray.200"
                borderRadius={4}
                width="100%"
                height="100%"
            >
          <Button
            variant="outline"
            height="28px"
            onClick={() => selectedFileRef.current?.click()}
          >
            Upload
          </Button>
          <input
            id="file-upload"
            type="file"
            accept="image/x-png,image/gif,image/jpeg"
            hidden
            ref={selectedFileRef}
            onChange={onSelectImage}
          />
          <img src={selectedFile} />
        </Flex>
         )}
        </Flex>

    )
}
export default ImageUpload;