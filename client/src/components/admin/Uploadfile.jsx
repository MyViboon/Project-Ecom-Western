import React, { useState } from "react";
import { toast } from "react-toastify";
import Resizer from "react-image-file-resizer";
import { uploadFiles } from "../../api/product";
import useEcomStore from "../../store/ecom-store";

const Uploadfile = ({ form, setForm }) => {
  const [isLoading, setIsLoading] = useState(false);
  const token = useEcomStore((state) => state.token);

  const handleOnChange = (e) => {
    const files = e.target.files;
    if (files) {
      setIsLoading(true);
      let allFiles = form.images; // [] empty array
      for (let i = 0; i < files.length; i++) {
        // console.log(files[i]);

        // validate file
        const file = files[i];
        if (!file.type.startsWith("image/")) {
          toast.error(`File ${file.name} ไม่ใช่รูป`);
          continue;
        }
        // Image Resize
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          "JPEC",
          100,
          0,
          (data) => {
            uploadFiles(token, data)
              .then((res) => {
                console.log(res);
                allFiles.push(res.data);
                setForm({
                  ...form,
                  images: allFiles,
                });
                toast.success("Upload image Sucess!!");
              })
              .catch((err) => {
                console.log(err);
              });
          },
          "base64"
        );
      }
    }
  };
  return (
    <div>
      <input onChange={handleOnChange} type="file" name="images" multiple />
    </div>
  );
};

export default Uploadfile;
