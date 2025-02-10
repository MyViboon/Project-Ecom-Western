import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useEcomStore from "../../store/ecom-store";
import { createCategory, removeCategory } from "../../api/Category";
import { toast } from "react-toastify";

const FormCategory = () => {
  const token = useEcomStore((state) => state.token);
  const [name, setName] = useState("");
  // const [categories, setCategories] = useState([]);
  const categories = useEcomStore((state) => state.categories);
  const getCategory = useEcomStore((state) => state.getCategory);

  useEffect(() => {
    getCategory(token);
  }, []);

  // const handleRemove = async (id) => {
  //   try {
  //     const res = await removeCategory(token, id);
  //     //   console.log(res);
  //     toast.success(`Delete ${res.data.name} Success`);
  //     getCategory(token);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  const handleRemove = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "คุณต้องการลบรายการนี้หรือไม่?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ลบ",
        cancelButtonText: "ยกเลิก",
      });

      if (result.isConfirmed) {
        const res = await removeCategory(token, id);
        // toast.success(`Delete ${res.data.name} Success`);
        await getCategory(token); // อัปเดตรายการหลังจากลบเสร็จ

        Swal.fire({
          title: "Deleted!",
          text: `ทำการลบ "${res.data.name}" เรียบร้อย`,
          icon: "success",
        });
      }
    } catch (err) {
      console.log(err);
      Swal.fire({
        title: "Error!",
        text: "Something went wrong while deleting.",
        icon: "error",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log({ name });
    if (!name) return toast.warning("Please fill data");
    try {
      const res = await createCategory(token, { name });
      //   console.log(res.data.name);
      toast.success(`Add Category ${res.data.name} success!!!`);
      getCategory(token);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mx-auto p-4 bg-white shadow-md">
      <h1>Category Managernemt</h1>
      <form action="" className="my-4" onSubmit={handleSubmit}>
        <input
          onChange={(e) => setName(e.target.value)}
          className="border"
          type="text"
        />
        <button className="bg-blue-500">Add Category</button>
      </form>
      <hr />
      <ul className="list-none">
        {categories.map((item, index) => (
          <li key={index} className="flex justify-between my-2">
            <span>{item.name}</span>
            <button
              className="bg-red-500"
              onClick={() => handleRemove(item.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FormCategory;
