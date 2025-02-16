import React, { useState } from "react";
import { toast } from "react-toastify";
import Resizer from "react-image-file-resizer";
import { removeFiles, uploadFiles } from "../../api/product";
import useEcomStore from "../../store/ecom-store";
import { Loader } from "lucide-react";

const Uploadfile = ({ form, setForm }) => {
  const [isLoading, setIsLoading] = useState(false);
  const token = useEcomStore((state) => state.token);

  const handleOnChange = (e) => {
    const files = e.target.files;
    setIsLoading(true);
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
                setIsLoading(false);
                toast.success("Upload image Sucess!!");
              })
              .catch((err) => {
                console.log(err);
                setIsLoading(false);
              });
          },
          "base64"
        );
      }
    }
  };
  console.log(form);

  const handleDelete = (public_id) => {
    const images = form.images;
    removeFiles(token, public_id)
      .then((res) => {
        const filterImage = images.filter((item) => {
          console.log(item);
          return item.public_id !== public_id;
        });
        console.log("filterImage", filterImage);
        setForm({
          ...form,
          images: filterImage,
        });
        toast.error(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="my-4">
      <div className="flex mx-4 gap-4 my-4">
        {isLoading && <Loader className="w-16 h-16 animate-spin" />}

        {form.images.map((item, index) => (
          <div className="relative" key={index}>
            <img className="w-24 h-24 hover:scale-105" src={item.url} alt="" />
            <span
              className=" absolute top-0 right-0 bg-red-500 p-1 rounded"
              onClick={() => handleDelete(item.public_id)}
            >
              X
            </span>
          </div>
        ))}
      </div>

      <div>
        <input onChange={handleOnChange} type="file" name="images" multiple />
      </div>
    </div>
  );
};

export default Uploadfile;
