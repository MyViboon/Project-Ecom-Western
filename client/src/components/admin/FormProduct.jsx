import React, { useEffect, useState } from "react";
import useEcomStore from "../../store/ecom-store";
import { createProducr, deleteProduct } from "../../api/product";
import { toast } from "react-toastify";
import Uploadfile from "./Uploadfile";
import { Link } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";

const initialState = {
  title: "",
  description: "",
  price: 0,
  quantity: 0,
  catagoryId: "",
  images: [],
};

const FormProduct = () => {
  const token = useEcomStore((state) => state.token);
  const getCategory = useEcomStore((state) => state.getCategory);
  const categories = useEcomStore((state) => state.categories);
  const getProduct = useEcomStore((state) => state.getProduct);
  const products = useEcomStore((state) => state.products);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: 0,
    quantity: 0,
    catagoryId: "",
    images: [],
  });

  // console.log(products);

  useEffect(() => {
    getCategory(token);
    getProduct(token, 100);
  }, []);

  const handleOnChange = (e) => {
    // console.log(e.target.name, e.target.value);
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createProducr(token, form);
      console.log(res);
      setForm(initialState);
      getProduct(token);
      toast.success(`เพิ่มข้อมูล ${res.data.title} สำเร็จ`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("จะลบหรอ")) {
      try {
        const res = await deleteProduct(token, id);
        console.log(res);
        toast.success("Deleted ลบสินค้าเรียบร้อยแล้ว");
        getProduct(token);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="container mx-auto p-4 bg-white shadow-md">
      <form action="" onSubmit={handleSubmit}>
        <h1>เพิ่มข้อมูลสินค้า</h1>
        <input
          className="border"
          name="title"
          value={form.title}
          onChange={handleOnChange}
          placeholder="Title"
        />
        <input
          className="border"
          name="description"
          value={form.description}
          onChange={handleOnChange}
          placeholder="Description"
        />
        <input
          type="number"
          className="border"
          name="price"
          value={form.price}
          onChange={handleOnChange}
          placeholder="Price"
        />
        <input
          type="number"
          className="border"
          name="quantity"
          value={form.quantity}
          onChange={handleOnChange}
          placeholder="Quantity"
        />
        <select
          name="catagoryId"
          className="border"
          onChange={handleOnChange}
          required
          value={form.catagoryId}
        >
          <option value="" disabled>
            Please Select
          </option>
          {categories.map((item, index) => (
            <option value={item.id} key={index}>
              {item.name}
            </option>
          ))}
        </select>
        <hr />
        {/* upload flie */}
        <Uploadfile form={form} setForm={setForm} />

        <button className="bg-blue-500 p-2 rounded-md shadow-md hover:scale-105 hover:-translate-y-1 hover:duration-200 ">
          เพิ่มสินค้า
        </button>

        <hr />
        <br />
        <table className="table w-full border">
          <thead className="bg-gray-200 border">
            <tr>
              <th scope="col">No.</th>
              <th scope="col">รูปภาพ</th>
              <th scope="col">ชื่อสินค้า</th>
              <th scope="col">รายระเอียด</th>
              <th scope="col">ราคา</th>
              <th scope="col">จำนวน</th>
              <th scope="col">จำนวนที่ขาย</th>
              <th scope="col">วันที่อัปเดต</th>
              <th scope="col">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item, index) => {
              // console.log(item);
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>

                  <td>
                    {item.images.length > 0 ? (
                      <img
                        className="w-24 h-24 rounded-lg shadow-md "
                        src={item.images[0].url}
                        alt=""
                      />
                    ) : (
                      <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center shadow-sm">
                        No Image
                      </div>
                    )}
                  </td>

                  <td>{item.title}</td>
                  <td>{item.description}</td>
                  <td>{item.price}</td>
                  <td>{item.quantity}</td>
                  <td>{item.sold}</td>
                  <td>{item.updateAt}</td>
                  <td className="flex gap-2">
                    <p className="bg-yellow-500 rounded-md p-1 hover:scale-105 hover:-translate-y-1 hover:duration-200 shadow-md">
                      <Link to={`/admin/product/${item.id}`}>
                        <Pencil />
                      </Link>
                    </p>
                    <p
                      className="bg-red-500 rounded-md p-1 hover:scale-105 hover:-translate-y-1 hover:duration-200 shadow-md "
                      onClick={() => handleDelete(item.id)}
                    >
                      <Trash2 />
                    </p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default FormProduct;
