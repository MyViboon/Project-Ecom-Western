import React, { useEffect, useState } from "react";
import useEcomStore from "../../store/ecom-store";
import { createProducr } from "../../api/product";
import { toast } from "react-toastify";
import Uploadfile from "./Uploadfile";

const initialState = {
  title: "USB",
  description: "Type-C",
  price: 50,
  quantity: 40,
  catagoryId: "",
  images: [],
};

const FormProduct = () => {
  const token = useEcomStore((state) => state.token);
  const getCategory = useEcomStore((state) => state.getCategory);
  const categories = useEcomStore((state) => state.categories);
  const getProduct = useEcomStore((state) => state.getProduct);
  const products = useEcomStore((state) => state.products);
  const [form, setForm] = useState(initialState);

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
      toast.success(`เพิ่มข้อมูล ${res.data.title} สำเร็จ`);
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

        <button className="bg-blue-500">เพิ่มสินค้า</button>

        <hr />
        <br />
        <table className="table">
          <thead>
            <tr>
              <th scope="col">No.</th>
              <th scope="col">ชื่อสินค้า</th>
              <th scope="col">รายระเอียด</th>
              <th scope="col">ราคา</th>
              <th scope="col">จำนวน</th>
              <th scope="col">จำนวนที่ขาย</th>
              <th scope="col">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item, index) => {
              // console.log(item);
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.title}</td>
                  <td>{item.description}</td>
                  <td>{item.price}</td>
                  <td>{item.quantity}</td>
                  <td>{item.sold}</td>
                  <td>{item.updateAt}</td>
                  <td>
                    <p>แก้ไข</p>
                    <p>ลบ</p>
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
