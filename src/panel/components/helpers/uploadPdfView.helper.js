import React, { useContext } from 'react';
import ImageUploader from 'react-images-upload';
import { AuthContext } from '../../Context/AuthContext';

export default function UploadImgView(props) {
  const { gState, seTgState } = useContext(AuthContext);

  const onDrop = (Files, pictureDataURLs) => {
    seTgState({
      ...gState,
      uploadPdf: Files,
    });
  };

  return (
    <div>
      <ImageUploader
        withIcon={true}
        buttonText={props.buttonText}
        onChange={onDrop}
        singleImage={props.single}
        withPreview={true}
        accept='application/pdf'
        imgExtension={['.pdf']}
        label="'Max file size: 15mb, accepted: PDF"
        maxFileSize={18242880}
      />
    </div>
  );
}
