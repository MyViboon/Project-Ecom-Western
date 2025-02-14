import React, { useEffect, useState } from "react";
import useEcomStore from "../../store/ecom-store";
import { readProduct, updateProduct } from "../../api/product";
import { toast } from "react-toastify";
import Uploadfile from "./Uploadfile";
import { useNavigate, useParams } from "react-router-dom";

const initialState = {
  title: "USB",
  description: "Type-C",
  price: 50,
  quantity: 40,
  catagoryId: "",
  images: [],
};

const FormEditProoduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = useEcomStore((state) => state.token);
  const getCategory = useEcomStore((state) => state.getCategory);
  const categories = useEcomStore((state) => state.categories);
  const [form, setForm] = useState(initialState);

  // console.log(products);

  useEffect(() => {
    getCategory(token);
    fetchProduct(token, id, form);
  }, []);

  const fetchProduct = async (token) => {
    try {
      const res = await readProduct(token, id, form);
      console.log("res form backend", res);
      setForm(res.data);
    } catch (err) {
      console.log("Err fetch data", err);
    }
  };
  console.log(form);

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
      const res = await updateProduct(token, id, form);
      console.log(res);
      toast.success(`เพิ่มข้อมูล ${res.data.title} สำเร็จ`);
      navigate("/admin/product");
    } catch (err) {
      console.log(err);
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

        <button className="bg-blue-500">แก้ไขสินค้า</button>

        <hr />
        <br />
      </form>
    </div>
  );
};

export default FormEditProoduct;
