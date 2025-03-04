import { useNavigate } from "react-router-dom";
import FormInput from "../components/form/FormInput";
import FormSelect from "../components/form/FormSelect";
import FormTextarea from "../components/form/FormTextarea";
import { toast } from "react-toastify";
import customAPI from "../services/customAPI";

const CreateProduct = () => {
  const categories = ["", "sepatu", "baju", "celana", "kemeja", "jaket"];
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const dataForm = new FormData(form);

    const data = Object.fromEntries(dataForm);
    try {
      // UploadFile
      const responseFileUpload = await customAPI.post(
        "/product/file-upload",
        { image: data.image },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Response image", responseFileUpload.data.url);

      // create product
      await customAPI.post("/product", {
        name: data.name,
        price: data.price,
        stock: data.stock,
        description: data.description,
        category: data.category,
        image: responseFileUpload.data.url,
      });
      toast.success("Create Product Success");
      navigate("/products");
    } catch (error) {
      const errMessage = error?.response?.data?.message;
      toast.error(errMessage);
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <label className="form-control">
        <label className="label">
          <span className="label-text capitalize">Image</span>
        </label>
        <input
          type="file"
          name="image"
          className="file-input file-input-primary file-input-bordered w-full max-w-xs"
        />
      </label>
      <FormSelect
        name={"category"}
        label={"Select Category"}
        lists={categories}
      />
      <FormInput name={"name"} label={"Product Name"} type={"text"} />
      <FormInput name={"price"} label={"Product Price"} type={"number"} />
      <FormInput name={"stock"} label={"Product stock"} type={"number"} />
      <FormTextarea name={"description"} label={"Product Description"} />
      <input
        type="submit"
        value={"Create"}
        className="btn btn-primary btn-block mt-5 btn-md"
      />
    </form>
  );
};

export default CreateProduct;
