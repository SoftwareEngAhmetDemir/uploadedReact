import React, { useContext } from "react";
import ImageUploader from "react-images-upload";
import { AuthContext } from "../../Context/AuthContext";

export default function Uploadimgview(props) {
   const { gState, seTgState } = useContext(AuthContext);

   const onDrop = (pictureFiles, pictureDataURLs) => {
      seTgState({
         ...gState,
         uploadPictures: pictureFiles,
      });
      console.log(pictureFiles)
   };

   return (
      <div>
         <ImageUploader
            withIcon={true}
            buttonText={props.buttonText}
            onChange={onDrop}
            singleImage={props.singleImage}
            withPreview={true}
            imgExtension={[".jpg", ".gif", ".png", ".gif", ".pdf"]}
            label="'Max file size: 5mb, accepted: .jpg, .gif, .png, .gif, .pdf"
            maxFileSize={8242880}
         />
      </div>
   );
}
